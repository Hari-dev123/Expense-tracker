const {getDashboardData} = require('../controllers/dashboardController');
const {protect} = require('../middleware/authMiddleware');
const express = require('express');
const Router = express.Router();

Router.get('/', protect , getDashboardData);


module.exports = Router;
