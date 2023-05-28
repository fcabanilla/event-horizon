// model/event.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: date => date > Date.now(),
            message: 'Event date must be in the future'
        } // validate date is in future
    },
    time: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    maxCapacity: {
        type: Number,
        required: true,
        min: 1 // enforce a minimum event capacity
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

EventSchema.pre('save', function (next) {
    if (this.isModified('attendees')) {
        if (this.attendees.length > this.maxCapacity) {
            throw new Error('Attendees exceed event capacity');
        }
    }
    next();
});

module.exports = model('Event', EventSchema);
