
Ext.define('Module.messages.store.MessagesStore', {
    extend: 'Ext.data.Store',

    fields: ['user', 'message'],

    constructor() {
        Ext.create('Module.messages.model.GridModel', {
            listeners: {
                newmessage: (mess) => {
                    this.add(mess)
                }
            }
        })
        this.callParent(arguments);
    }
    
});