Ext.define('Module.messages.model.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',

    data: {
        online: 'offline'
    },
    
    constructor: function() {
        Ext.create('Module.messages.model.GridModel', {
            listeners: {
                datachange: (data) => {                 
                    this.set('online', data.state)
                }
            }
        });        
        this.callParent(arguments)
    }
})