Ext.define('Module.messages.model.GridModel', {
    extend: 'Core.data.DataModel'

    ,fields: ['id', 'sender', 'subject', 'message']

/*    ,requires: ['Core.data.WsProxy']

    ,proxy: {
        type: 'wsproxy',
        url : '/data.json'
    }
*/


    /* scope:client */
    ,async test(data) {
        const result = await this.$test(1,2, data);
        console.log(result)
    }

    /* scope:server */
    ,async $test(a, b, data) {

        this.fireEvent('datachange', 'all', 'online')

        return {
            a,
            b,
            data,
            server: new Date()
        }
    }


})