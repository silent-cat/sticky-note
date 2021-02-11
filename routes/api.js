let express = require("express");
let router = express.Router();
let Note = require("../model/note");

/* GET users listing. */
// 获取便签接口
router.get("/notes", function (req, res, next) {
  // res.send("respond with a resource");
  let query = { raw: true };
  // 如果用户登录，只能看见自己的
  if (req.session.user) {
    query.where = {
      uid: req.session.user.id,
    };
  }
  Note.findAll(query)
    .then(function (notes) {
      console.log(notes);
      res.send({ status: 0, data: notes });
    })
    .catch(function () {
      res.send({ status: 1, errorMsg: "数据库异常" });
    });
});
// 添加便签
router.post("/notes/add", function (req, res, next) {
  // 如果用户没登陆，提示先登录
  if (!req.session.user) {
    return res.send({ status: 1, errorMsg: "请先登录" });
  }
  let note = req.body.note;
  let uid = req.session.user.id;
  Note.create({ text: note, uid: uid })
    .then(function () {
      res.send({ status: 0 });
    })
    .catch(function () {
      res.send({ status: 1, errorMsg: "数据库出错" });
    });
});
// 编辑
router.post("/notes/edit", function (req, res, next) {
  if (!req.session.user) {
    return res.send({ status: 1, errorMsg: "请先登录" });
  }
  let uid = req.session.user.id;
  Note.update(
    { text: req.body.note },
    { where: { id: req.body.id, uid: uid } }
  ).then(function () {
    res.send({ status: 0 });
  });
});
// 删除
router.post("/notes/delete", function (req, res, next) {
  if (!req.session.user) {
    return res.send({ status: 1, errorMsg: "请先登录" });
  }
  let uid = req.session.user.id;
  Note.destroy({ where: { id: req.body.id, uid: uid } }).then(function () {
    res.send({ status: 0 });
  });
});

module.exports = router;
