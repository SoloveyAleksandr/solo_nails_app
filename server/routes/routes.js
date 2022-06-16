const DayController = require('../controllers/DayController');
const UsersController = require('../controllers/UsersController');
const validator = require('../services/validator');

const router = app => {
  app.get('/:month/:year', DayController.getNumberOfDays);
  app.get('/days:date', DayController.getDay);
  // app.post('/registration', [validator.checkEmail, validator.checkPassword], UsersController.registration)
};

module.exports = router;