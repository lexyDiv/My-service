/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const sessionsConfig = require('../sessionConfig/sessionConfig');

const serverConfig = (app) => {
  app.use(cors());
  app.use(fileUpload());
  app.use(session(sessionsConfig));
  app.use(cookieParser());
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true }));
};

module.exports = serverConfig;
