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
  sequelize,

} = require('../db/models');

async function getBasickState() {
  const locations = await Location.findAll({
    include: [
      { model: LComment, include: [{ model: User }] },
      {
        model: House,
        include: [
          { model: Hcomment2, include: [{ model: User }] },
          {
            model: Rent,

            include: [{
              model: Rcomment,
              // offset: 0, limit: 3, // ok
              order: sequelize.col('id'),
              include: [{ model: User }],
            }, { model: User }],
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
    if (!user) {
      // req.session.destroy();
      // res.clearCookie('user_sid');
      return res.json({ user: null });
    }
    const oldUser = await User.findOne({ where: { email: user.email } });
    if (oldUser) {
      const locations = await getBasickState();
      return res.json({ message: 'ok', user: oldUser, locations });
    }
    res.json({ user: null });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post('/log', async (req, res) => {
  try {
    const { email, corPassword } = req.body;
    const cPass = await Code.findOne({ where: { id: 1 } });
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json({ message: 'Неверный Email или пароль !' });
    }
    if (!cPass) {
      const hash = await bcrypt.hash(corPassword, 10);
      await Code.create({ value: hash });
    } else {
      const corPassOk = await bcrypt.compare(corPassword, cPass.value);
      if (!corPassOk) {
        return res.json({ message: 'Кривой корпаративный пароль !' });
      }
    }

    req.session.user = {
      email: user.email,
      name: user.name,
    };
    const locations = await getBasickState();
    res.json({
      message: 'ok',
      user,
      locations,
    });
  } catch (error) {
    console.log(error.message);
    res.json(error);
  }
});

router.post('/reg', async (req, res) => {
  try {
    // bossNE@mail.ru  helperNE@mail.ru  loh@mail.ru
    const myFile = req.files && req.files.file;

    const { name, corPassword, email } = req.body;

    const cPass = await Code.findOne({ where: { id: 1 } });
    // console.log(typeof corPassword);
    if (cPass) {
      const corPassOk = await bcrypt.compare(corPassword, cPass.value);
      if (!corPassOk) {
        res.json({ message: 'Кривой корпаративный пароль !' });
        return;
      }
    } else {
      // const hash = await bcrypt.hash(corPassword, 10);
      // await Code.create({ value: hash });
      res.json({
        message: 'Корпаративный пароль ещё не создан. Попробуйте позже !',
      });
      return;
    }
    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
      res.json({ message: 'Этот Email используеться другим пользователем !' });
    } else {
      res.json({ message: 'cont' });
    }
  } catch (error) {
    console.log(error.message);
    res.json(error);
  }
});

module.exports = router;
