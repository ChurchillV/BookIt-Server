module.exports.SuccessfulEventRegistration = (emailDetails, eventDetails) => {
    return {
        from : emailDetails.sender,
        to : emailDetails.receipient.email,
        subject : "Event Booked Successfully",
        text : `Hello ${emailDetails.receipient.firstname}. You have sucessfully been added to the waitlist for the ${eventDetails.title} event happening on ${eventDetails.event_timestamp} at  ${eventDetails.venue}. Contact the organizers via email at ${emailDetails.organizer.email} or call/text on ${emailDetails.organizer.contact}`,
        attachments : [
            emailDetails.ticket
        ]
    }
}