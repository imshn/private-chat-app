const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
  let hased;
  
  return hased;
};

const compareHash = (password, hash) => {
  let res;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) throw err;
    res = result;
  });
  return res;
};

module.exports = { compareHash, encryptPassword };
