Ext = require("janusjs-extjs-node");
const websockets = require('./lib/websockets');

Ext.BaseDir = __dirname;

var Paths = {
    Core: Ext.BaseDir + '/lib',
    Module: 'protected/modules'
}

Ext.Loader.setConfig({
    enabled: true,
    paths: Paths,
    sharedPath: [{
        src: /protected\/modules\/([a-z0-9]{1,})\/model\//,            
        dst: 'static/app/admin/modules/$1/model/'
    }]
});

module.exports = function(cfg) {
    websockets(cfg);    
}