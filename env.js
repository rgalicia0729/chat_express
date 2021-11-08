require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  URI_MONGODB: process.env.URI_MONGODB
}