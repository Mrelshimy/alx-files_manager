const sha1 = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

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

  static async getMe(req, res) {
    try {
      const token = req.headers['x-token'];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const id = await redisClient.get(`auth_${token}`);

      if (id) {
        const usersCollection = dbClient.db.collection('users');
        const user = await usersCollection.findOne({ _id: ObjectId(id) });
        if (user) {
          res.status(200).json({ id: user._id, email: user.email });
        } else {
          res.status(401).json({ error: 'Unauthorized' });
        }
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
}

module.exports = UsersController;
