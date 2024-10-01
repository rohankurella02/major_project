import axios from "axios";

export const getEvents = () => {
    return axios.get("http://localhost:4000/events/get-events");
}

export const getEventById = (id) => {
    return axios.get(`http://localhost:4000/events/get-event/${id}`);
}

export const createEvent = (event) => {
    return axios.post("http://localhost:4000/events/create-event", event);
}