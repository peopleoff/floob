const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
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

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getVideoID(name, url) {
    if (url.includes("youtu.be")) {
        let index = 0;
        //Mobile Link
        let firstCheck = url.split("/")[url.split("/").length - 1];
        if (firstCheck.length > 0) {
            index = url.split("/").length - 1
        } else {
            index = url.split("/").length - 2
        }
        let videoID = url.split("/")[index];
        return videoID
    }
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));

}

function getVideoInfo(ID) {
    var service = google.youtube('v3');
    let response = service.videos.list({
        auth: auth.YoutubeAPI,
        part: 'snippet',
        id: ID
    });
    return response;
}

function videoSearch(q) {
    var service = google.youtube('v3');
    let response = service.search.list({
        auth: auth.YoutubeAPI,
        part: 'snippet',
        maxResults: '10',
        q: q
    });
    return response;
}

function playlistVideos(playerlistID) {
    var service = google.youtube('v3');
    let response = service.playlistItems.list({
        auth: auth.YoutubeAPI,
        part: 'contentDetails',
        maxResults: '50',
        playlistId: playerlistID
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
    let videoQue = db.collection('videoQue');
    let users = db.collection('users');

    app.post('/addVideo', function (req, res) {
        if (!req.body.videoURL) {
            return res.send({
                error: true,
                message: ["No Video URL"],
                type: "danger"
            })
        }
        addVideoAPI(req.body);
        return res.status(200).send({
            error: false,
            message: ["Video Added"],
            type: "success"
        });
    });

    function addVideoAPI(data) {
        let videoID = data.videoURL;
        let user = data.user;
        getVideoInfo(getVideoID("v", videoID)).then(function (data) {
            let videoInfo = data.data.items[0];
            let video = {
                videoID: videoInfo.id,
                videoTitle: videoInfo.snippet.title,
                videoChannel: videoInfo.snippet.channelTitle,
                thumbnailURL: videoInfo.snippet.thumbnails.default.url
            }
            if (!video) {
                sendStatus({
                    message: ['No Video Added'],
                    type: "danger"
                })
            } else {
                videoQue.insertOne({
                    video: video,
                    user: user
                }, function () {
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
    };

    //Connect to socket.io
    io.on('connection', function (socket) {

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
            users.find({
                socketID: {
                    $ne: null
                }
            }).limit(100).sort({
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
                    element.color = getRandomColor();
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
                    message: ['No Video Added'],
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
                    videoChannel: videoInfo.snippet.channelTitle,
                    thumbnailURL: videoInfo.snippet.thumbnails.default.url
                }
                if (!video) {
                    sendStatus({
                        message: ['No Video Added'],
                        type: "danger"
                    })
                } else {
                    videoQue.insertOne({
                        video: video,
                        user: user
                    }, function () {
                        // Send status object
                        sendStatus({
                            message: ['Video Added!'],
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
            if (!data.user) {
                return "asd";
            }
            Users.findOneAndUpdate({
                username: data.user.username
            }, {
                $set: {
                    socketID: socket.id
                }
            }, (err, doc) => {
                if (err) {
                    sendStatus({
                        message: [err],
                        type: "danger"
                    })
                }
                io.emit('usersChanged', {
                    username: doc.username,
                    status: {
                        message: [`${doc.username} Has Signed-In`],
                        type: "success"
                    }
                });
            });
            videoQue.find().limit(100).sort({
                _id: 1
            }).toArray(function (err, res) {
                if (err) {
                    throw err
                }
                // Emit VideoQue
                if (res.length > 0) {
                    io.emit('secondsRequest');
                }
                socket.emit('videoOutput', res);
                socket.emit('voteToSkipCounter', skipCounter.length);
                sendUsers();
            });
        });

        socket.on('disconnect', function () {
            Users.findOneAndUpdate({
                socketID: socket.id
            }, {
                $set: {
                    socketID: null
                }
            }, (err, doc) => {
                if (err) {
                    sendStatus({
                        message: [err],
                        type: "danger"
                    })
                }
                sendUsers();
                if (doc) {
                    io.emit('usersChanged', {
                        username: doc.username,
                        status: {
                            message: [`${doc.username} Has Signed-Out`],
                            type: "danger"
                        }
                    });
                }
            });
        })

        socket.on('searchVideos', function (data) {
            let q = data.search
            videoSearch(q).then(function (data) {
                socket.emit('searchResult', data.data);
            }).catch(function (err) {
                throw err
            })
        });

        socket.on('addPlaylist', function (data) {
            let playlistID = data.playlistID
            let user = data.user;
            playlistVideos(playlistID).then(function (data) {
                data.data.items.forEach(element => {
                    getVideoInfo(element.contentDetails.videoId).then(function (data) {
                        let videoInfo = data.data.items[0];
                        let video = {
                            videoID: videoInfo.id,
                            videoTitle: videoInfo.snippet.title,
                            videoChannel: videoInfo.snippet.channelTitle,
                            thumbnailURL: videoInfo.snippet.thumbnails.default.url
                        }
                        if (!video) {
                            sendStatus({
                                message: ['No Video Added'],
                                type: "danger"
                            })
                        } else {
                            videoQue.insertOne({
                                video: video,
                                user: user
                            }, function () {
                                // Send status object
                                sendStatus({
                                    message: ['Video Added!'],
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
            }).catch(function (err) {
                throw err
            })
        })

        socket.on('voteToSkip', function (video, user) {
            let skipCountNeeded = (io.engine.clientsCount / 2);
            if (!skipCounter.includes(user.username)) {
                skipCounter.push(user.username);
            }
            if (skipCounter.length >= skipCountNeeded) {
                skipVideo(video);
                skipCounter = [];
            }
            io.emit('voteToSkipCounter', skipCounter.length);
        });

        socket.on('removeVideo', function (data) {
            skipVideo(data);
        });
    });
});