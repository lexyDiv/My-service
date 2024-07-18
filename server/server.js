const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static(path.join(__dirname, '../front/build')));
// middleware
app.use(express.static('public')); // для доступа к файлам в папке public
app.use(cors());
app.use(fileUpload());

app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));


// API для загрузки файлов
app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
   
  const myFile = req.files.file;
 
  // метод mv() помещает файл в папку public
  
  myFile.mv(`${__dirname}/public/${myFile.name}`,
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occurred" });
      }
      // возвращаем ответ с именем файла и его расположением
      // res.send({name: myFile.name, path: `/${myFile.name}`});
      res.json({name: myFile.name, path: `/${myFile.name}`});
  });
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve('../front/build/index.html'));
  });

app.listen(4500, () => {
  console.log('server is running at port 4500');});