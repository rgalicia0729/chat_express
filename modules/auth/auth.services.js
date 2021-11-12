const { AuthRepository } = require('./auth.repository');
const bcrypt = require('bcryptjs');

class AuthServices {
  async findUserById(id) {
    const authRepository = new AuthRepository();
    return await authRepository.findById(id);
  }

  async existEmail(email) {
    const authRepository = new AuthRepository();
    const usuario = await authRepository.findByEmail(email);

    return usuario ? true : false;
  }


  async createUser(body) {
    const authRepository = new AuthRepository();

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);

    return await authRepository.create({
      name: body.name,
      email: body.email,
      password: hashPassword
    });
  }

  async validateCredentials(body) {
    const authRepository = new AuthRepository();
    const usuario = await authRepository.findByEmail(body.email);

    if (!usuario) {
      return null;
    }

    if (!await bcrypt.compare(body.password, usuario.password)) {
      return null;
    }

    return usuario;

  }

  async userConnect(id = '') {
    const authRepository = new AuthRepository();

    const usuario = await authRepository.findById(id);
    usuario.online = true;
    await usuario.save();

    return usuario;
  }

  async userDisconnect(id = '') {
    const authRepository = new AuthRepository();

    const usuario = await authRepository.findById(id);
    usuario.online = false;
    await usuario.save();

    return usuario;
  }
}

module.exports = { AuthServices }