const unicorn = require("console.unicorn/unicorn");

const reNumeric = /^\d$/;

module.exports = function consoleGroups(groups, collapsed = true, count = -1) {
  for (const [key, vars] of Object.entries(groups)) {
    const isNum = reNumeric.test(key);

    if (!isNum) {
      count++;

      let closed;

      if (Array.isArray(collapsed)) {
        closed = collapsed[count] || typeof collapsed[count] === "undefined";
      } else {
        closed = collapsed;
      }

      const title = unicorn(key);

      if (closed) {
        console.groupCollapsed(...title);
      } else {
        console.group(...title);
      }
    }

    if (
      !isNum &&
      typeof vars === "object" &&
      vars !== null &&
      vars.constructor === Object
    ) {
      count = consoleGroups(vars, collapsed, count);
    } else {
      const values = Array.isArray(vars) ? vars : [vars];

      for (const val of values) {
        if (typeof val === "string") {
          console.log(...unicorn(val));
        } else {
          console.log(val);
        }
      }
    }

    if (!isNum) {
      console.groupEnd();
    }
  }

  return count;
};
