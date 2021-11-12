const { io } = require('../../app');
const { AuthServices } = require('../../modules/auth/auth.services');

const { validateJWT } = require('../../helpers/jwt');

io.on('connection', (client) => {
  const token = client.handshake.headers['x-token'];
  const [isValid, id] = validateJWT(token);

  if (!isValid) {
    return client.disconnect();
  }

  const authService = new AuthServices();
  authService.userConnect(id);

  client.on('disconnect', () => {
    authService.userDisconnect(id);
  });
});