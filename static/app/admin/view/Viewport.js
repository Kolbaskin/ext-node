Ext.define('Admin.view.Viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'mainviewport',
    requires: [],
    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: 'fit',

    listeners: {
        //render: 'onMainViewRender'
    },

    items: [
        Ext.create('Module.messages.view.Grid')
        //Ext.create('Module.chart.view.Chart')
    ]
});
