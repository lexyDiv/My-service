/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const fs = require('fs').promises;
const { Op } = require('sequelize');
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
  Viewing,
  Post,
  sequelize,
} = require('../db/models');

function createRandString(count) {
  return crypto.randomBytes(count).toString('hex');
}

async function getBasickState() {
  const locations = await Location.findAll({
    include: [
      { model: LComment, include: [{ model: User }] },
      { model: Post },
      {
        model: House,
        include: [
          { model: Post },
          { model: Hcomment2, include: [{ model: User }] },
          {
            model: Rent,

            include: [
              {
                model: Rcomment,
                // offset: 0, limit: 3, // ok
                order: sequelize.col('id'),
                include: [{ model: User }],
              },
              { model: User },
              // { model: Client },
            ],
          },
        ],
      },
    ],
  });
  return locations;
}

router.get('/', async (req, res) => {
  try {
    const { user } = req.session;
    // await User.destroy({ where: { email: 'papa-loh@mail.ru' } });
    if (!user) {
      // req.session.destroy();
      // res.clearCookie('user_sid');
      return res.json({ user: null });
    }
    const oldUser = await User.findOne({ where: { id: user.id } });
    if (oldUser) {
      const locations = await getBasickState();
      // const messages = await Message.findAll({
      //   include: [{ model: User }, { model: Viewing }],
      // });
      // const clients = await Client.findAll({
      //   include: [{ model: User }, { model: Application }],
      // });
      return res.json({
        message: 'ok',
        user: oldUser,
        locations,
        // clients,
        // messages,
      });
    }
    if (req.session) {
      await req.session.destroy();
      if (!req.session) {
        res.clearCookie('user_sid');
      }
    }
    res.json({ user: null });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post('/log', async (req, res) => {
  try {
    const { email, corPassword } = req.body;
    const cPass = await Code.findOne();
    const user = await User.findOne({ where: { email } });
    if (!user || !user.level) {
      return res.json({ message: 'Неверный Email или пароль !' });
    }
    if (!cPass) {
      const hash = await bcrypt.hash(corPassword, 10);
      await Code.create({ value: hash });
    } else {
      const corPassOk = await bcrypt.compare(corPassword, cPass.value);
      if (!corPassOk) {
        return res.json({ message: 'Кривой корпоративный пароль !' });
      }
    }

    req.session.user = {
      id: user.id,
    };
    const locations = await getBasickState();
    res.json({
      message: 'ok',
      user,
      locations,
    });
  } catch (error) {
    res.json({ message: 'bad', err: error.message });
  }
});

router.post('/reg', async (req, res) => {
  try {
    const {
      name, pass, email, tele, phone,
    } = req.body;

    const cPass = await Code.findOne();

    if (!cPass) {
      return res.json({
        message: 'Корпоративный пароль ещё не создан. Попробуйте позже !',
      });
    }
    const corPassOk = await bcrypt.compare(pass, cPass.value);
    if (!corPassOk) {
      return res.json({ message: 'Кривой корпаративный пароль !' });
    }
    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
      return res.json({
        message: 'Этот Email используеться другим администратором !',
      });
    }

    let filesError = false;
    let newBaseFileName = '';
    if (req.files && req.files.baseFile) {
      const myFile = req.files.baseFile;
      myFile.name = `/${createRandString(10)}${myFile.name}`;
      newBaseFileName = myFile.name;
      await myFile.mv(`${__dirname}/../public/${myFile.name}`, async (err) => {
        if (err) {
          filesError = err;
        }
      });
    }

    const user = await User.create({
      level: 1,
      password: 'user',
      admin: false,
      name,
      email,
      tele,
      phone,
      image: filesError ? '' : newBaseFileName,
    });

    req.session.user = {
      id: user.id,
    };
    const locations = await getBasickState();
    return res.json({
      message: 'ok',
      user,
      locations,
      filesError,
    });
  } catch (err) {
    res.json({ message: 'bad', err: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll({
      order: sequelize.col('id'),
      attributes: [
        'level',
        'id',
        'name',
        'admin',
        'image',
        'email',
        'phone',
        'tele',
        'net',
      ],
    });
    res.json({ message: 'ok', users });
  } catch (err) {
    res.json({ message: 'bad', err });
  }
});

router.put('/set', async (req, res) => {
  try {
    if (req.session && req.session.user && req.session.user.id) {
      const { id } = req.session.user;
      const user = await User.findOne({ where: { id } });
      if (!user || !user.admin) {
        await req.session.destroy();
        if (!req.session) {
          res.clearCookie('user_sid');
        }
        return res.json({ message: 'reload' });
      }
    } else {
      return res.json({ message: 'reload' });
    }
    const { level, id } = req.body;
    const user = await User.findOne({ where: { id } });
    user.level = Number(level);
    await user.save();
    return res.json({ message: 'ok' });
  } catch (err) {
    res.json({ message: 'bad', err: err.message });
  }
});

router.put('/update', async (req, res) => {
  try {
    let user = null;
    if (req.session && req.session.user && req.session.user.id) {
      const { id } = req.session.user;
      user = await User.findOne({ where: { id } });
      if (!user) {
        await req.session.destroy();
        if (!req.session) {
          res.clearCookie('user_sid');
        }
        return res.json({ message: 'reload' });
      }
      const { oldPass, newPass } = req.body;
      if (oldPass && newPass) {
        const code = await Code.findOne();
        const corPassOk = await bcrypt.compare(oldPass, code.value);
        if (corPassOk) {
          const hash = await bcrypt.hash(newPass, 10);
          code.value = hash;
          await code.save();
        } else {
          return res.json({
            message: 'Вы ввели не правильный корпоративный пароль!',
          });
        }
      }
    } else {
      return res.json({ message: 'reload' });
    }
    const {
      isDeleteBaseFile, name, phone, email, tele,
    } = req.body;

    const oldUser = await User.findOne({
      where: { email, [Op.not]: [{ id: user.id }] },
    });

    if (oldUser) {
      return res.json({
        message:
          'Этот адрес электронной почты пренадлежит другому администратору!',
      });
    }
    const deletedFiles = [];
    const baseFileDeleteErr = null;
    if (isDeleteBaseFile) {
      deletedFiles.push(isDeleteBaseFile);
      user.image = '';
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
    let newBaseFileName = '';
    if (req.files && req.files.baseFile) {
      myFile = req.files.baseFile;
      myFile.name = `/${createRandString(10)}${myFile.name}`;
      newBaseFileName = myFile.name;
      await myFile.mv(`${__dirname}/../public/${myFile.name}`, async (err) => {
        if (err) {
          filesError = err;
        }
      });
    }

    user.name = name;
    user.phone = phone;
    user.tele = tele;
    user.image = newBaseFileName || user.image;
    await user.save();

    return res.json({
      message: 'ok',
      user,
    });
  } catch (err) {
    res.json({ message: 'bad', err: err.message });
  }
});

router.put('/logout', async (req, res) => {
  try {
    const { id } = req.body;
    if (req.session && req.session.user) {
      await req.session.destroy();
      if (!req.session) {
        res.clearCookie('user_sid');
      }
    }
    return res.json({ message: 'ok' });
  } catch (err) {
    res.json({ message: 'bad', err: err.message });
  }
});

module.exports = router;
