let express = require("express");
let router = express.Router();

let passport = require("passport");
let GitHubStrategy = require("passport-github").Strategy;

passport.serializeUser(function (user, done) {
  console.log("---serializeUser---");
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log("---deserializeUser---");
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: "1a42fb9bb6c651f33a7f",
      clientSecret: "733c67ca59bc2ad996c66930491f80d5d201163e",
      callbackURL: "http://localhost:8080/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //   User.findOrCreate({ githubId: profile.id }, function (err, user) {});
      done(null, profile);
    }
  )
);

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    console.log(req.user);
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider,
    };
    res.redirect("/");
  }
);

module.exports = router;
