const authController = require('./auth/auth.controller')

class Modules {

  constructor(app) {
    this.app = app;
  }

  addModules() {
    this.app.use('/auth', authController);
  }
}

module.exports = { Modules }