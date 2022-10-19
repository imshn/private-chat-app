const router = require("express").Router();
const {
  login,
  register,
  allUsers,
  getUser,
} = require("../controllers/userController");
router.get("/", allUsers);
router.get("/:_id", getUser);
router.post("/login", login);
router.post("/register", register);
module.exports = router;
