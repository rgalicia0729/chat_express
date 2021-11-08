const { Router } = require('express');
const { body } = require('express-validator');

const { AuthServices } = require('./auth.services');
const { validateRequest } = require('../../middlewares/validate-request');

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
    response: result
  });

});

module.exports = router;