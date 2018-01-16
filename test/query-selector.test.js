const $ = require("../src/query-selector");
const document = require("./test-document");

const query = "#test";

let el = $(query);
let el2 = $("#test_test");
let elById = document.getElementById("test");

test("check query selector returns correct element", () => {
  expect(el).not.toBeNull();
  expect(el[0]).toEqual(elById);
  expect(el2.length).toEqual(0);
});
