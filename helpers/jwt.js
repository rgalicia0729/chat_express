const jwt = require('jsonwebtoken');

const { JWT_PRIVATE_KEY } = require('../env');

const validateJWT = (token = '') => {
  try {
    const { id } = jwt.verify(token, JWT_PRIVATE_KEY);
    return [true, id];
  } catch (err) {
    return [false];
  }
}

module.exports = { validateJWT }