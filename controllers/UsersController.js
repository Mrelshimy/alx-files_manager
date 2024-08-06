const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
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
    users.findOne({ email }, (user) => {
      if (user) {
        res.status(400).json({ error: 'Already exist' });
      } else {
        const userPassword = sha1(password);
        users.insertOne({
          email,
          password: userPassword,
        }).then((result) => {
          res.status(201).json({ id: result.insertedId, email });
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }
}

module.exports = UsersController;
