const router = require ('express').Router();

const { AddAttendance } = require('../Controllers/AttendenceController/AddAttendance')


router.post('/add/:guestID/:eventID', AddAttendance);

module.exports = router;