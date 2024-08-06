/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
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
  Client,
} = require("../db/models");

router.post("/", async (req, res) => {
  try {
    const {
      days,
      user_id,
      house_id,
      data,
      date,
      startDate,
      endDate,
      status,
      type,
      startTime,
      endTime,
      client_id,
    } = req.body;
    const newRentData = await Rent.create({
      days,
      user_id,
      house_id,
      data,
      date,
      startDate,
      endDate,
      status,
      type,
      startTime,
      endTime,
      client_id,
    });
    const newRent = await Rent.findOne({
      where: {
        id: newRentData.id,
      },
      include: [
        { model: User },
        { model: Rcomment, include: [{ model: User }] },
        { model: Client },
      ],
    });
    res.json(newRent);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
