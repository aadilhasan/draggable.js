const makeDraggable = require("./public-api/make-draggable");
const addHandler = require("./public-api/add-handler");
const destroy = require("./public-api/destroy");

let draggable = {
  makeDraggable: makeDraggable,
  addHandler: addHandler,
  destroy: destroy
};

console.log(makeDraggable);
