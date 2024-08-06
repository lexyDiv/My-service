/* eslint-disable no-console */
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

app.use('/users', userRoutes);
app.use('/upload', uploadRoutes);
app.use('/rent', rentRoutes);
app.use('/rcomment', rcommentRoutes);
app.use('/clients', clientsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../front/build/index.html'));
});

app.listen(4500, () => {
  console.log('server is running at port 4500');
});
