const { userSchema } = require("../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const reqData = req.body;
  let user = { ...reqData };
  const userModel = mongoose.model("Users", userSchema);

  const userData = await userModel.findOne({ username: user.username });
  if (!userData) {
    return res.status(401).send({ message: "User does not exist" });
  }
  if (!bcrypt.compareSync(user.password, userData.password))
    return res.status(401).send({ message: "Invalid password" });
  const accessToken = jwt.sign(
    { username: user.username, _id: userData._id },
    process.env.JWT_SECRET
  );
  res.cookie("a_token", accessToken);
  res.status(200).send({
    a_token: accessToken,
    user: { username: userData.username, _id: userData._id },
  });
};

const register = async (req, res) => {
  const reqData = req.body;
  bcrypt.hash(reqData.password, 12, async function (err, hash) {
    const userModel = new mongoose.model("Users", userSchema);
    userData = await userModel.create({
      username: reqData.username,
      password: hash,
    });
    if (!userData || err) {
      res.status(401).send("Could not create user");
    } else {
      res.status(200).send({ user: userData.username, _id: userData._id });
    }
  });
};

const allUsers = async (req, res) => {
  const userModel = mongoose.model("Users", userSchema);
  const users = await userModel.find().select(["username", "_id"]);
  if (!users) {
    res.status(401).send("Error While fetching users!");
  } else {
    res.status(200).send({ users });
  }
};
const getUser = async (req, res) => {
  const userModel = mongoose.model("Users", userSchema);
  const user = await userModel
    .findOne({ _id: req.params._id })
    .select(["username", "_id"]);
  if (!user) {
    res.status(401).send("Error While fetching the user!");
  } else {
    res.status(200).send({ user });
  }
};
module.exports = {
  login,
  register,
  allUsers,
  getUser,
};
