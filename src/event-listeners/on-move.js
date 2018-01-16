import default from "../make-draggable/index";

/**
 * event listener function on mouse move
 *
 * @param {event} e
 *
 */

function onMove(e) {
  // if mouse is not down in any el then return
  if (!mouseDown) return;

  // aget style of clicked el
  let currentElStyle = window.getComputedStyle(clickedEl, null);

  let totalHeight =
    int(currentElStyle.height) +
    int(currentElStyle.marginTop) +
    int(currentElStyle.marginBottom);
  let totalWidth =
    int(currentElStyle.width) +
    int(currentElStyle.marginLeft) +
    int(currentElStyle.marginRight);

  parentCords = parent.getBoundingClientRect();
  // set mouse's top and left postition for clicked el
  dragingStyle.top = e.clientY - parentCords.y - totalHeight / 2 + "px";
  dragingStyle.left = e.clientX - parentCords.x - totalWidth / 2 + "px";

  for (let key in dragingStyle) {
    clickedEl.style[key] = dragingStyle[key];
  }

  /**
   *
   * throttle : wait fot 20 tick befor checkin for hover, 20 is a ideal no this
   *
   */
  ++counter;
  if (counter < 20) return;
  counter = 0;
  allDraggable = $("." + draggableElementClassName);
  if (allDraggable) {
    let len = allDraggable.length,
      i = 0;
    for (i; i < len; i++) {
      let el = allDraggable[i],
        nextEl = allDraggable[i + 1];
      // if el is not being dragged then check if it is being hovered
      if (!el.classList.contains(dragging)) {
        let rect = el.getBoundingClientRect(),
          rectStyle = window.getComputedStyle(el, null);
        let top = rect.top,
          bottom = top + rect.height;
        let left = rect.left,
          right = left + int(rectStyle.width);
        let totalHeight =
            rect.top +
            rect.height / 2 +
            rectStyle.marginTop +
            rectStyle.marginBottom,
          centerH = top + rect.height / 3,
          centeV = left + rect.width / 3;

        // check if mouse is in over any el
        if (
          e.clientX > left &&
          e.clientX < right &&
          e.clientY > top &&
          e.clientY < bottom
        ) {
          if (el.classList.contains(dropAreaClass)) return;
          // if mouse is hovring on top/left of the el
          if (e.clientY < centerH || e.clientX < centeV) {
            if (el.classList.contains("dgble-top")) return;

            if (newTopDraggable) {
              newTopDraggable.remove();
              newTopDraggable = null;
              el.classList.remove("dgble-top");
            }

            newTopDraggable = makeDropElement(
              clickedEl,
              draggableElementClassName,
              dropAreaClass
            );

            if (newBottomDraggable) {
              newBottomDraggable.remove();
              newBottomDraggable = null;
            }

            // attach new drop indicator el before hovered el
            attachDropElementToParent(
              parent,
              newTopDraggable,
              el,
              "dgble-top",
              el
            );

            return;
          } else {
            // else mouse is hovring on botton/fight of the el
            if (el.classList.contains("dgble-btm")) return;

            if (newBottomDraggable) {
              newBottomDraggable.remove();
              newBottomDraggable = null;
            }

            el.classList.remove("dgble-btm");

            newBottomDraggable = makeDropElement(
              clickedEl,
              draggableElementClassName,
              dropAreaClass
            );

            if (newTopDraggable) {
              newTopDraggable.remove();
              newTopDraggable = null;
            }
            // attach new drop indicator el after hovered el
            attachDropElementToParent(
              parent,
              newBottomDraggable,
              nextEl,
              "dgble-btm",
              el
            );
            return;
          }
        }
      }
    }
  }
}

module.exports = onMove;
