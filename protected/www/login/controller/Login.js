Ext.define('Www.login.controller.Login', {
    
    // в базовом классе строится все "сквозные" элементы:
    // навигация, реклмные банеры и т.п. 
    extend: 'Www.Base'

    // базовый шаблон страницы
    // содержит блоки навигации, стили и т.п.
    ,baseTpl: 'view/inner'

    // шаблон для контентной области
    // непосредственно, форма авторизации
    ,loginFormTpl: 'login/view/login'

    // роуты
    ,routes: [
        { path: '/', get: 'loginForm', post: 'doLogin'}
    ]

    // возвращаем html контентного блока
    // остальные элементы достроятся в базовом классе
    ,async loginForm () {
        return await this.tpl(this.loginFormTpl, {date: new Date()});
    }

    ,async doLogin (params, res) {
        if(params.body.name && /^[a-z0-9]{2,10}$/i.test(params.body.name)) {
            this.redirect(`/index.html?name=${params.body.name}`, res);
            return;
        }
        return await this.tpl(this.loginFormTpl, {date: new Date()});
    }
})