const { Router } = require('express');

const { validateAuth } = require('../../middlewares/validate-auth');
const { MessagesServices } = require('./messages.services');

const router = Router();

router.get('/:to', validateAuth, async (req, res) => {
  const messagesServices = new MessagesServices();
  const messages = await messagesServices.getMessages(
    req.id,
    req.params.to,
    req.query.offSet,
    req.query.limit,
  );

  res.status(200).json({
    ok: true,
    messages,
  });
});


module.exports = router;
