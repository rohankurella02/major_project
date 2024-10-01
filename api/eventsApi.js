const exp = require('express');
const {request} = require('express');
const expressAsyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Event = require('../models/events.model');
const eventsApp = exp.Router();

eventsApp.use(exp.json());

//Create an event
eventsApp.post('/create-event', expressAsyncHandler(async (req, res) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        category: req.body.category,
        medium: req.body.medium,
        meetLink: req.body.meetLink,
        meetId: req.body.meetId,
        meetPassword: req.body.meetPassword,
        image: req.body.image,
        location: req.body.location,
        eventOrganizer: req.body.eventOrganizer
    });
    const createdEvent = await event.save();
    res.status(201).send({ message: "Event Created Successfully", event: createdEvent });
}));

//Get all events
eventsApp.get('/get-events', expressAsyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.status(200).send(events);
}));

//Get event by id
eventsApp.get('/get-event/:id', expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        res.status(200).send(event);
    }
    else {
        res.status(404).send({ message: "Event Not Found" });
    }
}));

//Update an event
eventsApp.put('/update-event/:id', expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.startDate = req.body.startDate || event.startDate;
        event.endDate = req.body.endDate || event.endDate;
        event.category = req.body.category || event.category;
        event.medium = req.body.medium || event.medium;
        event.meetLink = req.body.meetLink || event.meetLink;
        event.meetId = req.body.meetId || event.meetId;
        event.meetPassword = req.body.meetPassword || event.meetPassword;
        event.image = req.body.image || event.image;
        event.location = req.body.location || event.location;
        event.eventOrganizer = req.body.eventOrganizer || event.eventOrganizer;

        const updatedEvent = await event.save();
        res.status(200).send({ message: "Event Updated Successfully", event: updatedEvent });
    }
    else {
        res.status(404).send({ message: "Event Not Found" });
    }
}));

//Delete an event
eventsApp.delete('/delete-event/:id', expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        await event.remove();
        res.status(200).send({ message: "Event Deleted Successfully" });
    }
    else {
        res.status(404).send({ message: "Event Not Found" });
    }
}));

//get events by category
eventsApp.get('/get-events-by-category/:category', expressAsyncHandler(async (req, res) => {
    const events = await Event.find({ category: req.params.category });
    if (events) {
        res.status(200).send(events);
    }
    else {
        res.status(404).send({ message: "Events Not Found" });
    }
}));

//get events by medium
eventsApp.get('/get-events-by-medium/:medium', expressAsyncHandler(async (req, res) => {
    const events = await Event.find({ medium: req.params.medium });
    if (events) {
        res.status(200).send(events);
    }
    else {
        res.status(404).send({ message: "Events Not Found" });
    }
}));

module.exports = eventsApp;