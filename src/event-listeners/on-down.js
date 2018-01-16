/**
 * event listener function on mouse down
 *
 * @param {event} e
 *
 */

function onDown(e) {
  let isDraggable = checkElementHasParent(
    e.target,
    draggableElementClassName,
    containerClassName
  );
  /**
   *
   * if target el is not draggable( target el or its parent elements don't have draggable class) then return.
   *
   */
  if (!isDraggable) return;
  clickedEl = isDraggable;
  /**
   *
   * get el's current index
   *
   */

  let obj = getIndexs(clickedEl, draggableElementClassName);
  elementsOldIndex = obj.elementIndex;

  /**
   *
   * set parent el
   *
   */
  parent = clickedEl.parentNode;
  /**
   *
   * get current cordinates of parent el
   *
   */
  parentCords = parent.getBoundingClientRect();
  parent.style.height = parentCords.height;
  mouseDown = true;

  /**
   *
   * add dragging class to click el so it can be tracked and dragged
   *
   */
  clickedEl.classList.add(dragging);
  clickedEl.style.position = "relative";
}

module.exports = onDown;
