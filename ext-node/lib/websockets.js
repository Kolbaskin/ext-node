const expressWs = require('express-ws');

let connections = {}

let addWsConnection = (token, ws) => {
  
    if(connections[token]) {
        ws.send('Error! This agent is already connected.')
        ws.close();
        return;
    }
    connections[token] = Ext.create('Core.WsClient', {
        ws,
        token,
        connections
    });
}

module.exports = function(app) {
    expressWs(app);
    app.ws('/ext', function(ws, req) {  
        addWsConnection(req.query.token, ws);        
    });
}

