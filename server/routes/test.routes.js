const router = require('express').Router();
const {
  User, Message, LComment, Location,
} = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll({ include: [{ model: LComment }] });
    res.json(locations);
    // const user = await User.findOne({
    //   where: { id: 1 },
    //   include: [
    //     { model: LComment},
    //   ],
    // });
    // res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
