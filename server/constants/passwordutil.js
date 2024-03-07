function validateName(firstName, lastName) {
    var fName = firstName;
    if (!fName.match(/^[A-Za-z][a-zA-Z]{3,30}$/)) {
        return ({ message: "Filed can't be less than 3 characters" });

        // req.flash("error", "Filed can't be less than 3 characters")
        // return res.redirect("/register")

    }

    var lName = lastName;
    if (!lName.match(/^[A-Za-z][a-zA-Z]{3,30}$/)) {
        req.flash("error", "Filed can't be less than 3 characters")
        // return res.redirect("/register")
        return ({ message: "can't be less than 3 characters" });

    }
    return true;
}

function validatePhone(tel) {
    const phone = tel;
    if (phone.match(/^[0-9]{10}$/)) {
        return true;
    }
    // req.flash("error", "Invalid! Please fill in  <br> valid 10 ditgits phone number")
    // return res.redirect("/register")
    return ({ message: "Invalid Phone Number! Please inpute valid phone number" });

}

function validateEmail(email) {
    const mail = email
    if (!mail.match(/^[a-zA-Z][a-zA-Z0-9\.\-_]+@[a-z]+\.[a-z]{2,5}$/)) {
        // req.flash("error", "Please fill in valid email")
        // return res.redirect("/register")
        return ({ valid: false, message: "Please isert valid email" })
    }
    return { valid: true };
}

function validatePassword(value) {
    let pword = value;
    if (pword.length < 8) {
        req.flash("error", " Password Must be more than 7 characters")
        return res.redirect("/register")
        // return { valid: false, msg: " Password Must be more than 7 characters" };
    }

    if (pword.match(/["'():<>\[\]^`{-~]/)) {
        // req.flash("error", " Password Must contain valid special character")
        // return res.redirect("/register")
        return { valid: false, message: " Password Must contain valid character" };
    }

    if (!pword.match(/[A-Z]/)) {
        // req.flash("error", " Password Must contain one upper case character")
        // return res.redirect("/register")
        return { valid: false, msg: " Password Must contain one upper case character" };
    }

    if (!pword.match(/[a-z]/)) {
        // req.flash("error", " Password Must contain a lower case character")
        // return res.redirect("/register")
        return { valid: false, msg: " Password Must contain a lower case character" };
    }

    if (!pword.match(/[0-9]/)) {
        // req.flash("error", "Password Must contain a number")
        // return res.redirect("/register")
        return { valid: false, msg: "Password Must contain a number" };
    }

    if (!pword.match(/[_\\?@=;*-/! #-&]/)) {
        // req.flash("error", "Password is missing one special character")
        // return res.redirect("/register")
        return { valid: false, msg: "Password is missing one special character" };
    }

    return { valid: true, msg: "Valid" };
}

function validatePassword(value) {
    let pword = value;
    if (pword.length < 8) {
        req.flash("error", " Password Must be more than 7 characters")
        return res.redirect("/register")
        // return { valid: false, msg: " Password Must be more than 7 characters" };
    }

    if (pword.match(/["'():<>\[\]^`{-~]/)) {
        req.flash("error", " Password Must contain valid special character")
        return res.redirect("/register")
        // return { valid: false, message: " Password Must contain valid character" };
    }

    if (!pword.match(/[A-Z]/)) {
        req.flash("error", " Password Must contain one upper case character")
        return res.redirect("/register")
        // return { valid: false, msg: " Password Must contain one upper case character" };
    }

    if (!pword.match(/[a-z]/)) {
        req.flash("error", " Password Must contain a lower case character")
        return res.redirect("/register")
        // return { valid: false, msg: " Password Must contain a lower case character" };
    }

    if (!pword.match(/[0-9]/)) {
        req.flash("error", "Password Must contain a number")
        return res.redirect("/register")
        // return { valid: false, msg: "Password Must contain a number" };
    }

    if (!pword.match(/[_\\?@=;*-/! #-&]/)) {
        req.flash("error", "Password is missing one special character")
        return res.redirect("/register")
        // return { valid: false, msg: "Password is missing one special character" };
    }

    // return { valid: true, msg: "Valid" };
}






function confirmPassword(password) {
    if (password !== confirmPassword) {
        req.flash("error", "Password does not match")
        return res.redirect("/register")
    }
}

//  export default validatePassword;
module.exports = { validateEmail, validatePassword, validatePhone, validateName, confirmPassword }