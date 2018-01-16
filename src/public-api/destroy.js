/**
 * destroy draggable by removing attached event listeners
 *
 *
 */
function destroy() {
  parent.removeEventListener("mousedown", onDown);
  document.querySelector("body").removeEventListener("mouseup", onUp);
  parent.removeEventListener("mousemove", onMove);
  console.log(" ======== draggables destryed =========");
}

module.exports = destroy;
