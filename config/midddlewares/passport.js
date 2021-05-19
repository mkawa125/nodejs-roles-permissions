const User = require("../../modules/users/userModel");
const {SECRET} = require("..");
const {Strategy, ExtractJwt} = require("passport-jwt");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
}

module.exports = passport => {
    passport.use(
        new Strategy(options, async (payload, done) => {
        await User.findById(payload.user_id)
        .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => {
            return done(null, false)
        });
    }))
}