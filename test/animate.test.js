const $ = require("../src/query-selector");
const animate = require("../src/animate");
const document = require("./test-document");

let draggables = $(".ctlr"),
  dragged = "_dragged";

// add class _dragged to el
draggables[0].classList.add(dragged);
draggables[1].classList.add(dragged);

test(" check elements has dragged class", () => {
  expect(draggables[0].classList).toContain(dragged);
  expect(draggables[1].classList).toContain(dragged);
  expect(draggables[2].classList).not.toContain(dragged);
});

test(" check if animate work properly", () => {
  animate(draggables[2]);
  expect(draggables[0].classList).not.toContain(dragged);
  expect(draggables[1].classList).not.toContain(dragged);
  expect(draggables[2].classList).toContain(dragged);
});
