Ext.define('Module.messages.view.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'messages-grid',
    
    controller: Ext.create('Module.messages.view.GridController'),
    store: Ext.create('Module.messages.store.MessagesStore'),

    title: 'Messages',
    
    //stateful: true,
    multiSelect: true,
    headerBorders: false,

    viewModel: Ext.create('Module.messages.model.ViewModel'),

    viewConfig: {
        enableTextSelection: true
    },

    tbar: [{
        action: 'add',
        text: 'New message'
    },'->',{
        xtype: 'label',
        bind: {
            text: '{online}'
        }
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