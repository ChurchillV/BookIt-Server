const { createEvent } = require('../../SQL/EventQueries/CreateEvent');
const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { addEventCategories } = require('../../SQL/EventQueries/AddEventCategories');

const uploadImageToCloudinary = require('../../Util/UploadImage');
const sendEmail = require('../../Util/Emails/sendEmail');
const { SuccessfulEventCreationEmail } = require('../../Util/Emails/Message_Templates/SuccessfulEventCreation');

module.exports.EventCreation = async (req, res) => {
    try {
        const { eventDetails, organizerID, eventCategories } = req.body;

        const existingOrganizer = await findByAttribute("organizer", "id", organizerID);
        console.log(existingOrganizer);

        if (!existingOrganizer.length) {
            console.log("Organizer not found", organizerID);
            res.send({ message: "No organizer found" });
            return;
        }

        // Handle image uploading
        const image = req.file;
        if (!image) {
            res.status(400).send({ message: 'Image file is required' });
            return;
        }

        const uploadedImageData = await uploadImageToCloudinary(image);
        

        // Include uploaded image url in eventDetails object
        let eventData = JSON.parse(eventDetails);
        eventData.additionalEventDetails.image = uploadedImageData.url;

        console.log("Event data: ", eventData);

        const successfulEventCreation = await createEvent(eventData, organizerID);

        console.log("Event creation successful", successfulEventCreation);


        // Parse eventCategories into a string(for testing via Postman)
        // First check whether it's an actual array. If not, parse
        if (eventCategories) {
            let parsedEventCategories = eventCategories;

            if(!Array.isArray(eventCategories)) {
                parsedEventCategories = JSON.parse(eventCategories);
            }

            const eventID = successfulEventCreation.id;
            const response = await addEventCategories(eventID, parsedEventCategories);

            console.log(response);
        }

        // Send confirmation email
        let emailDetails = {
            sender : "mr.laodicean@gmail.com",
            receipient : {
                name : existingOrganizer[0].name,
                email : "vincechurchillankrah@gmail.com"
            }
        };

        sendEmail(SuccessfulEventCreationEmail(emailDetails,eventData));

        res.status(200).send({
            message: "Event created successfully",
            event: successfulEventCreation
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ 
            message: 'Internal server error',
            error : error });
        throw error;
    }
}
