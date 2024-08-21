/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { where, Sequelize } = require('sequelize');
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

router.post('/', async (req, res) => {
  try {
    res.json({ message: 'connect' });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

module.exports = router;
