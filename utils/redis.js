#!/usr/bin/node

const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(err);
    });
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const val = await getAsync(key);
    return val;
  }

  async set(key, value, dur) {
    const setAsync = promisify(this.client.setex).bind(this.client);
    const val = await setAsync(key, dur, value);
    return val;
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    const val = await delAsync(key);
    return val;
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
