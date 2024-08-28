/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');
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
  Application,
  sequelize,
} = require('../db/models');
const isValidRent = require('../middleweres/isValidRent');

router.get('/:id/:intervalData', async (req, res) => {
  try {
    const { id, intervalData } = req.params;
    const interval = JSON.parse(intervalData);
    let houses = null;
    const freeHouses = [];
    if (!Number(id)) {
      houses = await House.findAll({ include: [{ model: Rent }] });
    } else {
      houses = await House.findAll({
        where: { location_id: id },
        include: [{ model: Rent }],
      });
    }

    houses.forEach((house) => {
      const rents = house.Rents;
      if (isValidRent(interval.startTime, interval.endTime, rents)) {
        freeHouses.push(house);
      }
    });

    return res.json({ message: 'ok', freeHouses });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

module.exports = router;
