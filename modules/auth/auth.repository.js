const { AuthModel } = require('./auth.model');

class AuthRepository {
  async findById(id) {
    return await AuthModel.findOne({ _id: id });
  }

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