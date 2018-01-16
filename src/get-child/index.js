/**
 * find child of el who has given class
 *
 * @param {DOM-node} el
 * @param {string} className
 *
 * @return {DOM-node}
 */

let getChildByClassName = function(el, className) {
  let children = el.children;

  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains(className)) return children[i];
  }

  return null;
};

module.exports = getChildByClassName;
