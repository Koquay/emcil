const express = require('express');
const router = express.Router();
const IndexController = require('./index.controller');
const chalk = require('chalk');

console.log(chalk.blue('*** Index Routes called ***'));

router.get('/', IndexController.get);

module.exports = router;