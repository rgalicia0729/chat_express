const { MessagesRepository } = require('./messages.repository');

class MessagesServices {
  constructor() {
    this.messageRepository = new MessagesRepository();
  }

  async createMessage(data) {
    return await this.messageRepository.create({
      from: data.from,
      to: data.to,
      message: data.message,
    });
  }

  async getMessages(from, to, offSet = 0, limit = 30) {
    return await this.messageRepository.get(from, to, offSet, limit);
  }
}

module.exports = { MessagesServices }