const { Router } = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

const { AuthServices } = require('./auth.services');
const { validateRequest } = require('../../middlewares/validate-request');
const { validateAuth } = require('../../middlewares/validate-auth');
const { JWT_PRIVATE_KEY } = require('../../env');


const router = Router();

router.post('/signup', [
  body('name')
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage('Nombre no valido'),
  body('email')
    .isEmail()
    .withMessage('Email no valido'),
  body('password')
    .trim()
    .isString()
    .isLength({ min: 5 })
    .withMessage('Password no valido'),
  validateRequest
], async (req, res) => {
  const { email } = req.body;
  const authServices = new AuthServices();

  if (await authServices.existEmail(email)) {
    return res.status(400).json({
      ok: false,
      message: 'Algo salio mal, comuniquese con el administrador',
    });
  }

  const result = await authServices.createUser(req.body);

  res.status(201).json({
    ok: true,
    response: result,
    token: jwt.sign({ uid: result._id }, JWT_PRIVATE_KEY, { expiresIn: '12h' }),
  });

});

router.post('/signin', [
  body('email')
    .isEmail()
    .withMessage('Email no valido'),
  body('password')
    .trim()
    .isString()
    .isLength({ min: 5 })
    .withMessage('Password no valido'),
  validateRequest
], async (req, res) => {
  const authServices = new AuthServices();
  const usuario = await authServices.validateCredentials(req.body);

  if (!usuario) {
    return res.status(403).json({
      ok: false,
      message: 'Acceso denegado, credenciales invalidas',
    });
  }

  res.status(200).json({
    ok: true,
    response: usuario,
    token: jwt.sign({ uid: usuario._id }, JWT_PRIVATE_KEY, { expiresIn: '12h' }),
  });

});

router.get('/current-user', validateAuth, async (req, res) => {
  const authService = new AuthServices();
  const usuario = await authService.findUserById(req.uid);

  if (!usuario) {
    return res.status(401).json({
      ok: false,
      message: 'No autorizado',
    });
  }

  res.status(200).json({
    ok: true,
    response: usuario,
    token: jwt.sign({ uid: usuario._id }, JWT_PRIVATE_KEY, { expiresIn: '12h' }),
  });
});

module.exports = router;