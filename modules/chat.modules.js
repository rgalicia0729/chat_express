const authController = require('./auth/auth.controller');
const usersControllers = require('./users/users.controller');
const messagesController = require('./messages/messages.controller');

class Modules {

  constructor(app) {
    this.app = app;
  }

  addModules() {
    this.app.use('/auth', authController);
    this.app.use('/users', usersControllers);
    this.app.use('/messages', messagesController);
  }
}

module.exports = { Modules }