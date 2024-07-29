module.exports.SuccessfulEventCreationEmail = (emailDetails, eventDetails) => {
    return {
        from : emailDetails.sender,
        to : emailDetails.receipient.email,
        subject : "Successful Event Creation",
        text : `Hello ${emailDetails.receipient.name} admin.
                Your event, ${eventDetails.coreEventDetails.title}, happening on
                ${eventDetails.coreEventDetails.event_timestamp} 
                at ${eventDetails.coreEventDetails.venue} has been published successfully.`
    }
}