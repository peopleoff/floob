const VideoController = require('./controllers/VideoController');
const UserController = require('./controllers/UserController');
const RoomController = require('./controllers/RoomController');

module.exports = (app) => {

    // // Get Requests
    // // Post Requests
    app.post('/videos/add', VideoController.add)
    app.post('/videos/getThumbnail', VideoController.getThumbnail)
    //User's Requests
    app.post('/users/register', UserController.register);
    app.post('/users/login', UserController.login);
    app.post('/users/requestPasswordChange', UserController.requestPasswordChange);
    app.post('/users/changePassword', UserController.changePassword);
    //Rooms Requests
    app.post('/rooms/getAll', RoomController.getAll);
    app.post('/rooms/register', RoomController.register);
    app.post('/rooms/toggleRoom', RoomController.toggleRoom);
    app.post('/rooms/getInfo', RoomController.getInfo);
    // app.post('/rooms/checkPassword', RoomController.checkPassword);

};