Ext.define('Module.messages.view.FormController', {
    extend: 'Ext.app.ViewController'
    
    ,init(view) {        
        this.view = view;
        this.model = Ext.create('Module.messages.model.GridModel')
        this.setControls();        
    }
    
    ,setControls() {
        this.msgEl = this.view.down('[name=message]');
        this.usersGrid = Ext.getCmp('users-grid')
        this.control({
            '[action=submit]'    : {click: () => {this.newMessage() }}            
        })
    }

    ,newMessage() {
        let users = [];
        const sel = this.usersGrid.getSelection();
        if(sel && sel.length) {
            sel.forEach((s) => {
                users.push(s.data.id)
            })
        }
        if(users.length && users.indexOf(Ext.WS.token) == -1)
            users.push(Ext.WS.token);

        this.model.$newmessage({
            to: users,
            user: Ext.WS.user,
            message: this.msgEl.getValue()
        })
        this.msgEl.setValue('')
        
    }    
});