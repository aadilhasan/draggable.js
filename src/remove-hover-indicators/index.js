const $ = require("../query-selector/index");

/**
 * remove hover indicator classe from the hovered el
 *
 */

function removeExistingHoverIndicatorClasses() {
  let boxBottom = $(".dgble-btm"),
    boxTop = $(".dgble-top"),
    len = boxBottom.length,
    i = 0;

  for (i; i < len; i++) {
    boxBottom[i].classList.remove("dgble-btm");
  }

  len = boxTop.length;
  i = 0;

  for (i; i < len; i++) {
    boxTop[i].classList.remove("dgble-top");
  }
}

module.exports = removeExistingHoverIndicatorClasses;
