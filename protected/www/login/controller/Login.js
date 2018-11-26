const uuidv4 = require('uuid/v4');

Ext.define('Www.login.controller.Login', {
    extend: 'Www.Base'

    ,baseTpl: 'view/inner'
    ,loginFormTpl: 'login/view/login'

    ,routes: [
        { path: '/', get: 'loginForm', post: 'doLogin'}
    ]

    ,async loginForm () {
        return await this.tpl(this.loginFormTpl, {date: new Date()});
    }

    ,async doLogin (params, res) {
        if(params.body.name && /^[a-z0-9]{2,10}$/i.test(params.body.name)) {
            const token = uuidv4();
            this.redirect(`/index.html?token=${token}&name=${params.body.name}`, res);
            return;
        }
        return await this.tpl(this.loginFormTpl, {date: new Date()});
    }
})