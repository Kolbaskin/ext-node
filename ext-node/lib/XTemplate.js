const fs = require('fs-then-native');

Ext.define('Core.XTemplate', {

    async tplReadAndApply(filePath, data) {
        if(this.templatesCache && this.templatesCache[filePath]) {
            return this.templatesCache[filePath].apply(data)
        }
        let html = await fs.readFile(filePath, 'utf8');        
        html = await this.tplIncludes(filePath, html);        
        const res = this.tplGetCode(html);
        const tpl = Ext.create('Ext.XTemplate', res.html, res.code).compile();         
        if(!this.debug) {
            if(!this.templatesCache) this.templatesCache = {}
            this.templatesCache[filePath] = tpl;
        }
        return tpl.apply(data);
    }

    ,tplGetCode(html) {
        let code = {}
        html = html.replace(/>>>CODE>>>((.|\n)*)<<<CODE<<</i, function(p1, cod) {
            if(cod) {
                eval('cod = ' + cod)
                for(var i in cod) {
                    code[i] = cod[i]
                }
            }
            return "";
        })
        return {html, code}
    }

    ,tplIncludes (dir, html) {
        var d = dir.split('/')
        d.splice(-1,1)
        dir = d.join('/') + '/'
        var recur = function(str) {
            return s = str.replace(/\{\{include[\s]{1,}[\'\"]([\w\.\/]{1,})[\'\"]\}\}/gi, function(p1,path) {
                if(fs.existsSync(dir + path)) {
                    return recur(fs.readFileSync(dir + path, 'utf8'));
                }
                return "";
            })
        }
        return recur(html);
    }
})