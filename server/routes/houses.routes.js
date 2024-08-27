/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */

/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const fs = require('fs').promises;
const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const {
  where, Sequelize, Op, json,
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
  sequelize,
} = require('../db/models');

function createRandString(count) {
  return crypto.randomBytes(count).toString('hex');
}

router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      status,
      type,
      data,
      filesCount,
      location_id,
    } = req.body;

    const location = await Location.findOne({ where: { id: location_id } });

    if (!location) {
      return res.json({
        message: 'Не удалось создать. База удалена другим администратором!',
      });
    }

    const oldHouse = await House.findOne({ where: { name, location_id } });

    if (oldHouse) {
      return res.json({
        message: 'На этой базе дом с таким названием уже существует!',
      });
    }
    const houseData = await House.create({
      name,
      description,
      address,
      status,
      type,
      data,
      location_id,
    });

    const house = await House.findOne({
      where: { id: houseData.id },
      include: [
        { model: Hcomment2, include: [{ model: User }] },
        {
          model: Rent,

          include: [
            {
              model: Rcomment,
              order: sequelize.col('id'),
              include: [{ model: User }],
            },
            { model: User },
          ],
        },
      ],
    });

    let myFile = null;
    let filesError = false;
    const newFilesNames = [];
    let newBaseFileName = '';
    if (req.files) {
      if (req.files.baseFile) {
        myFile = req.files.baseFile;
        myFile.name = `/${createRandString(10)}${myFile.name}`;
        newBaseFileName = myFile.name;
        await myFile.mv(
          `${__dirname}/../public/${myFile.name}`,
          async (err) => {
            if (err) {
              filesError = err;
            }
          },
        );
      }

      if (req.files && req.files.file0) {
        const files = [];
        for (let i = 0; i < Number(filesCount); i++) {
          const file = req.files[`file${i}`];
          file.name = `/${createRandString(10)}${file.name}`;
          files.push(file);
        }
        await Promise.all(
          files.map(
            (value) => new Promise((resolve, reject) => {
              value.mv(`${__dirname}/../public/${value.name}`, (err) => {
                if (err) {
                  reject();
                } else {
                  newFilesNames.push(value.name);
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
            filesError = true;
          });
      }
    }

    if (!filesError) {
      house.images = JSON.stringify(newFilesNames);
      house.image = newBaseFileName;
      await house.save();
      return res.json({ message: 'ok', house });
    }
    return res.json({
      message: 'не удалось сохранить файлы!',
      filesError,
      house,
    });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

router.put('/', async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      filesCount,
      isDeleteBaseFile,
      deletedFiles: deletedFilesData,
      houseId,
      oldFiles,
      locationId,
    } = req.body;

    const oldHouse = await House.findOne({ where: { name, location_id: locationId } });

    if (oldHouse) {
      return res.json({
        message: 'На этой базе дом с таким названием уже существует!',
      });
    }

    const house = await House.findOne({
      where: { id: houseId },
      include: [
        { model: Hcomment2, include: [{ model: User }] },
        {
          model: Rent,
          include: [
            {
              model: Rcomment,
              order: sequelize.col('id'),
              include: [{ model: User }],
            },
            { model: User },
          ],
        },
      ],
    });

    if (house) {
      const deletedFiles = JSON.parse(deletedFilesData);

      const baseFileDeleteErr = null;
      if (isDeleteBaseFile) {
        deletedFiles.push(isDeleteBaseFile);
        house.image = '';
      }
      let deletesFilesErr = null;
      if (deletedFiles.length) {
        deletesFilesErr = await Promise.all(
          deletedFiles.map((el) => fs.unlink(`${__dirname}/../public/${el}`, (error) => {
            if (error) throw error;
          })),
        ).catch((err) => err);
      }

      let myFile = null;
      let filesError = false;
      const newFilesNames = [];
      let newBaseFileName = '';
      if (req.files) {
        if (req.files.baseFile) {
          myFile = req.files.baseFile;
          myFile.name = `/${createRandString(10)}${myFile.name}`;
          newBaseFileName = myFile.name;
          await myFile.mv(
            `${__dirname}/../public/${myFile.name}`,
            async (err) => {
              if (err) {
                filesError = err;
              }
            },
          );
        }
        if (req.files && req.files.file0) {
          const files = [];
          for (let i = 0; i < Number(filesCount); i++) {
            const file = req.files[`file${i}`];
            file.name = `/${createRandString(10)}${file.name}`;
            files.push(file);
          }
          await Promise.all(
            files.map(
              (value) => new Promise((resolve, reject) => {
                value.mv(`${__dirname}/../public/${value.name}`, (err) => {
                  if (err) {
                    reject();
                  } else {
                    newFilesNames.push(value.name);
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
              filesError = true;
            });
        }
      }
      if (!filesError) {
        house.image = newBaseFileName || house.image;
        house.images = JSON.stringify(
          JSON.parse(oldFiles).concat(newFilesNames),
        );
        house.name = name;
        house.description = description;
        house.address = address;
        await house.save();
        return res.json({
          message: 'ok',
          house,
        });
      }
      return res.json({
        message: 'не удалось сохранить файлы!',
        filesError,
        house,
      });
    }

    return res.json({
      message:
        'Не удалось сохранить изменения. Дом был удалён другим администратором!',
      code: 'del',
    });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

module.exports = router;
