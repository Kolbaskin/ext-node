const expressWs = require('express-ws');
const redis = require("redis");
const client = redis.createClient(global && global.config? global.config.redis : null);
const uuidv4 = require('uuid/v4');
const kue = require('kue')
    ,queue = kue.createQueue(global && global.config? global.config.kue : null);

const sessionKey = uuidv4();

client.set(`inst:${sessionKey}`, "1", 'EX', 10);

setInterval(() => {
    client.set(`inst:${sessionKey}`, "1", 'EX', 10);
}, 5000);

let connections = {}

let addWsConnection = (token, ws, req, wsClient) => {
  
    if(connections[token]) {
        ws.send('Error! This agent is already connected.')
        ws.close();
        return;
    }

    connections[token] = Ext.create(wsClient, {
        ws,
        req,
        token,
        connections
    });
}

queue.process(`inst:${sessionKey}`, (job, done) => {
    for(let i in connections) {
        connections[i].prepareClientEvents(job.data)
    }
    done();
});

module.exports = function(cfg) {
    expressWs(cfg.app);
    cfg.app.ws('/ext', function(ws, req) { 
        addWsConnection(req.query.token, ws, req, cfg.wsClient || 'Core.WsClient');        
    });
}

