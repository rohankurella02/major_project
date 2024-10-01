const express = require('express');
const { default: mongoose } = require('mongoose');
const eventsApp = require('./api/eventsApi');
const cors = require("cors");

const app = express();
const PORT = 4000;

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    corsOptions = { origin: true };
    callback(null, corsOptions);
}

app.use(cors(corsOptionsDelegate));

//database connection using mongodb
const DBurl = "mongodb+srv://rohandb:babu4321@cluster0.mfaor.mongodb.net/event-app?retryWrites=true&w=majority";

mongoose.connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection to MongoDB Server Successful");
}
).catch(err => {
    console.log("Connection to MongoDB Server Failed", err);
}) 

app.use('/events', eventsApp);

app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});


//Handling Invalid URL
app.use((req, res) => {
    res.send({ message: "Invalid URL" });
})

//Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Something went wrong', error: err.message });
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT) 
    else
        console.log("Error occurred, server can't start", error);
}
); 