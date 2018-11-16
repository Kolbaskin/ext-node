
const express = require('express');
const serve   = require('express-static');
const app = express();
require('./ext-node')(app); 

Ext.Loader.setPath('Api', 'protected/rest')

app.use('/api/auth', Ext.create('Api.auth.Main'));

app.use(serve(__dirname + '/static'));

const server = app.listen(3000, function(){
  console.log('server is running at %s', server.address().port);
});