const { io } = require('../../app');
const { AuthServices } = require('../../modules/auth/auth.services');
const { MessagesServices } = require('../../modules/messages/messages.services');

const { validateJWT } = require('../../helpers/jwt');

io.on('connection', (client) => {
  const token = client.handshake.headers['x-token'];
  const [isValid, id] = validateJWT(token);

  if (!isValid) {
    return client.disconnect();
  }

  const authService = new AuthServices();
  authService.userConnect(id);

  // Agregar al usuario conectado a una sala
  client.join(id);

  client.on('personal-message', async (payload) => {
    payload.from = id;

    const messagesServices = new MessagesServices();
    await messagesServices.createMessage(payload);

    io.to(payload.to).emit('personal-message', payload);
  });

  client.on('disconnect', () => {
    authService.userDisconnect(id);
  });
});