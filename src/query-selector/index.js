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

module.exports = $;
