const mongo = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';

const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.client = new mongo.MongoClient(url, { useUnifiedTopology: true });
    this.client.connect((err) => {
      if (err) console.log(err);
      this.db = this.client.db(database);
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.db.collection('users');
    const count = await users.countDocuments();
    return count;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const count = await files.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
