const { UsersRepository } = require('./users.repository');

class UsersServices {
  async getUsersByNotId(id, offSet = 0, limit = 100) {
    const usersRepository = new UsersRepository();
    const users = await usersRepository.findUsersByNotId(id, offSet, limit);

    return users;
  }
}

module.exports = { UsersServices }