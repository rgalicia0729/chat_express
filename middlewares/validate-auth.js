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
    const { uid } = jwt.verify(token, JWT_PRIVATE_KEY);
    req.uid = uid;

    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      message: 'No autorizado',
    });
  }

}

module.exports = { validateAuth }