function Day(date) {
  this.fullDate = date;
  this.day = date.slice(0, 2);
  this.month = date.slice(3, 5);
  this.workList = [];
}

module.exports = Day;