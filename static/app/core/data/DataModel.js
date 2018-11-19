Ext.define('Core.data.DataModel', {
    extend: 'Ext.data.Model'

    ,async __runSharedFunction() {
        let data = [];
        for(let i=0;i<arguments[0].length;i++) {
            data.push(arguments[0][i]);
        }
        const result = await Ext.WS.callServerMethod(
            Object.getPrototypeOf(this).$className,
            arguments[0].callee.name,
            { arguments: data }
        );
        return result;
    }

    ,async callServer(method, data) {
        const result = await Ext.WS.callServerMethod(
            Object.getPrototypeOf(this).$className,
            method,
            data
        );
        return result;
    }

})