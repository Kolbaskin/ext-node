Ext.define('Module.users.view.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'users-grid',
    
    store: Ext.create('Module.users.store.UsersStore'),

    title: 'Users',
    
    multiSelect: true,
    headerBorders: false,
    
    columns: [{
        text: 'User',
        flex: 1,
        dataIndex: 'name'
    }]
});