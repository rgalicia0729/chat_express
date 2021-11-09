require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  URI_MONGODB: process.env.URI_MONGODB,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
}