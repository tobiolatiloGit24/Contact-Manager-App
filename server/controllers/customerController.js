
const mongoose = require('mongoose');
const Customer = require('../models/Customer')
const User = require("../models/userModel")
// const { validateEmail, validateName, validatePhone } = require('../constants/passwordutil')



/**
 * GET/
 *About Page
 */
exports.about = async (req, res) => {

    const locals = {
        title: 'About Page',
        description: "Customer Contact Management Application"
    }

    res.render('about', { locals })
}

/**
 * GET/
 *New Customer Form
 */
exports.addCustomer = async (req, res) => {
    const locals = {
        title: 'Add New Customer',
        description: "Customer Contact Management Application"
    }

    res.render('customer/add', { locals, messages: req.flash() })

}

/**
 * GET/
 *Create New Customer
 */

exports.postCustomer = async (req, res) => {
    // const messages = req.flash()
    // console.log(messages)
    const { firstName, lastName, tel, email } = (req.body)
    if (!firstName || !lastName || !tel || !email) {
        req.flash("error", "Missing required filed to add contact")
        return res.redirect("/add")
    }

    if (!firstName.match(/^[A-Za-z][a-zA-Z]{3,30}$/)) {
        req.flash("error", "First Name & Last  Name can't be less than 2 characters")
        return res.redirect("/add")
    }
    if (!lastName.match(/^[A-Za-z][a-zA-Z]{2,30}$/)) {
        req.flash("error", "First Name & Last  Name can't be less than 2 characters")
        return res.redirect("/add")
    }

    if (!tel.match(/^[0-9]{10}$/)) {
        req.flash("error", "Invalid Phone Number! Please fill valid phone number")
        return res.redirect("/add")
    }

    if (!email.match(/^[a-zA-Z][a-zA-Z0-9\.\-_]+@[a-z]+\.[a-z]{2,5}$/)) {
        req.flash("error", "Please fill valid email")
        return res.redirect("/add")
    }
    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
    })
    console.log(newCustomer)
    try {
        await Customer.create(newCustomer)
        await req.flash("message", "New customer has been added.");
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
}


// 

/**
 * GET/
 *View Customer
 */
exports.viewCustomer = async (req, res) => {

    const locals = {
        title: 'View Customer',
        description: "Customer Contact Management Application"
    }

    try {
        const customer = await Customer.findOne({ _id: req.params.id })
        res.render('customer/view', {
            locals,
            customer
        })
    } catch (error) {
        console.log(error)
    }
}



/**
 * GET/
 *Update Customer Form
 */
exports.updateCustomer = async (req, res) => {

    const locals = {
        title: 'Update Customer',
        description: "Customer Contact Management Application"
    }
    const customer = await Customer.findOne({ _id: req.params.id })

    res.render('customer/update', {
        locals,
        customer,
        messages: req.flash()
    })
}


/**
 * PUT/
 *Update Customer Form
 */
exports.updatePostCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            UpdatedAt: Date.now()
        })

        await res.redirect(`/update/${req.params.id}`)
        await req.flash("message", "Customer has been Updated Successfuly.");

    } catch (error) {
        console.log(error)
    }
}

// 
/**
 * DELETE/
 *Delete Customer Data
 */
exports.deleteCustomer = async (req, res) => {

    const customer = await Customer.findOneAndDelete({ _id: req.params.id })
    res.redirect('/dashboard')
    // req.flash("delete", "Customer has been deleted successfuly.");
}

// 
/**
 * GET/
 *Search Customer Data
 */
exports.searchCustomers = async (req, res) => {
    const locals = {
        title: 'Search Customer Data',
        description: "Customer Contact Management Application"
    }

    try {
        let searchTerm = req.body.searchTerm;
        const searchNocharacter = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
        const customers = await Customer.find({
            $or: [
                { firstName: { $regex: new RegExp(searchNocharacter, "i") } },
                { lastName: { $regex: new RegExp(searchNocharacter, "i") } }
            ],
        })
        res.render("search", {
            customers,
            locals,
        })
    } catch (error) {
        console.log(error)
    }

}


