Ext.define('Module.messages.model.GridModel', {
    extend: 'Core.data.DataModel'

      /* scope:client */
    ,async test(data) {
        const result = await this.$test(1,2, data);
        console.log(result)
    }

    /* scope:server */
    ,async $test(a, b, data) {
        await  this.fireEvent('datachange', {state:'online'});
        return {
            a,
            b,
            data,
            server: new Date()
        }
    }

    /* scope:server */
    ,async $newmessage(data) {
        const msg = {
            user: data.user,
            message: data.message
        }
        if(data.to && Ext.isArray(data.to) && data.to.length) {
            data.to.forEach((id) => {
                this.fireEvent('newmessage', id, msg);
            })
        } else {
            this.fireEvent('newmessage', 'all', msg);
        }
        return true;        
    }

})