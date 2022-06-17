const DayController = require('../controllers/DayController');
const TimeController = require('../controllers/TimeController');
const UsersController = require('../controllers/UsersController');
const validator = require('../services/validator');

const router = app => {
  app.get('/:month/:year', DayController.getNumberOfDays);
  app.get('/days:date', DayController.getDay);
  app.post('/days:date/add', TimeController.addTime);
  app.delete('/days:date/delete', TimeController.deleteTime);
  app.get('/days:date/get', TimeController.getTime);
  // app.post('/registration', [validator.checkEmail, validator.checkPassword], UsersController.registration)
};

module.exports = router;