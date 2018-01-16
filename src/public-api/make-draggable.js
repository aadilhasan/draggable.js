/**
 * make child children of given el draggable
 *
 * @param {string} className
 *
 */

function makeDraggable(identifier, notDraggable) {
  parent = $(identifier)[0];
  addClass(parent, containerClassName);
  let skip = false;
  if (
    notDraggable &&
    (Array.isArray(notDraggable) || typeof notDraggable !== "object")
  ) {
    console.warn(
      `second argument must be an object, eg: "{identifier: 'className/Index' , type: 'class/index'}"`
    );
  } else if (typeof notDraggable == "object") {
    if (
      notDraggable.identifier == undefined ||
      notDraggable.identifier == null
    ) {
      console.warn(`Second argument must have a "identifier" key`);
    } else if (notDraggable.type == undefined || notDraggable.type == null) {
      console.warn(`Second argument must have a "type" key`);
    } else {
      skip = true;
    }
  }

  let children = parent.children,
    len = children.length,
    i = 0;
  // add class to all children
  for (i; i < len; i++) {
    if (skip) {
      if (
        (notDraggable.type == "class" &&
          !children[i].classList.contains(notDraggable.identifier)) ||
        notDraggable.identifier != i
      ) {
        addClass(children[i], draggableElementClassName);
        children[i].setAttribute("d-index", i);
      }
    } else {
      addClass(children[i], draggableElementClassName);
      children[i].setAttribute("d-index", i);
    }
  }

  allDraggable = children;
  parentCords = parent.getBoundingClientRect();

  // add event listeners to the parent el and body
  parent.addEventListener("mousedown", onDown);
  document.querySelector("body").addEventListener("mouseup", onUp);
  parent.addEventListener("mousemove", onMove);
  console.log(" ========= draggable init ============");
}

module.exports = makeDraggable;
