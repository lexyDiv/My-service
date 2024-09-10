const isUserCan = async (req, User, minLevel) => {
  try {
    if (req.session && req.session.user) {
      const oldUser = await User.findOne({ where: { id: req.session.user.id } });
      if (oldUser && oldUser.level >= minLevel) {
        return true;
      }
    }
    return false;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

module.exports = isUserCan;
