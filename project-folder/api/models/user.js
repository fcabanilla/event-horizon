// model/user.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // simple validation for email
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // enforce a minimum length for password
    },
    registeredEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('remove', async function () {
    const Event = model('Event');
    await Event.updateMany(
        { attendees: this._id },
        { $pull: { attendees: this._id } }
    );
});

module.exports = model('User', UserSchema);
