Ext.define('Module.messages.view.GridController', {
    extend: 'Ext.app.ViewController'
    
    ,init(view) {        
        this.view = view;
        this.model = Ext.create('Module.messages.model.GridModel')
        this.setControls();        
    }
    
    ,setControls() {
        this.control({
            '[action=add]'    : {click: () => {this.newMessage() }}            
        })
    }

    ,newMessage() {
        this.model.test({a:1,b:2})
        //var x = Ext.data.identifier.Uuid.createRandom()
        //    console.log(x())
    }


    
});