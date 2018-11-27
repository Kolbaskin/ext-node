Ext.define('Module.users.model.UserModel', {
    extend: 'Core.data.DataModel'
    
    
    /* scope:server */
    ,async $read(params) {
        const keys = await this.getMemKeys('client:*');
        let data = [], name;
        for(let i = 0;i<keys.length;i++) {
            name = await this.getMemKey(keys[i]);
            if(name) {
                data.push({
                    id: keys[i].substr(7),
                    name
                })
            }
        }
        return {
            total: data.length,
            data
        }
    }

    
})