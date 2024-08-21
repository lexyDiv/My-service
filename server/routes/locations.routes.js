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
    if (!req.files) {
      return res.json({ message: 'file is not found' });
    }
    if (req.files['file0'].name) {
      return res.json({ message: 'is file0' });
    }
    return res.json({ message: req.files.baseFile });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

module.exports = router;
