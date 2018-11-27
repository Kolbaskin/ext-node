
const express = require('express');
const staticSrv   = require('extjs-express-static');
const app = express();
const bodyParser = require('body-parser');

// конфиг с настройками
global = {
     config: require('config')
}

// подключаем библиотеку с серверным Ext JS
//require('extjs-on-backend')({
require('./ext-node')({    
    // передаем ссылку на приложение express
    app, 
    // имя класса для сопряжения клиентской и серверной частей
    wsClient: 'Base.wsClient'  
}); 

// определяем пространства имен
Ext.Loader.setPath('Api', 'protected/rest');
Ext.Loader.setPath('Base', 'protected/base');
Ext.Loader.setPath('Www', 'protected/www');

// подключаем парсер http параметров запросов
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); 

// в качестве рутов используем Ext JS объекты
app.use('/api/auth', Ext.create('Api.auth.Main'));
app.use('/www/auth', Ext.create('Www.login.controller.Login'));

// отдаем статический контент
app.use(staticSrv(__dirname + '/static'));

// слушаем порт
const server = app.listen(3000, () => {
    console.log('server is running at %s', server.address().port);
});