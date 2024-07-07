const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { editProfile } = require('../../SQL/ProfileEditQueries/EditProfile');

module.exports.AttendeeProfileUpdate = async(req, res) => {
    try {
        const { attributes, id } = req.body;
        const existingUser = await findByAttribute("guest", "id", id);

        if(!existingUser.length) {
            console.log(id, existingUser);
            res.send({ message : "No user found"});
            return;
        }

        const successfulEdit = await editProfile('guest', attributes, id);

        console.log(successfulEdit);

        res.status(200)
            .send({
                message : 'User Profile updated successfully',
                user : successfulEdit
            })

    } catch(error) {
        console.error(error)
        res.status(500)
            .send({ message : 'Internal server error' });
        throw error;
    }
}