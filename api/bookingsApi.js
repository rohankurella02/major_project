const {request} = require('./request');
const Booking = require('../models/bookings.model');
const exp = require('express');
const expressAsyncHandler = require('express-async-handler');
const bookingsApp = exp.Router();

bookingsApp.use(exp.json());

//Create a booking
bookingsApp.post('/create-booking', expressAsyncHandler(async (req, res) => {
    const booking = new Booking({
        userId: req.body.userId,
        user: req.body.user,
        eventId: req.body.eventId,
        event: req.body.event,
        bookingDate: req.body.bookingDate,
        status: req.body.status,
        payment: req.body.payment
    });
    const createdBooking = await booking.save();
    res.status(201).send({ message: "Booking Created Successfully", booking: createdBooking });
}));

//get all bookings
bookingsApp.get('/get-bookings', expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({});
    res.status(200).send(bookings);
}));

//get booking by id
bookingsApp.get('/get-booking/:id', expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        res.status(200).send(booking);
    }
    else {
        res.status(404).send({ message: "Booking Not Found" });
    }
}));

//get bookings by user id
bookingsApp.get('/get-bookings-by-user/:userId', expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({ userId: req.params.userId });
    if (bookings) {
        res.status(200).send(bookings);
    }
    else {
        res.status(404).send({ message: "Bookings Not Found" });
    }
}));

//get bookings by event id
bookingsApp.get('/get-bookings-by-event/:eventId', expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({ eventId: req.params.eventId });
    if (bookings) {
        res.status(200).send(bookings);
    }
    else {
        res.status(404).send({ message: "Bookings Not Found" });
    }
}));

//update a booking
bookingsApp.put('/update-booking/:id', expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        booking.userId = req.body.userId || booking.userId;
        booking.user = req.body.user || booking.user;
        booking.eventId = req.body.eventId || booking.eventId;
        booking.event = req.body.event || booking.event;
        booking.bookingDate = req.body.bookingDate || booking.bookingDate;
        booking.status = req.body.status || booking.status;
        booking.payment = req.body.payment || booking.payment;
        const updatedBooking = await booking.save();
        res.status(200).send({ message: "Booking Updated Successfully", booking: updatedBooking });
    }
    else {
        res.status(404).send({ message: "Booking Not Found" });
    }
}));

//delete a booking
bookingsApp.delete('/delete-booking/:id', expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        await booking.remove();
        res.status(200).send({ message: "Booking Deleted Successfully" });
    }
    else {
        res.status(404).send({ message: "Booking Not Found" });
    }
}));