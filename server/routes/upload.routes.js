/* eslint-disable no-console */
const router = require('express').Router();

router.post('/', (req, res) => {
  if (!req.files) {
    res.status(500).send({ msg: 'file is not found' });
  }
  // console.log('1111111111111111111111', req.body.message); // ok
  const myFile = req.files.file;

  myFile.mv(
    `${__dirname}/../public/${myFile.name}`,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: 'Error occurred' });
      }
      res.json({ name: myFile.name, path: `/${myFile.name}` });
    },
  );
});

module.exports = router;
