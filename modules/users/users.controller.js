const { Router } = require('express');

const { validateAuth } = require('../../middlewares/validate-auth');
const { UsersServices } = require('./users.services');

const router = Router();

router.get('/', validateAuth, async (req, res) => {
  const offSet = Number(req.query.offSet) || 0;
  const limit = Number(req.query.limit) || 100;

  const userServices = new UsersServices();
  const users = await userServices.getUsersByNotId(req.id, offSet, limit);

  res.status(200).json({
    ok: true,
    usuarios: users
  });
});

module.exports = router;