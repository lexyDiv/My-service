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

router.get('/ondata/:text', async (req, res) => {
  try {
    const { text } = req.params;
    const textLength = text.length;
    // const allClients = await Client.findAll();
    const onPhone = await Client.findAll({ where: { phone: text } });
    const onTele = await Client.findAll({ where: { tele: text } });
    const onEmail = await Client.findAll({ where: { email: text } });
    // if (allClients && allClients.length) {
    //   // onPhone = allClients.filter(
    //   //   (client) => client.phone && client.phone.slice(0, textLength) === text,
    //   // );
    //   // onTele = allClients.filter(
    //   //   (client) => client.tele && client.tele.slice(0, textLength) === text,
    //   // );
    //   // onEmail = allClients.filter(
    //   //   (client) => client.email && client.email.slice(0, textLength) === text,
    //   // );
    // }
    const clients = onPhone.concat(onTele.concat(onEmail));
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

module.exports = router;
