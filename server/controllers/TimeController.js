const fse = require('fs-extra');
const Client = require('../services/createClient');
const WorkTime = require('../services/createTime');

function TimeController() {

  this.addTime = async (req, res) => {
    try {
      const date = req.params.date.slice(1);
      let worksList = await fse.readJson('./data/workDays.json');

      if (worksList.hasOwnProperty(date)) {
        worksList[date].workList.push(new WorkTime(req.body.time));
        await fse.writeJson('./data/workDays.json', worksList, { spaces: 2 });
        res.send({ massage: 'SUCCESS!' }).status(200);
      } else {
        res.send({ massage: 'Date not found' });
      }
    } catch (e) {
      res.send({ massage: `Server Error: ${e}` });
    }
  }

  this.deleteTime = async (req, res) => {
    try {
      const date = req.params.date.slice(1);
      const timeID = req.body.id;
      let worksList = await fse.readJson('./data/workDays.json');
      worksList[date].workList = worksList[date].workList.filter(time => time.id !== timeID);
      await fse.writeJson('./data/workDays.json', worksList, { spaces: 2 });
      res.send({ massage: 'SUCCESS!' }).status(200);
    } catch (e) {
      res.send({ massage: `Server Error: ${e}` });
    }
  }

  this.getTime = async (req, res) => {
    try {
      const date = req.params.date.slice(1);
      const timeID = req.body.id;
      const worksList = await fse.readJson('./data/workDays.json');
      const time = worksList[date].workList.find(el => el.id === timeID);
      res.send(time).status(200);
    } catch (e) {
      res.send({ massage: `Server Error: ${e}` });
    }
  }

  this.reserveTime = async (req, res) => {
    try {
      const date = req.params.date.slice(1);
      const data = req.body;
      const worksList = await fse.readJson('./data/workDays.json');
      console.log(data.comment);
      worksList[date].workList.forEach(el => {
        if (el.id === data.timeID) {
          el.reserved = true;
          el.client = new Client({
            name: data.name,
            phone: data.phone,
            comment: data.comment,
          })
        }
        console.log(el)
      });
      console.log(worksList[date]);
      await fse.writeJson('./data/workDays.json', worksList, { spaces: 2 });
      res.send({ massage: 'SUCCESS!' }).status(200)
    } catch (e) {
      res.send({ massage: `Server Error: ${e}` });
    }
  }

}

module.exports = new TimeController();