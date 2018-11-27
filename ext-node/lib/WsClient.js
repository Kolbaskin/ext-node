Ext.define('Core.WsClient', {

    apiVersion: '0.1.0'

    ,mixins: ['Core.MemStorage', 'Core.Queue']

    ,constructor(cfg) {         
       
        this.ws = cfg.ws;
        this.req = cfg.req;
        this.token = cfg.token;

        this.connections = cfg.connections;

        this.onStart();

        this.ws.on('message', (msg) => {
            this.onMessage(msg);
        })

        this.ws.on('close', () => {
            this.onClose();
        })
    }

    ,async onStart() {
        await this.setMemKey(`client:${this.token}`, "1");
        await this.queueProcess(`client:${this.token}`, async (data, done) => {
            const res = await this.prepareClientEvents(data);
            done(res);
        })
    }

    ,onMessage(msg) {
        let data;
       
        try {
            data =JSON.parse(msg);
        } catch(e) {
            this.error(e);
            return;
        }
        this.checkInputData(data);
    }

    ,checkInputData(data) {
        if(data && data.header) {
            if(!this.checkVersion(data.header)) 
                return this.error(`Unsupported version. Current version is ${this.apiVersion}`);
            if(data.header.class && data.header.method) {
                this.runClassMethod(data);
            } else {
                this.error('Invalid header.')
            }
        } else {
            this.error('Invalid input data.');
        }
    }

    ,async runClassMethod(data) {
        const cls = Ext.create(data.header.class, {
            wsClient: this
        })
        const method = (data.header.method[0] == '$'? '':'$') + data.header.method;
        if(cls) {
            if(!!cls[method]) {
                // request
                if(data.header.id) {
                    try {
                        let result;
                        if(data.data && data.data.arguments) {
                            result = await cls[method].apply(cls, data.data.arguments);
                        } else {
                            result = await cls[method](data.data);
                        }
                        this.sendResponse(data.header.id, 'OK', result);
                    } catch(e) {
                        this.sendResponse(data.header.id, 'Error', e);
                    }
                } else {
                    cls[method](data.data)
                }
            } else {
                // response
            }
        }
    }

    ,sendResponse(id, status, data) {
        this.send({
            header: {
                id,
                status
            },
            data
        })
    }

    ,onClose() {
        this.delMemKey(`client:${this.token}`);
        delete this.connections[this.token];
    }

    ,error(e) {
        this.send({
            header: {
                status: 'Error'
            },
            data: e
        })
    }

    ,send(data) {
        if(!!data.header) {
            data.header.version = this.apiVersion;
            data.header.tm = new Date().getTime();
        }        
        this.ws.send(JSON.stringify(data));
    }

    ,checkVersion(data) {
        return true;
    }

    ,async prepareClientEvents(data) {
        this.send({
            header: {
                class: data.class,
                event: data.event
            },
            data: data.data
        })
        return true;
    }

})