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

module.exports = addHandler;
