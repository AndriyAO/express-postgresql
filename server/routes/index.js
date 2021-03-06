const express = require("express");
const passport = require("passport");
const passportLocal = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
require("../config/passport/passport")(passport);

const userController = require("./../controllers/user");
const authController = require("./../controllers/auth");

const router = express.Router();

router.post("/users", userController.createUser);
router.post("/login", passportLocal, authController.login);
router.get("/users/:id", userController.findUser);
router.put("/users/:id", userController.updateUserById);

router.get("/auth", passportJWT, authController.jwtAuth);

module.exports = router;
