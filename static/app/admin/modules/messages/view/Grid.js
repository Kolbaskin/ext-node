Ext.define('Module.messages.view.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'messages-grid',
    
    controller: Ext.create('Module.messages.view.GridController'),
    store: Ext.create('Module.messages.store.MessagesStore'),
    viewModel: Ext.create('Module.messages.model.ViewModel'),

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
    },'->',{
        xtype: 'label',
        bind: {
            text: '{online}'
        }
    }],

    columns: [{
        text: 'Sender',
        width: 150,
        dataIndex: 'user'
    },{
        text: 'Message',
        flex: 1,
        dataIndex: 'message'
    }]
});