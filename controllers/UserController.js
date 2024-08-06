import { response } from 'express';
import sha1 from 'sha1';

const dbClient = require('../utils/db');

class UserController {
  static postNew(req, res) {
    const { email } = req.body;
    const { password } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      res.status(400).json({ error: 'Missing password' });
    }

    const users = dbClient.db.collection('users');
    const user = users.findOne({ email });
    if (user) {
      res.status(400).json({ err: 'Already exist' });
    } else {
      const userPassword = sha1(password);
      users.addOne({
        email,
        password: userPassword,
      }).then((result) => {
        response.status(201).json({ id: result.insertedId, email });
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}

module.exports = UserController;
