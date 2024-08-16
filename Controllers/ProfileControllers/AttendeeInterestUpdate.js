const { findByAttribute } = require("../../SQL/AuthQueries/FindExistingEntity");
const { addUserInterests } = require("../../SQL/ProfileEditQueries/AddUserInterests");

module.exports.AttendeeInterestUpdate = async(req, res) => {
    try {
        const { interests } = req.body;
        const id = req.params.userID;
        
        const existingUser = await findByAttribute('guest', 'id', id);

        if(!existingUser.length) {
            console.log("No existing user found");
            res.send({ message : "User not found"});
            return;
        }

        let userInterests = interests.map((interest) => {
            return interest.toLowerCase();
        });

        console.log(userInterests);

        const successfulInterestUpdate = await addUserInterests(userInterests, id);

        console.log("Interests updated successfully: ", successfulInterestUpdate);

        res.status(200)
           .send({
                message : "User interests updated successfully",
                interests : successfulInterestUpdate
           });

    } catch(error) {
        console.error(error)
        res.status(500)
            .send({ message : 'Internal server error' });
        throw error;
    }
}