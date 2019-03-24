const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../../models/index").User;

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      function(email, password, done) {
        User.findOne({ where: { email: email } })
          .then(user => {
            if (!user)
              return done(null, false, { message: "Incorrect username." });
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          })
          .catch(err => {
            done(err);
          });
      }
    )
  );
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "secret"
  };
  passport.use(
    new JwtStrategy(jwtOptions, function(payload, done) {
      User.findByPk(payload.sub)
        .then(user => {
          if (user) {
            console.log(user);
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch(err => {
          done(err);
        });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
