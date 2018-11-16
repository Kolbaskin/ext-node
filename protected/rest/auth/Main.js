Ext.define('Api.auth.Main', {
    extend: 'Api.Base',
    
    routes: [
        { path: '/', get: 'login'},
        { path: '/restore', post: 'restoreLogin' },
        { path: '/registration', post: 'newuser'},
        { path: '/users', get: 'allUsers'}    
    ]

    ,async login(data) {
        return data
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