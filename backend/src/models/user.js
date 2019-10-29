const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const UserSchema = new Schema({
    id: {
        type: Number,
        default: 1,
        unique: true
    },
    dni: {
        type: Number,
        validate: function(v) {
            return /(^([0-9]{8,8})|^)$/.test(v);
        },
        required: [true, 'The DNI is required']
    },
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(AutoIncrement, {id: 'order_seq', inc_field: 'id'});
module.exports = mongoose.model('User', UserSchema);