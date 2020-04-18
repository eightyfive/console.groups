const consoleGroups = require("./index");

const log = jest.spyOn(console, "log").mockImplementation(() => {});
const group = jest.spyOn(console, "group").mockImplementation(() => {});
const groupCollapsed = jest
  .spyOn(console, "groupCollapsed")
  .mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

test("flat", () => {
  consoleGroups({
    "Title 1": [12, "jojo"],
    "Title 2": [true],
  });

  expect(groupCollapsed).toHaveBeenCalledTimes(2);
  expect(group).toHaveBeenCalledTimes(0);
  expect(log).toHaveBeenCalledTimes(3);
});

test("indented", () => {
  consoleGroups({
    "Title 1": {
      "Title 2": [1, 2, 3],
    },
    "Title 3": ["hello", "world"],
  });

  expect(groupCollapsed).toHaveBeenCalledTimes(3);
  expect(group).toHaveBeenCalledTimes(0);
  expect(log).toHaveBeenCalledTimes(5);
});

test("Not collapsed", () => {
  consoleGroups(
    {
      "Title 1": {
        "Title 2": [1],
      },
      "Title 3": ["hello"],
    },
    false
  );

  expect(groupCollapsed).toHaveBeenCalledTimes(0);
  expect(group).toHaveBeenCalledTimes(3);
});

test("Collapsed and not", () => {
  consoleGroups(
    {
      "Title 1": {
        "Title 2": [1],
      },
      "Title 3": ["hello"],
    },
    [0, 1, 0]
  );

  expect(groupCollapsed).toHaveBeenCalledTimes(1);
  expect(group).toHaveBeenCalledTimes(2);
});

test("Complex", () => {
  consoleGroups(
    {
      "Title 1": [12, "jojo"],
      "Title 2": [
        true,
        {
          foo: ["bar", { fooooo: "baaaaaar" }],
        },
      ],
      "Title 3": {
        "Title 4": [1, 2],
        "Title 5": 1,
      },
    },
    [0, 1, 0, 0, 1]
  );

  expect(groupCollapsed).toHaveBeenCalledTimes(2);
  expect(group).toHaveBeenCalledTimes(3);
  expect(log).toHaveBeenCalledTimes(7);
});

test("Skip group", () => {
  consoleGroups({
    "Title 1": {
      "0": [1, 2],
      "Title 2": 1,
    },
  });

  expect(groupCollapsed).toHaveBeenCalledTimes(2);
  expect(log).toHaveBeenCalledTimes(3);
});

test("Unicorn title", () => {
  consoleGroups({
    "{red}Red title": 1,
  });

  expect(groupCollapsed).toHaveBeenCalledWith("%cRed title", "color: red");
  expect(log).toHaveBeenCalledTimes(1);
});

test("Unicorn value", () => {
  consoleGroups({
    "Title 1": "{bold; green}I am hulk",
  });

  expect(groupCollapsed).toHaveBeenCalledWith("Title 1");
  expect(log).toHaveBeenCalledWith(
    "%cI am hulk",
    "font-weight: bold; color: green"
  );
});
