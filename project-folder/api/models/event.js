const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
    {
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
            required: true
        },
        time: {
            type: String,
            required: true
        },
        place: {
            type: String,
            required: true
        }
    },
    { timestamps: true } // Agrega automáticamente campos de fecha de creación y actualización
);

module.exports = mongoose.model('Event', EventSchema);
