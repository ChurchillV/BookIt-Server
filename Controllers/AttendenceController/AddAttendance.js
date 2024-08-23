const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { addAttendance }   = require('../../SQL/AttendanceQueries/AddAttendance');
const { getExistingBooking } = require('../../SQL/EventQueries/GetExistingBooking');

module.exports.AddAttendance = async (req, res) =>{
    try {
        const userID  = req.params.guestID;
        const eventID  = req.params.eventID;

        const existingUser = await findByAttribute('guest', 'id', userID);

        if(!existingUser.length) {
            console.log("Error: No existing user found");
            res.send({ message : "No user found"});
            return;
        }

        const existingEvent = await findByAttribute('event', 'id', eventID);

        if(!existingEvent.length) {
            console.log("Error: No existing event found");
            res.send({ message : "No event found"});
            return;
        }

        const existingBooking = await getExistingBooking(userID, eventID);

        if(!existingBooking.length) {
            console.log("User has not booked this event");
            res.send({ message : "Booking not found" });
            return;
        }

        const successfullyAddedAttendance = await addAttendance(userID, eventID);

        console.log("Successfully added attendee ", successfullyAddedAttendance);

        res.status(200)
           .send({ 
                message : 'attendee added successfully',
                attendanceRecord : successfullyAddedAttendance
            });

    } catch (error) {
  
        console.error(error);
        res.status(500)
            .send({ message : 'Internal server error' });
    }
}