const router = require('express').Router();

Ext.define('Www.Base', {
    extend: 'Core.www.Base'
    
    ,baseDir: 'protected/www'

    ,async buildPage(method, data, req, res) {
        let tplData = {
            title: method
        }
        tplData.content = await this[method](data, res);
        if(tplData.content !== null && tplData.content !== undefined) {
            return await this.tpl(this.baseTpl, tplData);
        }
    }

})