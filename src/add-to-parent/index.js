const removeExistingHoverIndicatorClasses = require("../remove-hover-indicators");
const animate = require("../animate");

/**
 * attach given el to given parent el
 *
 * @param {DOM-node} parent
 * @param {DOM-node} dropEl
 * @param {DOM-node} insertBefore
 * @param {string} className
 * @param {DOM-node} el
 *
 */

function attachDropElementToParent(
  parent,
  dropEl,
  insertBefore,
  className,
  el
) {
  // sometimes it gives an error so keeping it a try block
  try {
    parent.insertBefore(dropEl, insertBefore);
    animate(dropEl);
    removeExistingHoverIndicatorClasses();
    el.classList.add(className);
  } catch (e) {
    throw "Error in attaching to parent " + e;
  }
}

module.exports = attachDropElementToParent;
