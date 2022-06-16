const { check } = require('express-validator');

exports.checkEmail = [check('email').isEmail()];

exports.checkPassword = [check('password').isLength({ min: 5, max: 15 })];