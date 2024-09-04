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
const isValidRent = require('../middleweres/isValidRent');

router.put('/', async (req, res) => {
  try {
    const {
     // days,
      //  user_id,
      house_id,
      //  data,
      //  date,
      // startDate,
      //  endDate,
      //  status,
      type,
      startTime,
      endTime,
      client_id,
      //  location_id,
      update_date,
      id,
    } = req.body;

    const rent = await Rent.findOne({
      where: { id },
      include: [
        {
          model: Rcomment,
          // offset: 0, limit: 3, // ok
          order: sequelize.col('id'),
          include: [{ model: User }],
        },
        { model: User },
      ],
    });
    if (rent) {
      const rentsDtata = await Rent.findAll({
        where: { house_id: rent.house_id },
        include: [
          {
            model: Rcomment,
            // offset: 0, limit: 3, // ok
            order: sequelize.col('id'),
            include: [{ model: User }],
          },
          { model: User },
        ],
      });
      const rents = rentsDtata.filter((r) => r.id !== rent.id);
      const intervalOk = isValidRent(Number(startTime), Number(endTime), rents);
      if (intervalOk) {
       // rent.days = days;
        rent.startTime = startTime;
        rent.endTime = endTime;
      }
      rent.client_id = client_id;
      rent.type = type;
      rent.update_date = update_date;
      await rent.save();
      if (intervalOk) {
        return res.json({ message: 'ok', rent });
      }
      return res.json({
        message: 'interval',
        rent,
        rents: rentsDtata.map((r) => {
          if (r.id !== rent.id) {
            return r;
          }
          return rent;
        }),
      });
    }
    // const rentsDtata = await Rent.findAll({
    //   where: { house_id },
    //   include: [
    //     {
    //       model: Rcomment,
    //       // offset: 0, limit: 3, // ok
    //       order: sequelize.col('id'),
    //       include: [{ model: User }],
    //     },
    //     { model: User },
    //   ],
    // });
    return res.json({
      message: 'deleted',
      // rents: rentsDtata,
    });
  } catch (err) {
    res.json({ message: 'bad' });
  }
});

router.delete('/:rentId', async (req, res) => {
  try {
    const { rentId } = req.params;
    if (rentId && Number(rentId)) {
      const rent = Rent.findOne({ where: { id: rentId } });
      if (rent) {
        await Rent.destroy({ where: { id: rentId } });
        return res.json({ message: 'ok' });
      }
      return res.json({ message: 'ok' });
    }
    return res.json({ message: 'bad' });
  } catch (err) {
    return res.json({ message: 'bad' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
    //  days,
      user_id,
      house_id,
      data,
      date,
      // startDate,
      // endDate,
      status,
      type,
      startTime,
      endTime,
      client_id,
      location_id,
      update_date,
    } = req.body;

    const house = await House.findOne({ where: { id: house_id } });

    if (!house) {
      return res.json({ message: 'Не удалось создать. Дом удалён другим администратором!', code: 'del' });
    }

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
        user_id,
        house_id,
        data,
        date,
        status,
        type,
        startTime,
        endTime,
        client_id,
        location_id,
        update_date,
        check: false,
        checkInfo: '',
        checkSumm: 0,
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
