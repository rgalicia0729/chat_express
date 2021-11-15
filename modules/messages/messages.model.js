const { Schema, model } = require('mongoose');

const MessageSchema = Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'Usuarios',
      require: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'Usuarios',
      require: true,
    },
    message: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true
  }
);

MessageSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return object;
});

const MessagesModel = model('messages', MessageSchema);

module.exports = { MessagesModel }