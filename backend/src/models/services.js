const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const { Schema } = mongoose;
const Currency = mongoose.Types.Currency;  

const ServicesSchema = new Schema({
    paymentCode: {
        type: Number,
        default: function() {
            return Math.floor(Math.random()* (Math.pow(10,10)));
        },
        unique: true
    },
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    amount: {
        type: Currency,
        required: [true, 'The amount is required'],
        min: 0
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    payServices: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

ServicesSchema.pre('save', async function(next) {
    now = new Date();
    if(!this.date){
        this.date = now;
    };
    next();
});

module.exports = mongoose.model('Services', ServicesSchema);