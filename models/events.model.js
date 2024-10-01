const mongoose = require('mongoose');

//schema for events

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    medium: {
        type: String,
        required: false
    },
    meetLink: {
        type: String,
        required: false
    },
    meetId: {
        type: String,
        required: false
    },
    meetPassword: {
        type: String,
        required: false
    },
    image: {
        type: Buffer,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    eventOrganizer: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;