Ext.define('Api.auth.Main', {
    extend: 'Api.Base',
    
    // определяем суброуты
    // и определяем соответствующие методы 
    routes: [
        { path: '/', get: 'login'},
        { path: '/restore', post: 'restoreLogin' },
        { path: '/registration', post: 'newuser'},
        { path: '/users', get: 'allUsers'}    
    ]

    // на вход подаются параметры запроса:
    // {query: <...>, params: <...>, body: <...>}
    ,async login(data) {
        return {data:[{
            id:1,
            subject: 111,
            sender:222,
            
        }]}
    }

    ,async restoreLogin() {
        return {OK:2}
    }

    ,async newuser() {
        return {OK:3}
    }

    ,async allUsers() {
        return {OK:4}
    }

})