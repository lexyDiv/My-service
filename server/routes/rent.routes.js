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
      days, user_id, house_id, data, date, startDate, endDate, status, type, startTime, endTime,
    } = req.body;
    const newRentData = await Rent.create({
      days, user_id, house_id, data, date, startDate, endDate, status, type, startTime, endTime,
    });
    const newRent = await Rent.findOne({
      where: {
        id: newRentData.id,
      },
      include: [
        { model: User },
      ],
    });
    res.json(newRent);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
