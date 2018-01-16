/**
 * event listener function on mouse up
 *
 * @param {event} e
 *
 */

function onUp(e) {
  /**
   *
   * if there is not el in which mouse was clicked/down the return
   *
   */
  if (!clickedEl) return;
  mouseDown = false;

  /**
   * if dragged element is not being hovered on any sibling element then reset dragging elements style to default
   *
   */
  if (!newTopDraggable && !newBottomDraggable) {
    clearDragElment(dragging);
    let draggingNode = $("." + dragging)[0];
    if (!draggingNode) return;
    draggingNode.classList.remove(dragging);
    draggingNode.style.position = "relative";
    draggingNode.style.top = "auto";
    draggingNode.style.left = "auto";
    return;
  }
  /**
   *
   * check if dragging el is hovering on left/top or right/bottom of a sibling
   * and add the temp add here element to the hovered element
   *
   */
  let draggingNode;
  if (newTopDraggable) {
    /**
     * add file before the hovered el
     *
     */
    draggingNode = clearDragElment(dragging);
    newTopDraggable.replaceWith(draggingNode);
    newTopDraggable.remove();
    newTopDraggable = null;
  } else if (newBottomDraggable) {
    /**
     * add file after the hovered el
     *
     */
    draggingNode = clearDragElment(dragging);
    newBottomDraggable.replaceWith(draggingNode);
    newBottomDraggable.remove();
    newBottomDraggable = null;
  }
  clearTarget();
  /**
   * get new index of the dragged el
   *
   */
  let obj = getIndexs(draggingNode, draggableElementClassName);
  elementsNewIndex = obj.elementIndex;
  let newIndexes = obj.allIndexs;

  handler(draggingNode, newIndexes, elementsNewIndex, elementsOldIndex); //call handler
  clickedEl.classList.remove(dragging);
  elementsNewIndex = elementsOldIndex = null;
}

module.exports = onUp;
