const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { createUser } = require('../../SQL/AuthQueries/CreateUser');
const { generateToken }  = require('../../Util/Auth');
// const { genericEmail } = require('../../Util/Emails/Message_Templates/sample');
const sendEmail = require('../../Util/Emails/sendEmail');

module.exports.AttendeeSignUp = async(req, res) => {
    try{
        const { first_name, last_name, email, password } = req.body;

        const existingUser = await findByAttribute("guest", "email", email);
        
        if(existingUser.length) {
            res.json({
                message : "A user with this email already exists",
                success : false
            });
        } 

        const newUser = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password : password
        };

        const user = await createUser(newUser);
    
        const token = generateToken(user.id);

        // const sampleEmail = {
        //     sender : 'hello@bookit.com',
        //     receipient : 'vincechurchillankrah@gmail.com',
        //     subject : 'Successful sign up',
        //     text : genericEmail
        // }

        // sendEmail(sampleEmail);
        
        res.json({
            message : 'User created successfully',
            token : token,
            user : user,
            role : "Attendee",
            success : false
        })

    } catch(error) {
        console.log(error);
        res.send({
            message : "Internal Server error",
            success : false
        })
    }
}