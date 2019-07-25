const chalk = require('chalk');

exports.get = (req, res) => {
    console.log(chalk.blue('*** index.controller called ***'));
    res.sendFile(process.env.INDEX);
}