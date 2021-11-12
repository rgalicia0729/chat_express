const { AuthModel } = require('../auth/auth.model');

class UsersRepository {
  async findUsersByNotId(id, offSet, limit) {
    return await AuthModel
      .find({ _id: { $ne: id } })
      .sort('-online')
      .skip(offSet)
      .limit(limit);
  }
}

module.exports = { UsersRepository };