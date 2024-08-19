/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { where, Sequelize, json } = require('sequelize');
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

router.get('/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findOne({ where: { id: clientId } });
    if (client) {
      return res.json({ message: 'ok', client });
    }
    return res.json({ message: 'bad' });
  } catch (err) {
    return res.json({ err });
  }
});

router.get('/ondata/:text/:typeData', async (req, res) => {
  try {
    const { text, typeData } = req.params;
    let whereData = { phone: text };
    if (typeData === 'email') {
      whereData = { email: text };
    } else if (typeData === 'tele') {
      whereData = { tele: text };
    }
    const clients = await Client.findAll({ where: whereData });
    res.json({ message: 'ok', clients });
  } catch (err) {
    res.json({ err });
  }
});

router.get('/pagList/:pagList', async (req, res) => {
  try {
    const { pagList } = req.params;
    const allClientsLength = await Client.count();
    const step = 3;
    const clients = await Client.findAll({
      offset: step * (pagList - 1),
      limit: step,
      order: sequelize.col('id'),
      include: [{ model: User }],
      //   order: [
      //   // ['id', 'DESC'] // ok max => min
      //   ],
    });
    res.json({ message: 'ok', clients, allClientsLength });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

router.get('/client/:clientId/rents', async (req, res) => {
  try {
    const { clientId } = req.params;
    const rents = await Rent.findAll({
      where: { client_id: clientId },
      order: sequelize.col('id'),
      include: [
        {
          model: Rcomment,
          order: sequelize.col('id'),
          include: [{ model: User }],
        },
        { model: User },
      ],
    });
    res.json({ message: 'ok', rents });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      name, about, email, tele, phone, user_id,
    } = req.body;
    let oldClient = null;
    if (email) {
      oldClient = await Client.findOne({ where: { email } });
      if (oldClient) {
        return res.json({ message: 'Клиент с такой почтой уже существует!' });
      }
    }
    if (tele) {
      oldClient = await Client.findOne({ where: { tele } });
      if (oldClient) {
        return res.json({
          message: 'Клиент с таким телеграмом уже существует!',
        });
      }
    }
    if (phone) {
      oldClient = await Client.findOne({ where: { phone } });
      if (oldClient) {
        return res.json({
          message: 'Клиент с таким телефоном уже существует!',
        });
      }
    }
    const client = await Client.create({
      name,
      about,
      email,
      tele,
      phone,
      user_id,
    });
    return res.json({ message: 'ok', clientId: client.id });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

module.exports = router;
