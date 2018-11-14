const UserController = require('./controllers/UserController');

module.exports = (app) => {

    // // Get Requests
    // app.get('/getGames', GameController.getGames);
    // // Post Requests
    app.post('/register', UserController.register);
    app.post('/signIn', UserController.signIn);

};