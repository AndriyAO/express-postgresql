const User = require("./../models/index").User;

function createUser(req, res) {
  const user = User.build({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}

function findUser(req, res) {
  User.findByPk(req.params.id).then(
    user => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send({ user });
    },
    err => {
      res.status(400).send(err);
    }
  );
}

function updateUserById(req, res) {
  User.update(req.body, { where: { id: req.params.id } })
    .then(user => {
      if (!user[0]) {
        return res.status(404).send("User not found");
      }
      res.status(200);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

module.exports = {
  createUser,
  findUser,
  updateUserById
};
