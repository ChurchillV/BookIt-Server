const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { createUser } = require('../../SQL/AuthQueries/CreateUser');
const { generateToken }  = require('../../Util/Auth');
const sendEmail = require('../../Util/Emails/sendEmail');
const { SuccessfulSignUpEmail } = require('../../Util/Emails/Message_Templates/SuccessfulSignUp');

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

        // Send confirmation email on sign up
        const emailDetails = {
            sender : 'hello@bookit.com',
            receipient : {
                email : email,
                first_name : first_name
            }
        }

        sendEmail(SuccessfulSignUpEmail(emailDetails));
        
        res.json({
            message : 'User created successfully',
            token : token,
            user : user,
            role : "Attendee",
            success : true
        })

    } catch(error) {
        console.log(error);
        res.send({
            message : "Internal Server error",
            success : false
        })
    }
}