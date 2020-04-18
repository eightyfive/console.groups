const consoleGroups = require("./index");

test("simple", () => {
  const log = jest.spyOn(console, "log").mockImplementation(() => {});
  const groupCollapsed = jest
    .spyOn(console, "groupCollapsed")
    .mockImplementation(() => {});

  consoleGroups({
    "Title 1": [12, "jojo"],
    "Title 2": [true],
  });

  expect(groupCollapsed).toHaveBeenCalledTimes(2);
  expect(log).toHaveBeenCalledTimes(3);
});
