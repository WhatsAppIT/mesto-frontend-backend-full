const mongoose = require('mongoose');
const SigninError = require('../errors/SigninError');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'минимальная длинна 2 символа'],
      maxlength: 30,
    },

    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },

    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => isEmail(email),
        message: 'Неправильный формат почты',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false,
    statics: {
    findUserByCredentials(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            throw new SigninError('Неправильные логин или пароль');
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new SigninError('Неправильные логин или пароль');
              }
              return user;
            });
        });
    },
  },
},
);

module.exports = mongoose.model('user', userSchema);
