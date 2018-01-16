const $ = require("../query-selector/index");

/**
 *
 *make dragged element style and classes as it was initialy
 *
 * @param {string} dragging
 *
 * @return {DOM-node || null}
 *
 */

function clearDragElment(dragging) {
  let elDragging = $("." + dragging)[0];
  if (!elDragging) return;
  elDragging = $("." + dragging)[0].cloneNode(true);
  elDragging.classList.remove(dragging);
  elDragging.style.position = "relative";
  elDragging.style.top = "auto";
  elDragging.style.left = "auto";
  return elDragging;
}

module.exports = clearDragElment;
