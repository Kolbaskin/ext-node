Ext.define('Module.messages.model.GridModel', {
    extend: 'Core.data.DataModel'

    /* scope:client */
    ,async test(data) {
        const result = await this.callServer('test', data);
        console.log(result)
    }

    /* scope:server */
    ,async $test(data) {
        return {
            client: data,
            server: new Date()
        }
    }
})