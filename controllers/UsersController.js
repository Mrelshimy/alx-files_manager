import sha1 from 'sha1';
import dbClient from '../utils/db';
const RedisClient = require('../utils/redis');
const { ObjectId } = require('mongodb');

class UsersController {
  static postNew(request, response) {
    const { email } = request.body;
    const { password } = request.body;

    if (!email) {
      response.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      response.status(400).json({ error: 'Missing password' });
      return;
    }

    const users = dbClient.db.collection('users');
    users.findOne({ email }, (err, user) => {
      if (user) {
        response.status(400).json({ error: 'Already exist' });
      } else {
        const userPassword = sha1(password);
        users.insertOne(
          {
            email,
            password: userPassword,
          },
        ).then((result) => {
          response.status(201).json({ id: result.insertedId, email });

        }).catch((error) => console.log(error));
      }
    });
  }
}

module.exports = UsersController;
