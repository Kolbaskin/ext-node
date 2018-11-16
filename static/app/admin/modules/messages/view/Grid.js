Ext.define('Module.messages.view.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'messages-grid',
    
    controller: Ext.create('Module.messages.view.GridController'),
    store: Ext.create('Module.messages.store.MessagesStore'),

    title: 'Messages',
    
    //stateful: true,
    multiSelect: true,
    headerBorders: false,

    viewConfig: {
        enableTextSelection: true
    },

    tbar: [{
        action: 'add',
        text: 'New message'
    }],

    columns: [{
        text: 'Sender',
        flex: 1,
        dataIndex: 'sender'
    }, {
        text: 'Subject',
        flex: 1,
        dataIndex: 'subject'
    }, {
        text: 'Message',
        flex: 1,
        dataIndex: 'message'
    }]
});