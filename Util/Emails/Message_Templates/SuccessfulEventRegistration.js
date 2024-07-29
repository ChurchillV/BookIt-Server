module.exports.SuccessfulEventRegistration = (emailDetails, eventDetails) => {
    return {
        from : emailDetails.sender,
        to : emailDetails.receipient.email,
        subject : "Successful SignUp",
        text : `Hello ${emailDetails.receipient.firstname}. You have sucessfully
                been added to the waitlist for the ${eventDetails.coreEventDetails.title} event
                happening on ${eventDetails.coreEventDetails.event_timestamp} at 
                ${eventDetails.coreEventDetails.venue}. Contact the organizers via email at
                ${eventDetails.organizer.email} or call/text on ${eventDetails.organizer.contact}`
    }
}