const reNumeric = /^\d$/;

module.exports = function consoleGroups(groups, collapsed = true, count = -1) {
  for (const [title, vars] of Object.entries(groups)) {
    if (reNumeric.test(title)) {
      (Array.isArray(vars) ? vars : [vars]).map(console.log);
    } else {
      count++;

      const closed = Array.isArray(collapsed) ? collapsed[count] : collapsed;

      console[closed ? "groupCollapsed" : "group"](title);

      if (
        typeof vars === "object" &&
        vars !== null &&
        vars.constructor === Object
      ) {
        count = consoleGroups(vars, collapsed, count);
      } else {
        (Array.isArray(vars) ? vars : [vars]).map(console.log);
      }
      console.groupEnd();
    }
  }

  return count;
};
