const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (!user) return done(null, false, { message: "No user with that email" });

    try {
      if (await bcrypt.compare(password, user.hashedPassword)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(
    new localStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((user, done) => {
    done(null, getUserById(user));
  });
}

module.exports = initialize;
