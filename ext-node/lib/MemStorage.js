const redis = require("redis");
const redisClient = redis.createClient(global && global.config? global.config.redis : null);

Ext.define('Core.MemStorage', {    
    setMemKey(key, val) {
        return  new Promise((resolve, reject) => {
            redisClient.set(key, val, (e,d) => {
                if(e)
                    reject(e)
                else
                    resolve(d)
            });
        })
    }

    ,getMemKey(key) {
        return  new Promise((resolve, reject) => {
            redisClient.get(key, (e,d) => {
                if(e)
                    reject(e)
                else
                    resolve(d)
            });
        })
    }

    ,delMemKey(key) {
        return  new Promise((resolve, reject) => {
            redisClient.del(key, (e,d) => {
                if(e)
                    reject(e)
                else
                    resolve(d)
            });
        })
    }

    ,getMemKeys(query) {
        return  new Promise((resolve, reject) => {
            redisClient.keys(query, (e,d) => {
                if(e)
                    reject(e)
                else
                    resolve(d)
            });
        })
    }

    ,existsMemKey(key) {
        return  new Promise((resolve, reject) => {
            redisClient.exists(key, (e,d) => {
                if(e)
                    reject(e)
                else
                    resolve(!!d)
            });
        })
    }

})