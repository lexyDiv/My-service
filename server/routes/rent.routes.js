/* eslint-disable no-unused-vars */
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
  Client,
  sequelize,
} = require('../db/models');

function isValidRent(startTime, endTime, rents) {
  for (let i = 0; i < rents.length; i += 1) {
    const rent = rents[i];
    const rentStartTime = Number(rent.startTime);
    const rentEndTime = Number(rent.endTime);
    if (
      (startTime >= rentStartTime && startTime <= rentEndTime)
      || (endTime >= rentStartTime && endTime <= rentEndTime)
      || (startTime <= rentStartTime && endTime >= rentEndTime)
    ) {
      return false;
    }
  }
  return true;
}

router.post('/', async (req, res) => {
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
      location_id,
    } = req.body;

    const allHouseRents = await Rent.findAll({
      where: { house_id },
      include: [
        {
          model: Rcomment,
          // offset: 0, limit: 3, // ok
          order: sequelize.col('id'),
          include: [{ model: User }],
        },
        { model: User },
        { model: Client },
      ],
    });
    if (isValidRent(Number(startTime), Number(endTime), allHouseRents)) {
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
        location_id,
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
      return res.json({ message: 'ok', newRent });
    }
    return res.json({ message: 'sory', allHouseRents });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
