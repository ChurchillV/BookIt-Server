const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { editProfile } = require('../../SQL/ProfileEditQueries/EditProfile');

module.exports.OrganizerProfileUpdate = async(req, res) => {
    try {
        const { attributes } = req.body;
        const id = req.params.orgID;
        const existingOrganizer = await findByAttribute('organizer', 'id', id);

        if(!existingOrganizer.length) {
            console.log("Organizer not found");
            res.send({ message : "No existing organizer found"});
            return;
        }

        const successfulEdit = await editProfile('organizer', attributes, id);

        console.log(successfulEdit);

        res.status(200)
            .send({
                message : "Profile edited successfully",
                profile : successfulEdit
            });

    } catch(error) {
        console.error(error)
        res.status(500)
            .send({ message : 'Internal server error' });
        throw error;
    }
}