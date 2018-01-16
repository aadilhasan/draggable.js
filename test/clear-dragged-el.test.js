const clearDragged = require("../src/clear/clear-dragged-element");
const $ = require("../src/query-selector");
const document = require("./test-document");

let draggables = $(".ctlr"),
  draggingClass = "dragging";

let firstEl = draggables[0];
// add class _dragged to el
firstEl.classList.add(draggingClass);
firstEl.style.top = "10px";
firstEl.style.left = "20px";

test(" check element has class dragging ", () => {
  expect(firstEl.classList).toContain(draggingClass);
  expect(firstEl.style.top).toEqual("10px");
  expect(firstEl.style.left).toEqual("20px");
});

test(" check clear drag el function working with none existing element ", () => {
  let result = clearDragged("test_test");
  expect(result).toEqual(undefined);
});

// test(" check clear drag el function workin", () => {
//   let result = clearDragged(draggingClass);
//   expect(result.style.top).toEqual("auto");
// });
