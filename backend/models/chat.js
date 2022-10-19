const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
});

const chatModel = model('Chats', chatSchema);
module.exports = { chatModel };
