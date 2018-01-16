/**
 * traverse to the top until either you find the given parent class or limit class or body
 *
 * @param {DOM-node} el
 * @param {string} parentClass
 * @param {string} limitClass
 *
 * @return {DOM-node}
 */

let checkElementHasParent = function(el, parentClass, limitClass) {
  if (!el) return null;
  if (el.classList.contains(parentClass)) return el;
  if (el.classList.contains(limitClass || el.nodeName == "body")) return null;
  return checkElementHasParent(el.parentNode, parentClass, limitClass);
};

module.exports = checkElementHasParent;
