Ext.define('Module.users.store.UsersStore', {
    extend: 'Core.data.Store'
    
    ,fields: ['name', 'id']
    ,dataModel: 'Module.users.model.UserModel'  

    ,onDataAdd(records) {
        this.add(records[0]);
    }

    ,onDataRemove(records) {
        this.remove(this.getById (records[0].id))
    }

});