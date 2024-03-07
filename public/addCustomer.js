function validateName(firstName, lastName) {
    const fName = firstName;
    if (!fName.match(/^[A-Za-z][a-zA-Z]{3,30}$/)) {
        return ({ message: "can't be less than 3 characters" });
        // return false;
    }

    const lName = lastName;
    if (!lName.match(/^[A-Za-z][a-zA-Z]{3,30}$/)) {
        return ({ message: "can't be less than 3 characters" });
        // return false;
    }
    return true;
}

function validatePhone(tel) {
    const phone = tel;
    if (phone.match(/^[0-9]{10}$/)) {
        return true;
    }
    return ({ message: "invalid! Please fill valid phone number" });

}

function validateEmail(email) {
    const mail = email
    if (!mail.match(/^[a-zA-Z][a-zA-Z0-9\.\-_]+@[a-z]+\.[a-z]{2,5}$/)) {
        return ({ message: "Please fill valid email" })
    }
    return true;
}

function validatePassword(value) {
    let pword = value;
    if (pword.length < 8) {
        return { valid: false, msg: " Password Must be more than 7 characters" };
    }

    if (pword.match(/["'():<>\[\]^`{-~]/)) {
        return { valid: false, msg: " Password Must contain valid character" };
    }

    if (!pword.match(/[A-Z]/)) {
        return { valid: false, msg: " Password Must contain one upper case character" };
    }

    if (!pword.match(/[a-z]/)) {
        return { valid: false, msg: " Password Must contain a lower case character" };
    }

    if (!pword.match(/[0-9]/)) {
        return { valid: false, msg: "Password Must contain a number" };
    }

    if (!pword.match(/[_\\?@=;*-/! #-&]/)) {
        return { valid: false, msg: "Password is missing one special character" };
    }

    return { valid: true, msg: "Valid" };
}

//  export default validatePassword;
module.exports = { validateEmail, validatePassword, validatePhone, validateName }