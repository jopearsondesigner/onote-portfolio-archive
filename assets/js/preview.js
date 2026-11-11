/* Local preview JS derived from theme/src/js/app.js
 * HubSpot / lead-in / cookie-banner hacks omitted (those widgets are not loaded).
 */
window.onload = function () {
  window.onscroll = function () {
    var top = window.pageXOffset
      ? window.pageXOffset
      : document.documentElement.scrollTop
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
    var head = document.getElementById("themeButton");
    if (!head) return;
    if (top > 16) {
      head.style.position = "fixed";
      head.style.top = "0";
    } else if (head.getAttribute("style")) {
      head.removeAttribute("style");
    }
  };

  var preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.className = "hidden opacity-0";
  }
};
