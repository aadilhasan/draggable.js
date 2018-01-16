const addToParent = require("../src/add-to-parent");
const $ = require("../src/query-selector");
const document = require("./test-document");

let draggables = $(".ctlr");
let el = draggables[0];
let allSiblings = el.parentNode.children;
let parent = el.parentNode;
let dropEl = document.createElement("div");
let className = "test";

test(" check existing siblings", () => {
  expect(allSiblings.length).toEqual(2);
});

test("check add to parent works ", () => {
  addToParent(parent, dropEl, el, className, el);
  expect(parent.children.length).toEqual(3);
  expect(dropEl.classList).toContain("_dragged");
  expect(el.classList).toContain(className);
});
