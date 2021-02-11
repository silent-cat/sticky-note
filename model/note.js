const Sequelize = require("sequelize");
const path = require("path");
// 连接数据库
const sequelize = new Sequelize("", "", "", {
  host: "localhost",
  dialect: "sqlite",
  storage: path.join(__dirname, "../database/database.sqlite"),
});
//检测连接
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });
// 定义表结构 通过uid控制权限
const Note = sequelize.define("note", {
  // attributes
  text: {
    type: Sequelize.STRING,
  },
  uid: {
    type: Sequelize.STRING,
  },
});

Note.sync();
// Note.sync();
//   .then(function () {
//     // 创建数据
//     Note.create({ text: "hello" });
//   })
//   .then(function () {
//     //   查询数据
//     Note.findAll({ raw: true }).then(function (notes) {
//       console.log(notes);
//     });
//   });

// Note.findAll({ raw: true, where: { id: 2 } }).then(function (notes) {
//   console.log(notes);
// });

module.exports = Note;
