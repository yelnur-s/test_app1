const express = require("express");
const router = express.Router();
const passport = require("passport");

// Passport midleware
router.use(passport.initialize());
require('../config/passport')(passport);


router.use('/api/user', require("./userRoutes"));


router.use((err, req, res, next)=>{
	if(err) {
		return res.status(400).send({msg: err.message});
	}
	next();
});


module.exports = router;