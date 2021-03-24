const moment = require('moment');

module.exports = {
  ifCond: function (a, b, options) {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  checkRemain: function (remain) {
    if (remain !== null) {
      return `${remain} Hari`
    }
  },
  convertTime: function (date) {
    if (date) {
      let mmnt = moment(date)
      return mmnt.format('DD MMMM YYYY, hh:mm:ss')
    }
  }
};
