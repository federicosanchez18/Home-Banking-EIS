const mongoose = require('mongoose');
const { Schema } = mongoose;

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
        required: [true, 'El nombre es requerido']
    },
    amount: {
        type: Number,
        required: [true, 'El monto es requerido'],
        min: 0
    },
    description: {
        type: String,
        required: [true, 'La descripción es requerida']
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