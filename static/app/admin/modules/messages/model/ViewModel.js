Ext.define('Module.messages.model.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',

    data: {
        online: 'offline'
    },
    
    constructor: function() {        
        Ext.WS.on({
            ready: () => { console.log('ready'); this.set('online', 'online') },
            lostconnection: () => { this.set('online', 'offline') },
            closebyserver: () => { this.set('online', 'offline') },
            error: () => { this.set('online', 'offline') }
        });               
        this.callParent(arguments);
        if(Ext.WS.READY) 
            this.set('online', 'online')
    }
})