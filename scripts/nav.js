// Opens and closes the dropdowns in the main nav (Local Guide, House Manual).
// Hover works on desktop through CSS alone; this adds tap, click, and keyboard support.
(function () {
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  function setOpen(dropdown, open) {
    dropdown.classList.toggle('open', open);
    dropdown.querySelector('.nav-caret').setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function closeAll(except) {
    dropdowns.forEach(function (dropdown) {
      if (dropdown !== except) setOpen(dropdown, false);
    });
  }

  dropdowns.forEach(function (dropdown) {
    var caret = dropdown.querySelector('.nav-caret');

    caret.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !dropdown.classList.contains('open');
      closeAll(dropdown);
      setOpen(dropdown, willOpen);
    });

    // On hover-capable screens the menu follows the pointer, so a click-opened
    // menu shouldn't linger after the pointer leaves.
    dropdown.addEventListener('mouseleave', function () {
      if (window.matchMedia('(hover: hover)').matches) setOpen(dropdown, false);
    });
  });

  document.addEventListener('click', function () {
    closeAll();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.nav-dropdown.open');
    if (!open) return;
    setOpen(open, false);
    open.querySelector('.nav-caret').focus();
  });
})();
