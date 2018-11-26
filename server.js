
const express = require('express');
const staticSrv   = require('express-static');
const app = express();
const bodyParser = require('body-parser');

global = {
     config: require('config')
}
require('./ext-node')({
    app,
    wsClient: 'Base.wsClient' 
}); 

Ext.Loader.setPath('Api', 'protected/rest');
Ext.Loader.setPath('Base', 'protected/base');
Ext.Loader.setPath('Www', 'protected/www');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/api/auth', Ext.create('Api.auth.Main'));
app.use('/www/auth', Ext.create('Www.login.controller.Login'));

app.use(staticSrv(__dirname + '/static'));

const server = app.listen(3000, () => {
    console.log('server is running at %s', server.address().port);
});