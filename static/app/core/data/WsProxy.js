Ext.define('Core.data.WsProxy', {
       extend: 'Ext.data.proxy.Ajax',
       alias: 'proxy.wsproxy',
       
       read: function() {
           var res = this.callParent(arguments)
           console.log(res);
           return res;
       }

   });