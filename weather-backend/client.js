const { createClient } = require('redis');
require('dotenv').config();
const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on('error', err => console.log('Redis Client Error', err));


client.connect()
  .then(() => console.log('✅ Connected to Redis Cloud'))
  .catch(err => console.error('❌ Redis Connection Failed:', err));

module.exports = client

