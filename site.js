// Menu behaviour shared by every page except landing.html.
// The hamburger calls toggleMenu(); menu links call closeMenu().

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
}

function closeMenu() {
    document.getElementById('navLinks').classList.remove('active');
    document.querySelector('.hamburger').classList.remove('active');
}

(function () {
    var nav = document.getElementById('navLinks');
    if (!nav) return;

    // Desktop opens menus on hover (CSS). Touch screens have no hover, so
    // below 900px the trigger toggles its own submenu instead.
    function touchLayout() { return window.matchMedia('(max-width: 900px)').matches; }
    function closeAll() {
        nav.querySelectorAll('.nav-item.open').forEach(function (o) {
            o.classList.remove('open');
            o.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
        });
    }
    nav.querySelectorAll('.nav-trigger').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if (!touchLayout()) return;
            e.preventDefault();
            var item = btn.closest('.nav-item');
            var wasOpen = item.classList.contains('open');
            closeAll();
            if (!wasOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeAll(); closeMenu(); }
    });

    // Tapping anywhere outside the menu closes it.
    document.addEventListener('click', function (e) {
        var bar = document.querySelector('nav');
        if (bar && !bar.contains(e.target) && nav.classList.contains('active')) closeMenu();
    });
})();
