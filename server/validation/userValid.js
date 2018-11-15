const validator = require("validator");
const isEmpty = require('../utils/is-empty');
const User = require('../models/User');

module.exports.register = async function(data) {
	let errors = {};

	if(isEmpty(data.email)){
		errors.email = "Email field is required";
	} else if(!validator.isEmail(data.email)) {
		errors.email = "Email not valid";
	} else {
        let user = await User.findOne({email: data.email}).exec();
        if(user) errors.email = "User with this email already exists"
    }

	if(isEmpty(data.name)){
		errors.name = "Name field is required";
	} else if(!validator.isLength(data.name, {max: 40})) {
		errors.name = "Name field should have less than 40 characters";
	}

	if(isEmpty(data.password)){
		errors.password = "Password field is required";
	} else if(!validator.isLength(data.password, {min: 6, max: 40})) {
		errors.password = "Password field should have more than 6 characters";
	}

	return errors;
}

module.exports.login = function(data) {
    let errors = {};

    if(isEmpty(data.email)){
        errors.email = "Email field is required";
    } else if(!validator.isEmail(data.email)) {
        errors.email = "Email not valid";
    }

    if(isEmpty(data.password)){
        errors.password = "Password field is required";
    } else if(!validator.isLength(data.password, {min: 6, max: 40})) {
        errors.password = "Password field should have more than 6 characters";
    }

    return errors;
}


module.exports.addOrEdit = async function(data) {
    let errors = {};

    if(isEmpty(data.email)){
        errors.email = "Email field is required";
    } else if(!validator.isEmail(data.email)) {
        errors.email = "Email not valid";
    } else if(!data._id){
        let user = await User.findOne({email: data.email}).exec();
        if(user) errors.email = "User with this email already exists";
    }

    if(isEmpty(data.name)){
        errors.name = "Name field is required";
    } else if(!validator.isLength(data.name, {max: 40})) {
        errors.name = "Name field should have less than 40 characters";
    }

    if(!isEmpty(data.phone)&&data.phone.indexOf("_")>=0){
        errors.phone = "Phone not valid";
    } 

    return errors;
}

module.exports.checkMail = async function(data) {
    let errors = {};

    if(isEmpty(data.email)){
        errors.email = "Email field is required";
    } else if(!validator.isEmail(data.email)) {
        errors.email = "Email not valid";
    } else {
        let user = await User.findOne({email: data.email}).exec();
        if(!user) errors.email = "User with this email is not exists";
    }

    return errors;
}

