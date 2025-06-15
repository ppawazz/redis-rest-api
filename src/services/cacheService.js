const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.connect().catch(console.error);

async function getCache(key) {
    return await client.get(key);
}

async function setCache(key, value) {
    await client.set(key, value, { EX: 60 }); 
}

module.exports = { getCache, setCache };
