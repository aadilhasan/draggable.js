/**
 * find el's index in the all drabble elements
 *
 * @param {DOM-node} el
 *
 * @return {object}
 */

function getIndexs(el, draggableClass) {
  let allDraggable = $("." + draggableClass);
  let index = null,
    newIndexes = {};
  for (let i = 0; i < allDraggable.length; i++) {
    if (el.isEqualNode(allDraggable[i])) {
      index = i;
    }
    newIndexes[allDraggable[i].getAttribute("d-index")] = i;
  }
  return {
    elementIndex: index,
    allIndexs: newIndexes
  };
}

export default getIndexs;
