module.exports = function consoleGroups(groups, collapsed = true, count = -1) {
  for (const [title, vars] of Object.entries(groups)) {
    count++;

    const closed = Array.isArray(collapsed) ? collapsed[count] : collapsed;

    console[closed ? "groupCollapsed" : "group"](title);

    if (Array.isArray(vars)) {
      for (const val of vars) {
        console.log(val);
      }
    } else if (
      typeof vars === "object" &&
      vars !== null &&
      vars.constructor === Object
    ) {
      count = consoleGroups(vars, collapsed, count);
    } else {
      console.log(vars);
    }
    console.groupEnd();
  }

  return count;
};
