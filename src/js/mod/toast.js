require("../../scss/toast.scss");
let $ = require("jquery");

function toast(msg, time) {
  this.msg = msg;
  this.dismissTime = time || 1000; //ms
  this.createToast();
  this.showToast();
}
toast.prototype = {
  createToast: function () {
    let tpl = `<div class="toast">${this.msg}</div>`;
    this.$toast = $(tpl);
    $("body").append(this.$toast);
  },
  showToast: function () {
    let self = this;
    this.$toast.fadeIn(300, function () {
      setTimeout(function () {
        self.$toast.fadeOut(300, function () {
          self.$toast.remove();
        });
      }, self.dismissTime);
    });
  },
};

function Toast(msg, time) {
  return new toast(msg, time);
}
module.exports.Toast = Toast;

// module.exports导出的是一个对象
