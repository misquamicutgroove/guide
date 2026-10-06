// Opens and closes the Local Guide dropdown in the main nav.
// Hover works on desktop through CSS alone; this adds tap, click, and keyboard support.
(function () {
  var dropdown = document.querySelector('.nav-dropdown');
  if (!dropdown) return;
  var caret = dropdown.querySelector('.nav-caret');

  function setOpen(open) {
    dropdown.classList.toggle('open', open);
    caret.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  caret.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!dropdown.classList.contains('open'));
  });
  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dropdown.classList.contains('open')) {
      setOpen(false);
      caret.focus();
    }
  });
})();
