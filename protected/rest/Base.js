const express = require('express');
const router = express.Router();

Ext.define('Api.Base', {
    constructor() {
         this.initRoutes(); 
         return router;      
    }

    ,initRoutes() {
        if(!this.routes) return;
        this.routes.forEach((rout) => {
            for(var i in rout) {
                if(['get', 'post', 'put', 'del'].indexOf(i) != -1) {
                    router[i](rout.path, async (req, res, done) => {
                        const data = this.getParamsFromRequest(req)
                        const result = await this[rout[i]](data, req, res, done);
                        this.send(res, result);
                    })
                }
            }
        })
        return;
    }

    ,getParamsFromRequest(req) {        
        return {
            query: req.query, 
            params: req.params
        }        
    }

    ,send(res, data) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Content-type', 'application/json');
        res.send(data);
    }
})