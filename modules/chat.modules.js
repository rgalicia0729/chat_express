const authController = require('./auth/auth.controller');
const usersControllers = require('./users/users.controller');

class Modules {

  constructor(app) {
    this.app = app;
  }

  addModules() {
    this.app.use('/auth', authController);
    this.app.use('/users', usersControllers);
  }
}

module.exports = { Modules }