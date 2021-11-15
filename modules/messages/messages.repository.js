const { MessagesModel } = require('./messages.model');

class MessagesRepository {

  async get(from, to, offSet, limit) {
    const messages = await MessagesModel.find({
      $or: [{ from: from, to: to }, { from: to, to: from }]
    })
      .sort({ createdAt: 'desc' })
      .skip(offSet)
      .limit(limit);

    return messages;
  }

  async create(message) {
    const newMessage = new MessagesModel(message);
    await newMessage.save();

    return message;
  }
}

module.exports = { MessagesRepository }