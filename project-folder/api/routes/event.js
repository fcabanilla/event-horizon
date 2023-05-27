const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
// const authMiddleware = require('../middlewares/authentication');

// Rutas para eventos
router.get('', eventController.getAllEvents);
router.post(''/*, authMiddleware.ensureAuth*/, eventController.createEvent);
router.get('/:eventId'/*, authMiddleware.ensureAuth*/, eventController.getEventById);
router.put('/:eventId'/*, authMiddleware.ensureAuth*/, eventController.updateEvent);
router.delete('/:eventId'/*, authMiddleware.ensureAuth*/, eventController.deleteEvent);

module.exports = router;
