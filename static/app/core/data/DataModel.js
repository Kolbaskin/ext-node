Ext.define('Core.data.DataModel', {
    extend: 'Ext.app.ViewModel'

    ,async callServer(method, data) {
        const result = await Ext.WS.callServerMethod(
            Object.getPrototypeOf(this).$className,
            method,
            data
        );
        return result;
    }

})