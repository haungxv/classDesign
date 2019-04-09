const Redis = require("ioredis");
const config = {
    port: 6379,
    host: '127.0.0.1',
    prefix: 'sam',
    ttl: 30 * 60,
    family: 4,
    db: 0
}
const newRedis = new Redis(config)
module.exports = newRedis;