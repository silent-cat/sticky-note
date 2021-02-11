let express = require("express");
let router = express.Router();

router.get("/", function (req, res, next) {
  // 判断用户的登录,控制页面的显示
  let data;
  if (req.session.user) {
    data = {
      isLogin: true,
      user: req.session.user,
    };
  } else {
    data = {
      isLogin: false,
    };
  }
  console.log(data);
  res.render("index", data);
});

module.exports = router;
