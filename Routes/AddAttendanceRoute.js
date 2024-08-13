const router = require ('express').Router();

const { AddAttendance } = require('../Controllers/AttendenceController/AddAttendance')


router.post('/add', AddAttendance);

module.exports = router;