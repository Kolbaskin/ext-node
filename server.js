
const express = require('express');
const staticSrv   = require('express-static');
const app = express();
global = {
     config: require('config')
}
require('./ext-node')({
    app,
    wsClient: 'Base.wsClient' 
}); 

app.use(staticSrv(__dirname + '/static'));

Ext.Loader.setPath('Api', 'protected/rest');
Ext.Loader.setPath('Base', 'protected/base');

app.use('/api/auth', Ext.create('Api.auth.Main'));

const server = app.listen(3000, function(){
    console.log('server is running at %s', server.address().port);
});