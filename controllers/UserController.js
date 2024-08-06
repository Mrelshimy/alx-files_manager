const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class UserController {
  static newUser(req, res) {
    const { email } = req.body;
    const { password } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      res.status(400).json({ error: 'Missing password' });
    }
  }
}

module.exports = UsersController;
