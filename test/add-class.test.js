const addClass = require("../src/add-class");
let newNode = document.createElement("div");

test("check node has no class", () => {
  expect(newNode.classList.length).toEqual(0);
});

test("check node has class test", () => {
  addClass(newNode, "test");
  expect(newNode.classList).toContain("test");
});
