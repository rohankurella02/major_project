const mongoose = require('mongoose');

//schema for bookings
const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    user: {
        type: Object,
        required: false
    },
    eventId: {
        type: String,
        required: false
    },
    event: {
        type: Object,
        required: false
    },
    bookingDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    payment: {
        type: Object,
        required: false
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;