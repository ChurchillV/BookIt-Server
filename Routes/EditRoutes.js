const router = require('express').Router();

const { AttendeeInterestUpdate } = require('../Controllers/ProfileControllers/AttendeeInterestUpdate');
const { AttendeeProfileUpdate } = require('../Controllers/ProfileControllers/AttendeeProfileUpdate');
const { OrganizerProfileUpdate } = require('../Controllers/ProfileControllers/OrganizerProfileUpdate');

router.put('/user/:userID/update', AttendeeProfileUpdate);
router.put('/org/:orgID/update', OrganizerProfileUpdate);
router.post('/user/:userID/interests', AttendeeInterestUpdate);

module.exports = router;