var mongoose = require('mongoose');

var batchSchema = mongoose.Schema({
    cook_date: {type: String, required: true, default: '' },
    exp_date: {type: String, required: true, default: '' },
    notes: {type: String, required: true, default: ''},
    candyType: {type: String, required: true, default: ''},
    batch: {type: String, required: true, default: ''},
    sugarId: {type: String, required: true, default: ''},
    butterId: {type: String, required: true, default: ''},
    almondId: {type: String, required: true, default: ''},
    chocolateId: {type: String, required: true, default: ''},
    dustId: {type: String, required: true, default: ''},
    cook_order: {type: Number, required: true, default: '' },
    user: {type: String, required: true}
});

var Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
