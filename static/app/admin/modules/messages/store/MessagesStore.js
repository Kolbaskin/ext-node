
Ext.define('Module.messages.store.MessagesStore', {
    extend: 'Core.data.Store',

    autoLoad: true,
    pageSize: null,

    fields: ['sender', 'subject', 'messages'],
    data: [{
        sender: 'Tester',
        subject: 'Test subject',
        message: 'Text'
    }]
});