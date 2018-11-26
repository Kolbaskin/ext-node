Ext.define('Core.data.DataModel', {
    extend: 'Ext.data.Model'

    ,mixins: {
        observable : 'Ext.util.Observable'
    }

    ,constructor(config) {
        this.mixins.observable.constructor.call(this, config);
        this.callParent(arguments);
        const cls = Object.getPrototypeOf(this).$className;
        if(!Ext.classInstances) Ext.classInstances = {};        
        if(!Ext.classInstances[cls])
            Ext.classInstances[cls] = {};
        Ext.classInstances[cls][this.id] = this;
    }

    ,destroy() {
        const cls = Object.getPrototypeOf(this).$className;
        if(
            Ext.classInstances && 
            Ext.classInstances[cls] && 
            Ext.classInstances[cls][this.id]
        ) {
            delete Ext.classInstances[cls][this.id];
        }
        this.callParent(arguments);
    }

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