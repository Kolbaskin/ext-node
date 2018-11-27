Ext.define('Module.messages.view.Form', {
    extend: 'Ext.form.Panel'

    ,controller: Ext.create('Module.messages.view.FormController')
    ,xtype: 'message-form'

    ,layout: 'hbox'
    ,items: [{
        xtype: 'textfield',
        emptyText: 'Enter message here',
        name: 'message',
        flex: 1
    },{
        xtype: 'button',
        action: 'submit',
        text: 'Submit',
        width: 100
    }]

})