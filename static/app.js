Ext.Loader.setConfig({
    enabled: true,    
    paths: {
        "Core": "app/core",
        "Admin": "app/admin",
        "Module": "app/admin/modules",
        "Ext.ux": "ext/ux" 
    }
});

this.token = Ext.data.identifier.Uuid.createRandom()();

Ext.WS = Ext.create('Core.WSocket', {
    token: this.token
});

Ext.application({
    name: 'Example',
    extend: 'Ext.app.Application',
    requires: ['Admin.*'],
    autoCreateViewport: 'Admin.view.Viewport'   
    
})