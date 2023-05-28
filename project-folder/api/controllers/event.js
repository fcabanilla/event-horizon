const Event = require('../models/event');

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving events' });
    }
};

const createEvent = async (req, res) => {
    try {
        const { name, description, date, time, place } = req.body;

        // Validar el formato del horario utilizando expresiones regulares
        const timePattern = /(\d{2}:\d{2}:\d{2})/;
        const extractedTime = time.match(timePattern);
        if (!extractedTime) {
            return res.status(400).json({ error: 'Invalid time format. Please provide time in HH:MM:SS format.' });
        }

        const event = new Event({ name, description, date, time: extractedTime[1], place });
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error creating event' });
    }
};


const getEventById = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving event' });
    }
};

const updateEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error updating event' });
    }
};

const deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndRemove(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(204).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting event' });
    }
};

module.exports = {
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
};
