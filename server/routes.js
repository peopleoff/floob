const VideoController = require('./controllers/VideoController');
const UserController = require('./controllers/UserController');
const RoomController = require('./controllers/RoomController');

module.exports = (app) => {

    // // Get Requests
    // app.get('/getGames', GameController.getGames);
    app.get('/rooms/getAll', RoomController.getAll);
    // // Post Requests
    app.post('/videos/add', VideoController.add)
    app.post('/videos/getThumbnail', VideoController.getThumbnail)
    //User's Requests
    app.post('/users/register', UserController.register);
    app.post('/users/login', UserController.login);
    app.post('/users/tokenLogin', UserController.tokenLogin);
    app.post('/users/requestPasswordChange', UserController.requestPasswordChange);
    app.post('/users/changePassword', UserController.changePassword);
    //Rooms Requests
    app.post('/rooms/register', RoomController.register);
    app.post('/rooms/checkPassword', RoomController.checkPassword);

};