/**
 * create a new drop/add-here element to indicatet the the drop location
 *
 * @param {DOM-node} el
 *
 * @return {DOM-node}
 */

function makeDropElement(clickedEl, draggableElementClassName, dropAreaClass) {
  let dropEl = document.createElement("div");
  let clickedElCords = getComputedStyle(clickedEl, null);
  dropEl.style.height = clickedElCords.height;
  dropEl.style.width = clickedElCords.width;
  let animator = document.createElement("div");
  dropEl.classList.add(draggableElementClassName);
  dropEl.classList.add(dropAreaClass);
  animator.classList.add("_animate_drop");
  dropEl.appendChild(animator);
  return dropEl;
}

module.exports = makeDropElement;
