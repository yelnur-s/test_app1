const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require("../config/keys");
const User = require('../models/User');

const opt = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.jwtKey
};


module.exports = passport => {
  passport.use(
    new JwtStrategy(opt, (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .exec((err, user) => {
          if(err) console.log(err);
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        
    })
  );
};


