const redis = require("redis");
const client = redis.createClient(global && global.config? global.config.redis : null);
const uuidv4 = require('uuid/v4');

const sessionKey = uuidv4();

client.set(`inst:${sessionKey}`, "1", 'EX', 10);

setInterval(() => {
    client.set(`inst:${sessionKey}`, "1", 'EX', 10);
}, 5000);