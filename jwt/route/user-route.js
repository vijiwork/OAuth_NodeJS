module.exports = function(app) {
const controller= require('../controller/user-controller');
    // todoList Routes
    app.route('/profile').post(controller.loginRequired, controller.profile);
    app.route('/auth/register').post(controller.register);
    app.route('/auth/sign_in').post(controller.sign_in);
};