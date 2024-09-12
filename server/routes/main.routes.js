/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const fs = require('fs').promises;
const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const {
  where, Sequelize, json, Op,
} = require('sequelize');
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
  Main,
  sequelize,
} = require('../db/models');
const isUserCan = require('../middleweres/isUserCan');

function createRandString(count) {
  return crypto.randomBytes(count).toString('hex');
}

router.put('/', async (req, res) => {
  try {
    const userLevelOk = await isUserCan(req, User, 2);
    if (!userLevelOk) {
      return res.json({ message: 'У вас нет прав доступа! Обратитесь к старшему администратору.' });
    }
    const { deleted } = req.body;
    const { files } = req;
    const deletedFiles = JSON.parse(deleted);
    const main = await Main.findOne();
    let deletesFilesErr = null;
    if (deletedFiles.length) {
      deletesFilesErr = await Promise.all(
        deletedFiles.map((el) => fs.unlink(`${__dirname}/../public${el}`, (error) => {
          if (error) throw error;
        })),
      ).catch((err) => { throw err; });
    }
    if (files) {
      const filesData = [];
      Object.entries(files).forEach(
        ([key, file]) => {
          file.name = `/${createRandString(10)}${file.name}`;
          filesData.push([key, file]);
        },
      );
      let filesError = null;
      const newFiles = [];
      await Promise.all(
        filesData.map(
          (value) => new Promise((resolve, reject) => {
            const [key, file] = value;
            file.mv(`${__dirname}/../public/video/${file.name}`, (err) => {
              if (err) {
                reject();
              } else {
                newFiles.push({ key, name: `/video${file.name}` });
                resolve();
              }
            });
          }),
        ),
      )
        .then(() => {
          filesError = false;
        })
        .catch((err) => {
          filesError = err.message;
        });

      if (main) {
        newFiles.forEach((el) => {
          const { key, name } = el;
          main[key] = name;
        });
      }

      await main.save();

      return res.json({ message: 'ok', main, filesError });
    }
    return res.json({ message: 'connect', data: { files, deleted } });
  } catch (err) {
    res.json({ message: 'bad', err: err.message });
  }
});

module.exports = router;
