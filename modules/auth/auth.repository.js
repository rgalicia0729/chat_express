const { AuthModel } = require('./auth.model');

class AuthRepository {
  async findByEmail(email) {
    return await AuthModel.findOne({ email });
  }

  async create(user) {
    const authModel = new AuthModel(user);

    await authModel.save();

    return authModel;
  }
}

module.exports = { AuthRepository }