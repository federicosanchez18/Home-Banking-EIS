const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema({
    id: {
        type: Number,
        default: 1,
        unique: true
    },
    dni: {
        type: Number,
        validate: [function(v) {
            return /(^([0-9]{8,8})|^)$/.test(v);
        }, 'Ingrese un DNI válido'],
        required: [true, 'El DNI es requerido']
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    email: {
        type: String,
        validate: [function(v) {
            return /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/.test(v);
        }, 'Ingrese un email válido'],
        required: [true, 'El email es requerido']
    },
    amount: {
        type: Number,
        default: 0,
        min: 0
    },
    limit: {
        type: Number,
        default: 200
    },
    date: {
        type: Date,
        default: Date.now
    },
    cbu: {
        type: Number,
        default: function() {
            return Math.floor(Math.random()*90000) + 10000;
        },
        unique: true
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Services',
        index: true,
        require: true,
        default: []
    }]
});

UserSchema.pre('save', async function(next) {
    now = new Date();
    if(!this.date){
        this.date = now;
    }
    if(!this.isModified('password')){
        return next();
    }
    this.password = await Bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function(plainText) {
    const pass = await Bcrypt.compare(plainText, this.password);
    return pass;
}

UserSchema.plugin(AutoIncrement, {id: 'order_seq', inc_field: 'id'});
module.exports = mongoose.model('User', UserSchema);