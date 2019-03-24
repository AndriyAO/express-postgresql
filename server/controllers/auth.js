const jwt = require("jsonwebtoken");

function login(req, res) {
  const token = signToken(req.user);
  res.status(200).json({ token });
}

function jwtAuth(req, res) {
  console.log("ok");
  res.json({ status: "Authorization_success" });
}

function signToken(user) {
  return jwt.sign(
    {
      iss: "test-task",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    "secret"
  );
}

module.exports = {
  login,
  jwtAuth
};
