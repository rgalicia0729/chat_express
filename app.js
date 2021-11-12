const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const { Modules } = require('./modules/chat.modules');
const { PORT, URI_MONGODB } = require('./env');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de socket service
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./modules/sockets/socket_service');

// Public files
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Add modules
const modules = new Modules(app);
modules.addModules();

// Conexión con mongodb
mongoose.connect(URI_MONGODB);

server.listen(PORT, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
