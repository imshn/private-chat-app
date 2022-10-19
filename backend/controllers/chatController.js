const { chatModel } = require("../models/chat");
const createMessage = async function (data) {
  await new chatModel(data).save();
};

const getMessages = async (req, res) => {
  const reqData = req.params;
  let messages = await chatModel.find({ $or:[ {from: reqData.from, to: reqData.to },{ from: reqData.to, to: reqData.from }]});
  return res.status(200).json({ messages: messages });
};

module.exports = {
  createMessage,
  getMessages,
};
