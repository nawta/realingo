/* Realingo site — language switch + scroll reveal.
   Both language versions live in the DOM (.ja / .en); CSS hides the inactive one,
   so the page is readable before this script runs. */
(function () {
  var KEY = "realingo-lang";
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var title = root.querySelector('meta[name="title-' + lang + '"]');
    if (title) document.title = title.getAttribute("content");
    var desc = document.querySelector('meta[name="desc-' + lang + '"]');
    var meta = document.querySelector('meta[name="description"]');
    if (desc && meta) meta.setAttribute("content", desc.getAttribute("content"));
    var buttons = document.querySelectorAll(".lang-toggle button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", String(buttons[i].dataset.lang === lang));
    }
  }

  // ?lang=ja / ?lang=en wins, so a link can pin the language; then the stored
  // choice, then the browser language.
  var fromUrl = (location.search.match(/[?&]lang=(ja|en)/) || [])[1];
  var initial = fromUrl || stored() ||
    (navigator.language && navigator.language.toLowerCase().indexOf("ja") === 0 ? "ja" : "en");
  apply(initial);

  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest && ev.target.closest(".lang-toggle button");
    if (!btn) return;
    var lang = btn.dataset.lang;
    apply(lang);
    try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode */ }
  });

  // Scroll reveal
  var targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    for (var j = 0; j < targets.length; j++) targets[j].classList.add("shown");
    return;
  }
  var revealed = 0;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("shown");
        revealed++;
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  for (var k = 0; k < targets.length; k++) io.observe(targets[k]);

  // If nothing has been revealed a few seconds in, the observer is not firing
  // in this context. Show everything rather than leave the page looking blank.
  setTimeout(function () {
    if (revealed > 0) return;
    for (var m = 0; m < targets.length; m++) targets[m].classList.add("shown");
  }, 3500);
})();
