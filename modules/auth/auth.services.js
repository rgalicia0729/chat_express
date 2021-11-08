const { AuthRepository } = require('./auth.repository');

class AuthServices {
  async existEmail(email) {
    const authRepository = new AuthRepository();
    const usuario = await authRepository.findByEmail(email);

    return usuario ? true : false;
  }


  async createUser(body) {
    const authRepository = new AuthRepository();
    return await authRepository.create({
      name: body.name,
      email: body.email,
      password: body.password
    });
  }
}

module.exports = { AuthServices }