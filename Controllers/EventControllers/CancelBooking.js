const { findByAttribute } = require("../../SQL/AuthQueries/FindExistingEntity");
const { cancelBooking } = require("../../SQL/EventQueries/CancelBooking");
const { getExistingBooking } = require("../../SQL/EventQueries/GetExistingBooking");


module.exports.CancelBooking = async(req, res) => {
    try {
        const { guestID, eventID } = req.body.bookingDetails;

        console.log(req.body.bookingDetails);

        const existingGuest = await findByAttribute('guest', 'id', guestID);

        if(!existingGuest.length) {
            console.log("Guest not found");
            res.send({ message : "Guest not found" });
            return;
        }

        const existingEvent = await findByAttribute('event', 'id', eventID);

        if(!existingEvent.length) {
            console.log("Event not found");
            res.send({ message : "Event not found" });
            return;
        }

        const existingBooking = await getExistingBooking(guestID, eventID);

        if(!existingBooking.length) {
            console.log("User has not booked this event");
            res.send({ message : "Booking not found" });
        }

        const successfulBookingDeletion = await cancelBooking(guestID, eventID);

        const response = successfulBookingDeletion ? {
            message : "Event booking cancelled successfully",
            success : true
        } 
        :
        { message : "Error cancelling event booking" };

        res.send({ response });

    } catch (error) {
        console.error("Error handling request: ", error);

        res.status(500)
           .send({
                message : "Internal server error",
                error : error
           });

        throw error;
    }
}