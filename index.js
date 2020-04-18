const unicorn = require("console.unicorn/unicorn");

const reNumeric = /^\d$/;

module.exports = function consoleGroups(groups, collapsed = true, count = -1) {
  for (const [key, vars] of Object.entries(groups)) {
    const isGroup = !reNumeric.test(key);

    if (isGroup) {
      count++;

      const closed = Array.isArray(collapsed) ? collapsed[count] : collapsed;
      const title = unicorn(key);

      if (closed) {
        console.groupCollapsed(...title);
      } else {
        console.group(...title);
      }
    }

    if (
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

    if (isGroup) {
      console.groupEnd();
    }
  }

  return count;
};
