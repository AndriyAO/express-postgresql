const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ["^[a-z]+$", "i"]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          is: ["^[a-z]+$", "i"]
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          isMobilePhone: true
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 6
        }
      }
    },
    {
      timestamps: false,
      force: true //only DEV
    },
    {
      classMethods: {
        validPassword(password) {
          console.log(password, this.password);
          return bcrypt.compareSync(password, this.password);
        }
      }
    }
  );

  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });

  return User;
};
