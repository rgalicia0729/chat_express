const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { Modules } = require('./modules/chat.modules');
const { PORT, URI_MONGODB } = require('./env');

const app = express();
app.use(cors());
app.use(express.json());

// Add modules
const modules = new Modules(app);
modules.addModules();

// Conexión con mongodb
mongoose.connect(URI_MONGODB);

app.listen(PORT, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
