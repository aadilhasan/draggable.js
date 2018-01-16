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

module.exports = clearTarget;
