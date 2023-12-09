const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const DeleteCardError = require('../errors/DeleteCardError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new ValidationError(
            'Переданы некорректные данные при создании карточки.',
          ),
        );
      }
      return next(err);
    });
};

const deleteCardId = (req, res, next) => {
  const owner = req.user._id;

  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }
      if (card.owner.toString() !== owner) {
        throw new DeleteCardError('Нельзя удалить данную карточку.');
      }
      return Card.deleteOne(card);
    })
    .then((myCard) => {
      res.send(myCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new ValidationError(
            'Переданы некорректные данные при поиске карточки.',
          ),
        );
      }
      return next(err);
    });
};

const deleteCardsIdLikes = async (req, res, next) => {
  //const owner = req.user._id;
  try {
    const deleteLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!deleteLike) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }

    return res.send(deleteLike);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(
        new ValidationError('Переданы некорректные данные для снятия лайка.'),
      );
    }

    return next(err);
  }
};

const putCardsIdLikes = async (req, res, next) => {
  try {
    const putLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate('likes')

    if (!putLike) {
      throw new NotFoundError('Карточка с указанным _id не найден.');
    }

    return res.send(putLike);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(
        new ValidationError('Переданы некорректные данные для снятия лайка.'),
      );
    }

    return next(err);
  }
};

module.exports = {
  getCards,
  postCard,
  deleteCardId,
  deleteCardsIdLikes,
  putCardsIdLikes,
};
