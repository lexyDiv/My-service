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
    // await Location.destroy({
    //   where: {
    //     id: {
    //       [Op.gt]: 2,
    //     },
    //   },
    // });

    // return res.json({ message: 'new location is destroy' });

    const {
      name, description, address, status, type, data, filesCount,
    } = req.body;

    const oldLocation = await Location.findOne({ where: { name } });

    if (oldLocation) {
      return res.json({ message: 'База с таким названием уже существиет!' });
    }
    const locationData = await Location.create({
      name,
      description,
      address,
      status,
      type,
      data,
    });

    const location = await Location.findOne({
      where: { id: locationData.id },
      include: [
        { model: LComment, include: [{ model: User }] },
        {
          model: House,
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
      location.images = JSON.stringify(newFilesNames);
      location.image = newBaseFileName;
      await location.save();
      return res.json({ message: 'ok', location });
    }
    return res.json({
      message: 'не удалось сохранить файлы!',
      filesError,
      location,
    });
  } catch (err) {
    res.json({ message: 'bad', msg: err.message });
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
      locationId,
      oldFiles,
    } = req.body;
    // req.files

    const location = await Location.findOne({
      where: { id: locationId },
      include: [
        { model: LComment, include: [{ model: User }] },
        {
          model: House,
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
        },
      ],
    });

    if (location) {
      const deletedFiles = JSON.parse(deletedFilesData);

      let baseFileDeleteErr = null;
      if (isDeleteBaseFile) {
        baseFileDeleteErr = await fs
          .unlink(`${__dirname}/../public/${isDeleteBaseFile}`, (error) => {
            if (error) {
              throw error;
            }
          })
          .catch((err) => err);
        // if (!baseFileDeleteErr) {
        location.image = '';
        // }
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
        location.image = newBaseFileName || location.image;
        location.images = JSON.stringify(
          JSON.parse(oldFiles).concat(newFilesNames),
        );
        location.name = name;
        location.description = description;
        location.address = address;
        await location.save();
        return res.json({
          message: 'ok',
          location,
        });
      }
      return res.json({
        message: 'не удалось сохранить файлы!',
        filesError,
        location,
      });
    }
    return res.json({
      message:
        'Не удалось сохранить изменения. Локация была удалена другим администратором!',
    });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

router.put('/del', async (req, res) => {
  try {
    const { deleteKey, locationId } = req.body;
    const cPass = await Code.findOne({ where: { id: 1 } });
    const corPassOk = await bcrypt.compare(deleteKey, cPass.value);
    if (!corPassOk) {
      return res.json({ message: 'Неверный пароль!' });
    }
    const location = await Location.findOne({
      where: { id: locationId },
      include: [
        {
          model: House,
        },
      ],
    });
    if (location) {
      const locationImages = JSON.parse(location.images);

      if (location.image) { locationImages.push(location.image); }

      if (location.Houses.length) {
        location.Houses.forEach((house) => {
          const { image, images } = house;
          if (image) {
            locationImages.push(image);
          }
          JSON.parse(images).forEach((img) => locationImages.push(img));
        });
      }

      let deletesFilesErr = null;
      if (locationImages.length) {
        deletesFilesErr = await Promise.all(
          locationImages.map((el) => fs.unlink(`${__dirname}/../public/${el}`, (error) => {
            if (error) throw error;
          })),
        ).catch((err) => err);
      }
      await location.destroy();
    }
    return res.json({ message: 'ok' });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

module.exports = router;
