/**
 * @class Core.WSockets
 * @extend Ext.ux.WebSocket
 * @author Max tushev
 * Websocket superclass
 */
Ext.define('Core.WSocket', {

    mixins: {
        observable: 'Ext.util.Observable'
    } 
    
    ,constructor(cfg) {
        this.callbacks = {}
        this.READY = false;
        this.token = cfg.token;        
        this.connect();
    }

    ,reconnect() {
        setTimeout(() => {
            this.connect();
        }, 100)
    }

    ,connect() {
        this.ws = new WebSocket(this.getUrl(this.token));

        this.ws.onopen = () => {
            this.READY = true;
        };
        
        this.ws.onclose = (event) => {
            if (event.wasClean) {
                //this.fireEvent ('closeByServer', this);
            } else {
                //this.fireEvent ('lostConnection', this);
                this.reconnect()
            }
        };
          
        this.ws.onmessage = (event) => {
            const data = this.parseData(event.data);
            if(data) {
                //this.fireEvent ('ondata', data);
                this.doAction(data);
            }
        };
          
        this.ws.onerror = (error) => {
            //this.fireEvent('error', error.message);
            this.reconnect();
        };
    }

    ,parseData(msg) {
        try {
            const data = JSON.parse(msg);
            if(data && data.header) 
                return data;
        } catch(e) {
            this.error(e)
        }
        return;
    }

    ,doAction(data) {
        if(data && data.header) {
            if(data.header.status) {
                // response
                this.doResponse(data);
            } else {
                // request
                this.doRequest(data);
            }
        }
    }

    ,doRequest(data) {
        const cls = Ext.create(data.header.class);
        if(cls && !!cls[method]) {
            cls[method](data.data, (e,d) => {
                if(e)
                    this.sendError(e, data.header.id)
                else
                    this.sendResponse(d, data.header.id)
            })
        }
    }

    ,sendError(data, id) {
        this.send({
            header: {
                id,
                status: 'Error'
            },
            data
        })
    }

    ,sendResponse(data, id) {
        this.send({
            header: {
                id,
                status: 'OK'
            },
            data
        })
    }

    ,send(data) {
        this.ws.send(JSON.stringify(data))
    }

    ,getUrl(token) {
        const uriArr = location.href.split('/')
            ,host = uriArr[2]
            ,protocole = uriArr[0] == 'https:'? 'wss':'ws';  
        return protocole + "://" + host + "/ext?token=" + encodeURIComponent(token);
    }

    ,doResponse(data) {
        if(data.header.id && this.callbacks[data.header.id]) {
            this.callbacks[data.header.id](data.data);
            delete this.callbacks[data.header.id];
        }
    }

    ,callServerMethod(cls, method, data) {
        return new Promise((resolve, reject) => {
            const token = Ext.data.identifier.Uuid.createRandom()();
            this.callbacks[token] = resolve;
            this.send({
                header: {
                    class: cls,
                    method,
                    id: token
                },
                data
            })           
        })
    }    
})
