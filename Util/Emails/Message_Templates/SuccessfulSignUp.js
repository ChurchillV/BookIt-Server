module.exports.SuccessfulSignUpEmail = (emailDetails) => {
    return {
        from : emailDetails.sender,
        to : emailDetails.receipient.email,
        subject : "Successful SignUp",
        text : `Hello ${emailDetails.receipient.firstname}. Welcome to BookIt!`
    }
}