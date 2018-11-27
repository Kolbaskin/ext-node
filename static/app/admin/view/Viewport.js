Ext.define('Admin.view.Viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'mainviewport',
    requires: [
        'Module.users.view.Grid', 
        'Module.messages.view.Grid',
        'Module.messages.view.Form'
    ],
    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: 'border',

    listeners: {
        //render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'users-grid',
            id: 'users-grid',
            region: 'west',
            split: true,
            width: 300
        }, {
            xtype: 'panel',
            layout: 'border',
            region: 'center',
            border: false,
            bodyBorder: false,
            items: [{
                xtype: 'messages-grid',
                region: 'center'
            },{
                xtype: 'message-form',
                region: 'south',
                split: true,
                height: 25
            }]
        }
    ]
});
