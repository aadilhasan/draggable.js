const $ = require("../query-selector/index");

/**
 * add dragged class to the el so it can be animated(CSS animation)
 * or animate with help of setInterval function
 *
 * @param {DOM-node} el
 *
 */

let animate = function(el) {
  let alreadyMoved = $("._dragged");

  for (let i = 0; i < alreadyMoved.length; i++) {
    alreadyMoved[i].classList.remove("_dragged");
  }

  el.classList.add("_dragged");
  return;

  /**
   *
   * animate using js
   *
   */
  let x = 200,
    temp = 0;
  let timeout = setInterval(() => {
    if (temp == x) {
      clearInterval(timeout);
      el.style.borderStyle = "dashed";
      return;
    }

    temp += 10;
    el.style.width = temp + "px";
  }, 1);
};

module.exports = animate;
