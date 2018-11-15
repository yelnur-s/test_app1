const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: String,
	email: {type: String, unique: true},
	date: {type: Date, default: Date.now},
	password: String,
    position: String,
    phone: String,
	approved: { type: Boolean , default: false },
	isAdmin: { type: Boolean , default: false }
});


module.exports = mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);
User.findOne({isAdmin: true}).exec((err, admin)=>{
	if(err) console.log(err);
	else if(!admin){

        let user = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: "qweqweqw",
            approved: true,
            isAdmin: true
        })
        bcrypt.genSalt(10, (err, salt)=>{
            if(err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash)=>{
                if(err) return next(err);
                user.password = hash;
                user.save((err)=>{
                    if(err) console.log(err);
                    else {
                        console.log("Admin user is created:")
                        console.log("login: admin@gmail.com");
                        console.log("password: qweqweqw");
                    }
                });
            })

        });

	}
})

