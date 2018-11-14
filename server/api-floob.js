const express = require('express');
const app = express();
//Create auth.json in root folder of server for deploy variables.
const auth = require('./auth.json');
const {
    mongoose
} = require('./models');
const {
    google
} = require('googleapis');
const mongo = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const allowedOrigins = 'https://floob.club:* https://www.floob.club:* http://localhost:*';

const Users = require('./models/UserSchema');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
const server = app.listen(3000, function () {
    console.log('server running on port 3000');
});
const io = require('socket.io')(server, {
    origins: allowedOrigins,
    secure: true
});

require('./routes')(app);


function getVideoInfo(ID) {
    var service = google.youtube('v3');
    let response = service.videos.list({
        auth: auth.YoutubeAPI,
        part: 'snippet',
        id: ID,
    });
    return response;
}
let skipCounter = [];

// Connect to mongo
mongo.connect(auth.MongoURL, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) {
        throw err;
    }
    console.log("MongoDB connected...");
    const db = client.db('floob');

    //Connect to socket.io
    io.on('connection', function (socket) {
        let videoQue = db.collection('videoQue');
        let users = db.collection('users');

        function skipVideo(data) {
            if (!data) {
                return
            }
            videoQue.deleteOne({
                _id: ObjectID(data._id)
            }, function () {
                //Send new que after each add
                videoQue.find().limit(100).sort({
                    _id: 1
                }).toArray(function (err, res) {
                    if (err) {
                        throw err
                    }
                    //Reset skip counter
                    skipCounter = [];
                    // Emit VideoQue
                    io.emit('videoOutput', res);
                    io.emit('voteToSkipCounter', skipCounter.length);
                });
            })
        }

        function sendUsers() {
            users.find({socketID: {$ne: null}}).limit(100).sort({
                _id: 1
            }).toArray(function (err, res) {
                if (err) {
                    throw err
                }
                //Reset skip counter
                skipCounter = [];
                // Emit VideoQue
                res.password = null;
                res.forEach(element => {
                    element.password = null;
                });
                io.emit('usersOutput', res);
            });
        };

        sendStatus = function (status) {
            socket.emit('status', status);
        };
        //Add video to Que
        socket.on('addVideo', function (data) {
            if (!data.video) {
                sendStatus({
                    message: 'No Video Added',
                    type: "danger"
                })
                return
            }
            let user = data.user;
            let videoID = data.video;

            getVideoInfo(videoID).then(function (data) {
                let videoInfo = data.data.items[0];
                let video = {
                    videoID: videoInfo.id,
                    videoTitle: videoInfo.snippet.title,
                    videoChannel: videoInfo.snippet.channelTitle
                }
                if (!video) {
                    sendStatus({
                        message: 'No Video Added',
                        type: "danger"
                    })
                } else {
                    videoQue.insertOne({
                        video: video,
                        user: user
                    }, function () {
                        // Send status object
                        sendStatus({
                            message: 'Video Added!',
                            type: "success"
                        })
                        //Send new que after each add
                        videoQue.find().limit(100).sort({
                            _id: 1
                        }).toArray(function (err, res) {
                            if (err) {
                                throw err
                            }
                            // Emit VideoQue
                            io.emit('videoOutput', res);
                        })
                    });
                }
            }).catch(function (err) {
                throw err
            })
        });

        //Sign in user
        socket.on('signIn', function (data) {
            Users.findOneAndUpdate({username: data.user.username}, {$set: {socketID: socket.id}}, (err, doc) => {
                if (err) {
                    sendStatus({
                        message: [err],
                        type: "danger"
                    })
                }
            });
            videoQue.find().limit(100).sort({
                _id: 1
            }).toArray(function (err, res) {
                if (err) {
                    throw err
                }
                // Emit VideoQue
                socket.emit('videoOutput', res);
                socket.emit('voteToSkipCounter', skipCounter.length);
                sendUsers();
            });
        });

        socket.on('disconnect', function(){
            Users.findOneAndUpdate({socketID: socket.id}, {$set: {socketID: null}}, (err, doc) => {
                if (err) {
                    sendStatus({
                        message: [err],
                        type: "danger"
                    })
                }
            });
        })

        socket.on('voteToSkip', function (data) {
            let skipCountNeeded = (io.engine.clientsCount / 2);
            if (!skipCounter.includes(data.user.username)) {
                skipCounter.push(data.user.username);
            }
            if (skipCounter.length >= skipCountNeeded) {
                skipVideo(data);
                skipCounter = [];
            }
            io.emit('voteToSkipCounter', skipCounter.length);
        });

        socket.on('removeVideo', function (data) {
            skipVideo(data);
        });
    });
});