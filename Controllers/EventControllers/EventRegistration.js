const { registerForEvent } = require('../../SQL/EventQueries/RegisterForEvent');
const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { getExistingBooking } = require('../../SQL/EventQueries/GetExistingBooking');
const sendEmail = require('../../Util/Emails/sendEmail');
const { SuccessfulEventRegistration } = require('../../Util/Emails/Message_Templates/SuccessfulEventRegistration');

module.exports.EventRegistration = async(req, res) => {
    try {
        const { userID, eventID } = req.body;
        
        const existingUser = await findByAttribute('guest', 'id', userID);

        if(!existingUser.length) {
            console.log("Error: No existing user found");
            res.send({ message : "No user found"});
            return;
        }


        const existingEvent = await findByAttribute('event', 'id', eventID);

        if(!existingEvent.length) {
            console.log("Error: No event found");
            res.send({ message : "No event found"});
            return;
        }


        const existingBooking = await getExistingBooking(userID, eventID);

        if(existingBooking.length) {
            console.log("User has already booked this event", existingBooking);
            res.send({ message : "Seems you've already booked this event" });
            return;
        }

        
        const successfulEventRegistration = await registerForEvent(userID, eventID);
        
        console.log("Successful event registration: ", successfulEventRegistration);
        
        const organizer = await findByAttribute('organizer', 'id', existingEvent[0].org_id);
        let emailDetails = {
            sender : 'hello@bookit.org',
            receipient : {
                firstname : existingUser[0].first_name,
                email : existingUser[0].email
            },
            organizer : organizer[0]
        }
        
        
        sendEmail(SuccessfulEventRegistration(emailDetails, existingEvent[0]))

        res.status(200)
           .send({ 
                message : 'Event registration successful',
                registrationRecord : successfulEventRegistration
            });
        
    } catch(error) {
        console.error(error)
        res.status(500)
            .send({ message : 'Internal server error' });
        throw error;
    }


}