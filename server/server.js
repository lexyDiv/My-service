/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const path = require('path');
const serverConfig = require('./config/serverConfig/serverConfig');

const app = express();

app.use(express.static(path.join(__dirname, '../front/build')));
// middleware
app.use(express.static('public'));

serverConfig(app);
const uploadRoutes = require('./routes/upload.routes');
const userRoutes = require('./routes/user.routes');
const rentRoutes = require('./routes/rent.routes');
const rcommentRoutes = require('./routes/rComment.routes');
const clientsRoutes = require('./routes/clients.routes');
const locationsRoutes = require('./routes/locations.routes');
const houseRoutes = require('./routes/houses.routes');
const quickRoutes = require('./routes/quick.routes');
const mainRoutes = require('./routes/main.routes');

app.use('/usersmclife', userRoutes);
app.use('/upload', uploadRoutes);
app.use('/rent', rentRoutes);
app.use('/rcomment', rcommentRoutes);
app.use('/clients', clientsRoutes);
app.use('/locations', locationsRoutes);
app.use('/houses', houseRoutes);
app.use('/quick', quickRoutes);
app.use('/main', mainRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../front/build/index.html'));
});

const PORT = process.env.PORT ?? 4500;

app.listen(PORT, () => {
  console.log(`server run on ${PORT} port`);
});
