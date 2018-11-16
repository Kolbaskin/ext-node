Ext.define('Module.chart.view.ChartStore', {
    extend: 'Ext.data.Store'

    ,fields: ['date', 'hashes']
    ,data: [{
        date: '01.01',
        hashes: 256
    },{
        date: '02.01',
        hashes: 300
    },{
        date: '03.01',
        hashes: 350
    }]
    
});