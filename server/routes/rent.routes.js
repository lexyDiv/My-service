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
let rentProc = require('../middleweres/rentProc');

router.put('/', async (req, res) => {
  try {
    const rentInterval = setInterval(async () => {
      if (!rentProc) {
        clearInterval(rentInterval);
        rentProc = true;
        const {
          type,
          startTime,
          endTime,
          client_id,
          update_date,
          id,
          check,
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
            rent.startTime = startTime;
            rent.endTime = endTime;
          }
          rent.client_id = client_id;
          rent.type = type;
          rent.update_date = update_date;
          rent.check = check;
          await rent.save();
          if (intervalOk) {
            rentProc = false;
            return res.json({ message: 'ok', rent });
          }
          rentProc = false;
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
        rentProc = false;
        return res.json({
          message: 'deleted',
        });
      }
    }, 100);
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
      checkFull,
    } = req.body;

    const rentInterval = setInterval(async () => {
      if (!rentProc) {
        clearInterval(rentInterval);
        rentProc = true;

        const house = await House.findOne({ where: { id: house_id } });

        if (!house) {
          rentProc = false;
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
            checkFull,
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
          rentProc = false;
          return res.json({ message: 'ok', newRent });
        }
        rentProc = false;
        return res.json({ message: 'sory', allHouseRents });
      }
    }, 100);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
