/**
 * add class to a given el
 *
 * @param {DOM-node} el
 * @param {string} className
 *
 */
let addClass = function(el, className) {
  if (!el) return;
  el.classList.add(className);
};

module.exports = addClass;
