(function(window) {
  let mouseDown = false;
  let clickedEl, parent, parentCords, elementsOldIndex, elementsNewIndex;
  let allDraggable,
    handler = function() {};
  let newTopDraggable, newBottomDraggable;
  let draggableElementClassName = "_draggable",
    containerClassName = "_draggable-container",
    addDraggableClass = "_add-here",
    dragging = "_dragging";

  /**
   * take query and find element using it
   *
   * @param {string} query
   *
   * @return {DOM-node}
   */
  let $ = function(query) {
    return document.querySelectorAll(query);
  };

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

  // initial style for element being dragged
  let dragingStyle = {
    position: "absolute",
    top: 0
  };

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

  /*
   *
   *clear temp classes after element has been droped
   *
   */
  function clearTarget() {
    $("." + dragging)[0].remove();
    let dt = $(".dgble-top"),
      db = $(".dgble-btm");

    if (dt) {
      dt.forEach(el => {
        el.classList.remove("dgble-top");
      });
    }

    if (db) {
      db.forEach(el => {
        el.classList.remove("dgble-btm");
      });
    }
  }

  /**
   *
   *make dragged element style and classes as it was initialy
   *
   */
  function clearDragElment() {
    let elDragging = $("." + dragging)[0];
    if (!elDragging) return;
    elDragging = $("." + dragging)[0].cloneNode(true);
    elDragging.classList.remove(dragging);
    elDragging.style.position = "relative";
    elDragging.style.top = "auto";
    elDragging.style.left = "auto";
    return elDragging;
  }

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

  /**
   * find el's index in the all drabble elements
   *
   * @param {DOM-node} el
   *
   * @return {object}
   */

  function getIndexs(el) {
    let allDraggable = $("." + draggableElementClassName);
    let index = null,
      newIndexes = {};
    for (let i = 0; i < allDraggable.length; i++) {
      if (el.isEqualNode(allDraggable[i])) {
        index = i;
      }
      newIndexes[allDraggable[i].getAttribute("d-index")] = i;
    }
    return {
      elementIndex: index,
      allIndexs: newIndexes
    };
  }

  /**
   * event listener function on mouse down
   *
   * @param {event} e
   *
   */

  function onDown(e) {
    let isDraggable = checkElementHasParent(
      e.target,
      draggableElementClassName,
      containerClassName
    );
    /**
     *
     * if target el is not draggable( target el or its parent elements don't have draggable class) then return.
     *
     */
    if (!isDraggable) return;
    clickedEl = isDraggable;
    /**
     *
     * get el's current index
     *
     */

    let obj = getIndexs(clickedEl);
    elementsOldIndex = obj.elementIndex;

    /**
     *
     * set parent el
     *
     */
    parent = clickedEl.parentNode;
    /**
     *
     * get current cordinates of parent el
     *
     */
    parentCords = parent.getBoundingClientRect();
    parent.style.height = parentCords.height;
    mouseDown = true;

    /**
     *
     * add dragging class to click el so it can be tracked and dragged
     *
     */
    clickedEl.classList.add(dragging);
    clickedEl.style.position = "relative";
  }

  /**
   * event listener function on mouse up
   *
   * @param {event} e
   *
   */

  function onUp(e) {
    /**
     *
     * if there is not el in which mouse was clicked/down the return
     *
     */
    if (!clickedEl) return;
    mouseDown = false;

    /**
     * if dragged element is not being hovered on any sibling element then reset dragging elements style to default
     *
     */
    if (!newTopDraggable && !newBottomDraggable) {
      clearDragElment();
      let draggingNode = $("." + dragging)[0];
      if (!draggingNode) return;
      draggingNode.classList.remove(dragging);
      draggingNode.style.position = "relative";
      draggingNode.style.top = "auto";
      draggingNode.style.left = "auto";
      return;
    }
    /**
     *
     * check if dragging el is hovering on left/top or right/bottom of a sibling
     * and add the temp add here element to the hovered element
     *
     */
    let draggingNode;
    if (newTopDraggable) {
      /**
       * add file before the hovered el
       *
       */
      draggingNode = clearDragElment();
      newTopDraggable.replaceWith(draggingNode);
      newTopDraggable.remove();
      newTopDraggable = null;
    } else if (newBottomDraggable) {
      /**
       * add file after the hovered el
       *
       */
      draggingNode = clearDragElment();
      newBottomDraggable.replaceWith(draggingNode);
      newBottomDraggable.remove();
      newBottomDraggable = null;
    }
    clearTarget();
    /**
     * get new index of the dragged el
     *
     */
    let obj = getIndexs(draggingNode);
    elementsNewIndex = obj.elementIndex;
    let newIndexes = obj.allIndexs;

    handler(draggingNode, newIndexes, elementsNewIndex, elementsOldIndex); //call handler
    clickedEl.classList.remove(dragging);
    elementsNewIndex = elementsOldIndex = null;
  }

  /**
   * convert sting in a number
   *
   * @param {string} px
   *
   * @return {number}
   */

  function int(px) {
    return parseInt(px);
  }

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

  /**
   * create a new drop/add-here element to indicatet the the drop location
   *
   * @param {DOM-node} el
   *
   * @return {DOM-node}
   */

  function makeDropElement(el) {
    let dropEl = document.createElement("div");
    let clickedElCords = getComputedStyle(clickedEl, null);
    dropEl.style.height = clickedElCords.height;
    dropEl.style.width = clickedElCords.width;
    let animator = document.createElement("div");
    dropEl.classList.add(draggableElementClassName);
    dropEl.classList.add(addDraggableClass);
    animator.classList.add("_animate_drop");
    dropEl.appendChild(animator);
    return dropEl;
  }

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
    } catch (e) {}
  }

  let counter = 0;

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
            if (el.classList.contains(addDraggableClass)) return;
            // if mouse is hovring on top/left of the el
            if (e.clientY < centerH || e.clientX < centeV) {
              if (el.classList.contains("dgble-top")) return;

              if (newTopDraggable) {
                newTopDraggable.remove();
                newTopDraggable = null;
                el.classList.remove("dgble-top");
              }

              newTopDraggable = makeDropElement();

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

              newBottomDraggable = makeDropElement();

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

  /**
   * make child children of given el draggable
   *
   * @param {string} className
   *
   */

  function makeDraggable(identifier, notDraggable) {
    parent = $(identifier)[0];
    addClass(parent, containerClassName);
    let skip = false;
    if (
      notDraggable &&
      (Array.isArray(notDraggable) || typeof notDraggable !== "object")
    ) {
      console.warn(
        `second argument must be an object, eg: "{identifier: 'className/Index' , type: 'class/index'}"`
      );
    } else if (typeof notDraggable == "object") {
      if (
        notDraggable.identifier == undefined ||
        notDraggable.identifier == null
      ) {
        console.warn(`Second argument must have a "identifier" key`);
      } else if (notDraggable.type == undefined || notDraggable.type == null) {
        console.warn(`Second argument must have a "type" key`);
      } else {
        skip = true;
      }
    }

    let children = parent.children,
      len = children.length,
      i = 0;
    // add class to all children
    for (i; i < len; i++) {
      if (skip) {
        if (
          (notDraggable.type == "class" &&
            !children[i].classList.contains(notDraggable.identifier)) ||
          notDraggable.identifier != i
        ) {
          addClass(children[i], draggableElementClassName);
          children[i].setAttribute("d-index", i);
        }
      } else {
        addClass(children[i], draggableElementClassName);
        children[i].setAttribute("d-index", i);
      }
    }

    allDraggable = children;
    parentCords = parent.getBoundingClientRect();

    // add event listeners to the parent el and body
    parent.addEventListener("mousedown", onDown);
    document.querySelector("body").addEventListener("mouseup", onUp);
    parent.addEventListener("mousemove", onMove);
    console.log(" ========= draggable init ============");
  }

  /**
   * add callback function to handler, every callback handler gets 4 params
   * 1. dragged element
   * 2. object (key = newIndex, value = oldIndex)
   * 3. dragged element's new index
   * 4. dragged element's old index
   *
   * @param {function} db
   *
   */

  function addHandler(cb) {
    handler = cb;
  }

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

  // expose functions to the users by adding them in the window
  window.draggable = {
    makeDraggable: makeDraggable,
    addHandler: addHandler,
    destroy: destroy
  };
})(window);
