const router = require('express').Router();

Ext.define('Core.www.Base', {

    mixins: ['Core.XTemplate']

    ,constructor() {
        this.initRoutes(); 
        return router;      
    }

    ,initRoutes() {
        if(!this.routes) return;
        this.routes.forEach((rout) => {
            Object.keys(rout).forEach((i) => {
                if(['get', 'post', 'put', 'del'].indexOf(i) != -1) {
                    router[i](rout.path, async (req, res, done) => {
                        const data = this.getParamsFromRequest(req)
                        const result = await this.buildPage(rout[i], data, req, res, done);
                        if(result)
                            this.send(res, result);
                    })
                }
            })
        })
        return;
    }

    ,setHeaders(res) {
        res.header('Connection', 'keep-alive');
        res.header('Content-Type', 'text/html; charset=UTF-8');        
    }

    ,send(res, data) {
        this.setHeaders(res);
        res.header('Content-Length', data.length);
        res.send(data);
    }

    ,getParamsFromRequest(req) {  
        return {
            query: req.query, 
            params: req.params,
            body: req.body
        }        
    }

    ,async buildPage(method, data, req, res) {
        
    }

    ,async tpl(tplName, data) {
        return await this.tplReadAndApply(this.baseDir + '/' + tplName + '.tpl', data);
    }

    ,redirect(uri, res) {
        res.redirect(301, uri)
    }


})