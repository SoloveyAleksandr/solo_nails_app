const { v4: uuid } = require('uuid');
const fse = require('fs-extra');
const bcrypt = require('bcryptjs');
const { param, validationResult } = require('express-validator');

function UsersController() {
  this.registration = async (req, res) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ massage: 'uncorrect request', validationErrors });
      }

      const usersList = await fse.readJson('./data/users.json');
      const { email, password } = req.body;
      const candidate = usersList.find(user => user.email === email);

      if (candidate) {
        return res.status(200).json({ massage: `User with email: ${email} already exist.` });
      }

      const hashPassword = await bcrypt.hash(password, 5);

      usersList.push(new User(email, hashPassword));

      await fse.writeJson('./data/users.json', usersList, { spaces: 2 });

      res.json({ massage: 'user created' });

    } catch (e) {
      console.log(e);
      res.send({ massage: "Server Error" });
    }
  }
}

function User(email, password) {
  this.id = uuid(5);
  this.username = `user${this.id.slice(0, 8)}`;
  this.email = email;
  this.password = password;
}

module.exports = new UsersController();