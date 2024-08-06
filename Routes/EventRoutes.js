const router = require('express').Router();
const upload = require('../Config/multer-config');

const { GetEventAttendanceList } = require('../Controllers/AttendenceController/GetEventAttendanceList');
const { AddEventReview } = require('../Controllers/EventControllers/AddEventReview');
const { CancelBooking } = require('../Controllers/EventControllers/CancelBooking');
const { EventCreation } = require('../Controllers/EventControllers/EventCreation');
const { EventDetailsEdit } = require('../Controllers/EventControllers/EventDetailEditing');
const { EventRegistration } = require('../Controllers/EventControllers/EventRegistration');
const { GetAllEvents } = require('../Controllers/EventControllers/GetAllEventDetails');
const { GetAllEventsBookedByUser } = require('../Controllers/EventControllers/GetAllEventsBookedByUser');
const { GetEventBookingList } = require('../Controllers/EventControllers/GetEventBookingList');
const { GetEventById } = require('../Controllers/EventControllers/GetEventById');

router.post('/create', upload.single('image'), EventCreation);
router.post('/register', EventRegistration);
router.post('/review', AddEventReview);
router.put('/update', EventDetailsEdit);
router.get('/:id', GetEventById);
router.get('/', GetAllEvents);
router.get('/bookings/:userId', GetAllEventsBookedByUser);
router.get('/:eventId/bookings', GetEventBookingList);
router.get('/:eventId/attendance', GetEventAttendanceList);
router.delete('/bookings/delete', CancelBooking);

module.exports = router;