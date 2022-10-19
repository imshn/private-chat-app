const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const origin = req.headers.origin;
  if (
    ![
      "http://localhost:5173/users/login",
      "http://localhost:5173/users/register",
    ].includes(origin)
  ) {
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    next();
  }
};

module.exports = {
  authenticateToken,
};
