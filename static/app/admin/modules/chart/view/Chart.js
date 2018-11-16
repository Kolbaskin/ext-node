Ext.define('Module.chart.view.Chart', {
    extend: 'Ext.chart.CartesianChart',

    store: Ext.create('Module.chart.view.ChartStore'),    

    axes: [{
        type: 'numeric',
        position: 'left',
        minimum: 30,
        titleMargin: 20,
        title: {
            text: 'Hashes'
        }
    }, {
        type: 'category',
        position: 'bottom'
    }],

    series: {
        type: 'bar',
        xField: 'date',
        yField: 'hashes'
    }
    

});