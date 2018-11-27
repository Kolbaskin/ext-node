Ext.define('Base.wsClient', {
    extend: 'Core.WsClient'

    ,usersModel: Ext.create('Module.users.model.UserModel')

    ,async onStart() {
        this.usersModel.fireEvent('add', 'all', [{id: this.token, name: this.req.query.user}])
        await this.setMemKey(`client:${this.token}`, this.req.query.user || '');
        await this.queueProcess(`client:${this.token}`, async (data, done) => {
            const res = await this.prepareClientEvents(data);
            done(res);
        })
    }

    ,onClose() {
        this.usersModel.fireEvent('remove', 'all', [{id: this.token, name: this.req.query.user}])
        this.callParent(arguments);
    }
})