let mouseDown = false;
let clickedEl, parent, parentCords, elementsOldIndex, elementsNewIndex;
let allDraggable,
  handler = function() {};
let newTopDraggable, newBottomDraggable;
let draggableElementClassName = "_draggable",
  containerClassName = "_draggable-container",
  dropAreaClass = "_add-here",
  dragging = "_dragging";
let counter = 0;

let initals = {
  mouseDown: false,
  clickedEl: null,
  parent: null,
  parentCords: null,
  elementsOldIndex: null,
  elementsNewIndex: null,
  allDraggable: null,
  handler: function() {},
  newTopDraggable: null,
  newBottomDraggable: null,
  draggableElementClassName: "_draggable",
  containerClassName: "_draggable-container",
  dropAreaClass: "_add-here",
  dragging: "_dragging",
  counter: 0
};

module.exports = initals;
