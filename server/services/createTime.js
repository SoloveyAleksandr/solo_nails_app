const uuid = require('uuid')

function WorkTime(time) {
  this.id = uuid.v4().slice(0, 10);
  this.time = time;
  this.reserved = false;
  this.client = {};
}

module.exports = WorkTime;
