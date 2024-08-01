/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const {
  User,
  Message,
  LComment,
  Location,
  Code,
  House,
  Rent,
  Hcomment2,
  Rcomment,
} = require('../db/models');

router.post('/', async (req, res) => {
  try {
    const {
      rent_id, user_id, value, date,
    } = req.body;
    const newRcomment = await Rcomment.create({
      rent_id,
      user_id,
      value,
      date,
    });
    if (newRcomment) {
      const rComment = await Rcomment.findOne({
        where: { id: newRcomment.id },
        include: [{ model: User }],
      });
      if (rComment) {
        return res.json({ message: 'ok', rComment });
      }
    }
    return res.json({ message: 'bad' });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const { messageText, comment_id } = req.body;
    const rComment = await Rcomment.findOne({
      where: { id: comment_id },
      include: [{ model: User }],
    });
    if (rComment) {
      rComment.value = messageText;
      await rComment.save();
      return res.json({ message: 'ok', rComment });
    }
    return res.json({ message: 'bad' });
  } catch (err) {
    console.log(err.message);
    return res.json({ message: 'bad' });
  }
});

router.delete('/:comment_id', async (req, res) => {
  try {
    const { comment_id } = req.params;
    await Rcomment.destroy({ where: { id: comment_id } });
    return res.json({ message: 'ok', comment_id });
  } catch (err) {
    return res.json({ message: 'bad' });
  }
});

module.exports = router;
