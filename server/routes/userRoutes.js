const express = require("express");
const router = express.Router();
const User = require('../models/User');
const userValidate = require("../validation/userValid");
const isEmpty = require('../utils/is-empty');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const keys = require('../config/keys');


// Rgister to the system as user, not used
router.post('/register', async (req, res, next)=> {
	let errors = await userValidate.register(req.body);
	if(!isEmpty(errors)) {
		return res.status(400).send(errors);
	}

	console.log(req.body);
	let user = new User(req.body)
	bcrypt.genSalt(10, (err, salt)=>{
    	if(err) return next(err);

    	bcrypt.hash(user.password, salt, (err, hash)=>{
    		if(err) return next(err);
    		user.password = hash;
    		user.save((err, user)=>{
				if(err) return next(err);
				res.status(200).end();
			});
    	})

    });
});

// Logout
router.post('/logout', (req, res, next)=> {
    req.logout();
    res.status(200).end();
});


// For  forget password not used
router.post('/checkmail', async (req, res, next)=> {
    let errors = await userValidate.checkMail(req.body);
    if(!isEmpty(errors)) {
        return res.status(400).send(errors);
    }
    res.status(200).end();
});



// Login  POST /api/user/login
router.post('/login', (req, res, next)=>{

	let errors = userValidate.login(req.body);
	if(!isEmpty(errors)) {
		return res.status(400).send(errors);
	}

	User.findOne({email: req.body.email}).exec((err, user)=>{
		if(err) return next(err);
		if(!user) {
			errors.email = "User with that email not exist";
			return res.status(400).send(errors);
		} else {
						 // 
			bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{
				if(err) return next(err);
				if(!isMatch) {
					errors.password = "Password is incorrect";
					return res.status(400).send(errors);
				} else {

					const payload = { _id: user._id, 
									  name: user.name,
									  isAdmin: user.isAdmin }; // Create JWT Payload

			        // Sign Token
			        jwt.sign(
			          payload,
			          keys.jwtKey,
			          { expiresIn: 3600 },
			          (err, token) => {
			          	if(err) return next(err);
			            res.status(200).send({
			              success: true,
			              token: 'Bearer ' + token
			            });
			          }
			        );
				}
			});
		}
	});
});


// getUser data by pages GET /api/user/:page/pagination
router.get('/:page/pagination', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	const inEachPage = 10;
	User.count({isAdmin: false}).exec((err, countUsers)=>{
		User.find({isAdmin: false}).select('name email phone position')
		.sort({date: -1})
		.skip(inEachPage*req.params.page)
		.limit(inEachPage)
		.exec((err, users)=>{
			if(err) return next(err);
			res.status(200).send({
				users:users,
				pages: Math.ceil(countUsers/inEachPage),
                page: req.params.page,
				countUsers: countUsers
			});
		})
	})	
});


// get searched User data by pages GET /api/user/:page/:key/search
router.get('/:page/:key/search', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	const inEachPage = 10;
	User.count({$and: [{isAdmin: false}, {$or:[{name: new RegExp(req.params.key, 'i')}, {email: new RegExp(req.params.key, 'i')},{position: new RegExp(req.params.key, 'i')},{phone: new RegExp(req.params.key, 'i')}]}] })
	.exec((err, countUsers)=>{
		User.find({$and: [{isAdmin: false}, {$or:[{name: new RegExp(req.params.key, 'i')}, {email: new RegExp(req.params.key, 'i')},{position: new RegExp(req.params.key, 'i')},{phone: new RegExp(req.params.key, 'i')}]}] })
		.select('name email phone position')
		.sort({date: -1})
		.skip(inEachPage*req.params.page)
		.limit(inEachPage)
		.exec((err, users)=>{
			if(err) return next(err);
			res.status(200).send({
				users:users,
				pages: Math.ceil(countUsers/inEachPage),
				page: req.params.page,
				countUsers: countUsers
			});
		})
	})	
});


// Add user POST /api/user
router.post('/', passport.authenticate('jwt', { session: false }),isAdmin, async (req, res, next)=>{
    let errors =await userValidate.addOrEdit(req.body);
    if(!isEmpty(errors)) {
        return res.status(400).send(errors);
    }

    let user = new User(req.body)
	user.save((err, user)=>{
		if(err) return next(err);
		res.status(200).send(user);
	});

});


// Edit user PUT /api/user
router.put('/', passport.authenticate('jwt', { session: false }),isAdmin,  (req, res, next)=>{
    let errors = userValidate.addOrEdit(req.body);
    if(!isEmpty(errors)) {
        return res.status(400).send(errors);
    }

    User.findById(req.body._id).exec((err, user)=>{
        user.name = req.body.name;
    	user.email = req.body.email;
    	user.phone = req.body.phone;
    	user.position = req.body.position;

        user.save((err, user)=>{
            if(err) return next(err);
            res.status(200).send(user);
        });
	})


});


// Delete user by ID DELETE /api/user/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }),isAdmin, (req, res, next)=>{
    User.remove({_id: req.params.id}).exec(err=>{
        if(err) return next(err);
        res.status(200).end();
    })
});


function isAdmin(req, res, next) {
	if(req.user&&req.user.isAdmin) {
		next();
	} else {
		res.status(400).send({msg: "Access denied"});
	}
}









module.exports = router;