const { addEventReview } = require('../../SQL/EventQueries/AddEventReview');
const { findExistingEventReview } = require('../../SQL/EventQueries/FindExistingEventReview');
const { VerifyAttendance } = require('../../SQL/EventQueries/VerifyAttendance');

module.exports.AddEventReview = async(req, res) => {
    try{
        const {guestID, eventID, rating, content} = req.body;

        const existingUser = await VerifyAttendance(guestID, eventID);

        if(!existingUser) {
            console.log(existingUser);
            console.log("You did not attend this event", guestID);
            res.send({ message : "Attendee not found"});
            return;
        }
        
        const existingReview = await findExistingEventReview(guestID, eventID);
        if(!existingReview) {
            console.log(existingReview);
            console.log("You have already reviewed this event", guestID);
            res.send({ message : "You can only review an event once" });
            return;
        }

        console.log(content, rating);

        const addReview = await addEventReview(guestID, eventID, rating, content);

        console.log("Review addition successful", addReview);

        res.status(200)
            .send({
            message : "Review added successfully",
            review : addReview
        });
        
    }catch(error){
        console.error(error)
        res.status(500)
            .send({ message : 'Internal server error' });
        throw error;
    }
}