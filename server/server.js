const express = require('express');
const path = require('path');
const serverConfig = require('./config/serverConfig/serverConfig');

const app = express();

app.use(express.static(path.join(__dirname, '../front/build')));
// middleware
app.use(express.static('public'));

serverConfig(app);
const uploadRoutes = require('./routes/upload.routes');
const testRoutes = require('./routes/test.routes');

// app.post('/upload', (req, res) => {
//   if (!req.files) {
//     return res.status(500).send({ msg: "file is not found" })
//   }
   
//   const myFile = req.files.file;
 
  
//   myFile.mv(`${__dirname}/public/${myFile.name}`,
//     function (err) {
//       if (err) {
//         console.log(err)
//         return res.status(500).send({ msg: "Error occurred" });
//       }
//       res.json({name: myFile.name, path: `/${myFile.name}`});
//   });
// })

app.use('/users', testRoutes);
app.use('/upload', uploadRoutes);


app.get('*', (req, res) => {
    res.sendFile(path.resolve('../front/build/index.html'));
  });

app.listen(4500, () => {
  console.log('server is running at port 4500');});