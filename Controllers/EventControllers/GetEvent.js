const { findByAttribute } = require("../../SQL/AuthQueries/FindExistingEntity");
const { getEventById } = require("../../SQL/EventQueries/GetEventById");

module.exports.GetEvent = async(req, res) => {
    try {
        const eventID = parseInt(req.params.id);
    
        const existingEvent = await findByAttribute('event', 'id', eventID);
    
        if(!existingEvent.length) {
            console.log("Event not found");
            res.send({ message : "Event not found"});
            return;
        }

        const eventDetails = await getEventById(eventID);

        if(!eventDetails) {
            console.log("Couldn't get event details. Please try again");
            res.send({ message : "Couldn't get event details. Please try again"});
            return;
        }

        console.log("Event details: ", eventDetails);

        res.status(200)
           .send({
                message : "Event obtained successfully",
                eventDetails : eventDetails
           });
        
    } catch (error) {
        console.error(error);
        res.status(500)
           .send({ message : "Internal server error"});
    }
}