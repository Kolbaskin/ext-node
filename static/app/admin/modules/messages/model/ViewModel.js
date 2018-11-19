Ext.define('Module.messages.model.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',

    data: {
        online: 'offline'
    },
    
    constructor: function() {
        Ext.create('Module.messages.model.GridModel', {
            listeners: {
                datachange: (mdl, data) => {
                    this.set('online', data.online)
                }
            }
        })
        this.callParent(arguments)
    }
})