Ext.define('Core.data.DataModel', {

    mixins: ['Core.MemStorage', 'Core.Queue']

    ,async fireEvent() {        
        let items;
        let event = arguments[0], 
            destination = 'all', 
            data, 
            priority
            k = 1;
        if(Ext.isArray(arguments[1]) || Ext.isString(arguments[1])) {
            destination = arguments[1];
            k++;
        }   

        data = arguments[k++] || {};
        priority = arguments[k++] || 0;

        if(destination == 'all') {
            items = await this.getAllAppInstances();            
        } else 
        if(Ext.isArray(destination)) {
            items = await this.getAgentsOnline(destination);
        } else {
            const log = await this.checkAgentOnline(destination);
            if(log) {
                items = ['client:' + destination];
            } 
        }       
        if(items) {
            items.forEach((item) => {
                this.createEventJob(event, item, data, priority)
            })
        }
    }
    
    ,createEventJob(event, destination, data, priority) {
        this.queueNewJob(destination, {
            class: Object.getPrototypeOf(this).$className,
            event,
            data
        });
    }

    ,async getAllAppInstances() {
        return await this.getMemKeys('inst:*');
    }

    ,async getAgentsOnline(agents) {
        let res = [], log;
        for(let i=0;i<agents.length;i++) {
            log = await this.checkAgentOnline(agents[i]);
            if(log)
                res.push('client:'+agents[i]);
        }
        return res;        
    }

    ,async checkAgentOnline(agent) {
        const res = await this.existsMemKey('client:' + agent);
        return !!res;
    }

})