
Ext.define('Core.data.Store', {
    extend: 'Ext.data.Store'
    
    ,autoLoad: true
    ,pageSize: null

    ,total: 0

    ,constructor() {
        if(this.dataModel && Ext.isString(this.dataModel)) {
            this.dataModel = Ext.create(this.dataModel);
        }
        this.dataModel.on({
            update: (records) => { this.onDataUpdate(records) },
            add: (records) => { this.onDataAdd(records) },
            remove: (records) => { this.onDataRemove(records) }
        })
        this.callParent(arguments)
    }

    ,async load() {
        const data = await this.dataModel.$read();
        this.total = data.total;
        this.loadData(data.data);
    }

    ,getTotalCount() {
        return this.total;
    }

    ,onDataUpdate() {
        this.load();
    }

    ,onDataAdd() {
        this.load();
    }

    ,onDataRemove() {
        this.load();
    }

});