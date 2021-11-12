const jwt = require('jsonwebtoken');

const { JWT_PRIVATE_KEY } = require('../env');

const validateAuth = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No autorizado',
    });
  }

  try {
    const { id } = jwt.verify(token, JWT_PRIVATE_KEY);
    req.id = id;

    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      message: 'No autorizado',
    });
  }

}

module.exports = { validateAuth }