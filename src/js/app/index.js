require("../../scss/index.scss");
// const Toast = require("../mod/toast.js").Toast;
// Toast("hello");

let NoteManager = require("../mod/note-manager.js").NoteManager;
let Event = require("../mod/event.js");
let WaterFall = require("../mod/waterfall.js");

NoteManager.load();
$(".add-note").on("click", function () {
  NoteManager.add();
});
Event.on("waterfall", function () {
  WaterFall.init($("#content"));
});
