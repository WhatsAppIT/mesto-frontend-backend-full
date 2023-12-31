const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const RepetError = require('../errors/RepetError');
const SigninError = require('../errors/SigninError');

const postUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(201).send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(
            new ValidationError(
              'Переданы некорректные данные при создании пользователя.',
            ),
          );
        }
        if (err.code === 11000) {
          return next(new RepetError('Такаой email уже зарегистрирован c u.'));
        }
        return next(err);
      });
  });
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new ValidationError(
            'Переданы некорректные данные при поиске пользователя.',
          ),
        );
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new SigninError('Неправильные логин или пароль c u login');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new SigninError('Неправильные логин или пароль c u login');
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
          expiresIn: '7d',
        });
        res.send({ token });
      });
    })

    .catch((err) => {
      next(err);
    });
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.userId);

    if (!getUser) {
      throw new NotFoundError('Нет пользователя с таким id');
    }

    return res.send(getUser);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(
        new ValidationError(
          'Переданы некорректные данные при поиске пользователя.',
        ),
      );
    }

    return next(err);
  }
};

const patchUsersMe = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const patchUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      { new: true, runValidators: true },
    );

    if (!patchUser) {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    }

    return res.send(patchUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(
        new ValidationError(
          'Переданы некорректные данные при поиске пользователя.',
        ),
      );
    }

    return next(err);
  }
};

const patchUsersMeAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const patchAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!patchAvatar) {
      throw new NotFoundError('Аватар по указанному _id не найден.');
    }

    return res.send(patchAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(
        new ValidationError(
          'Переданы некорректные данные при поиске пользователя.',
        ),
      );
    }

    return next(err);
  }
};

module.exports = {
  getProfile,
  login,
  getUsers,
  getUserId,
  postUser,
  patchUsersMe,
  patchUsersMeAvatar,
};
