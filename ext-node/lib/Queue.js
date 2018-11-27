const kue = require('kue')
    ,queue = kue.createQueue(global && global.config? global.config.kue : null);

Ext.define('Core.Queue', {

    queueNewJob(name, data, priority, removeOnComplete, events) {
        return queue.create(name, data)
            .priority(priority || 0)
            .removeOnComplete( removeOnComplete || true )
            .events(events || false)
            .save();
    }

    ,queueProcess(name, cb) {
        queue.process(name, (job, done) => {
            cb(job.data, done);
        });
    }



});