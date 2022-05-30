const moment = require("moment");

module.exports = {
  ifCond: function (a, b, options) {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  belowCond: function (a, b, options) {
    if (a <= b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  elseIfCond: function () {
    const args = Array.prototype.slice.call(arguments, 0, -1);
    const options = arguments[arguments.length - 1];
    const allEqual = args.every(function (expression) {
      return args[0] === expression;
    });
    return allEqual ? options.fn(this) : options.inverse(this);
  },
  checkRemain: function (remain) {
    if (remain !== null) {
      return `${remain} Hari`;
    } else {
      return "Undefined";
    }
  },
  convertTime: function (date) {
    if (date) {
      let mmnt = moment(date);
      return mmnt.format("DD MMMM YYYY, hh:mm:ss");
    } else {
      return "Not Defined";
    }
  },
  remainDays: function (date) {
    let now = moment(new Date()),
      end = moment(date),
      days = end.diff(now, "days");
    return days;
  },
  remainWatchlist: function (date, parameter, options) {
    if (date <= parameter) {
      return options.fn(this);
    }
  },
};
