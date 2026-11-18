// Draws club updates and Coming Up cards from updates-data.js.
// To add or change content, edit updates-data.js, not this file.
//
// A page asks for content with an empty container:
//   <div class="updates-grid" data-updates="all"></div>        every post
//   <div class="updates-grid" data-updates="3"></div>          newest 3 (homepage)
//   <div class="upcoming" data-upcoming></div>                 Coming Up cards
// Each card carries data-club="GBSR|LST|Both" for a club filter later.
(function () {
    var POSTS = window.CLUB_POSTS || [];
    var EVENTS = window.CLUB_EVENTS || [];
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];
    var PHOTOS = '3-MEDIA/1-Photos/';

    function day(s) { var p = s.split('-'); return new Date(+p[0], p[1] - 1, +p[2]); }
    function longDate(s) { var d = day(s); return MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear(); }
    function attr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
    function clubName(c) { return c === 'GBSR' || c === 'LST' ? c : 'GBSR &amp; LST'; }
    function clubTag(c) { return c === 'GBSR' || c === 'LST' ? c : 'Both'; }
    function isExternal(href) { return /^https?:/.test(href); }

    // Newest first; posts on the same date keep their order in the file.
    var sorted = POSTS.map(function (p, i) { return { p: p, i: i }; })
        .sort(function (a, b) { return a.p.date < b.p.date ? 1 : a.p.date > b.p.date ? -1 : a.i - b.i; })
        .map(function (x) { return x.p; });

    // Posts without an id get one from their date (post-2026-02-22, post-2026-02-22-2, ...).
    var used = {};
    sorted.forEach(function (p) { if (p.id) used[p.id] = true; });
    var ids = sorted.map(function (p) {
        if (p.id) return p.id;
        var base = 'post-' + p.date, id = base, n = 2;
        while (used[id]) id = base + '-' + n++;
        used[id] = true;
        return id;
    });

    function photoList(post, home) {
        var list = post.photos || [];
        if (home && post.homePhotos != null) {
            list = typeof post.homePhotos === 'number'
                ? list.slice(0, post.homePhotos)
                : list.filter(function (ph) { return post.homePhotos.indexOf(ph[0]) !== -1; });
        }
        if (!list.length) return '';
        var dir = PHOTOS + post.photoFolder + '/';
        return '<div class="update-images">' + list.map(function (ph) {
            return '<img src="' + attr(dir + 'thumbs/' + ph[0]) + '" data-full="' + attr(dir + ph[0]) +
                   '" alt="' + attr(ph[1] || '') + '" loading="lazy">';
        }).join('') + '</div>';
    }

    function postCard(post, id, home) {
        var useHome = home && post.homeText;
        var collapse = post.collapse && !useHome;
        var bodyId = id + '-text';
        return '<article class="update-card" id="' + attr(id) + '" data-club="' + clubTag(post.club) + '">' +
            '<div class="update-header"><h3 class="update-title">' + post.title + '</h3></div>' +
            '<p class="update-date">&#128197; ' + longDate(post.date) + '</p>' +
            '<div class="update-content' + (collapse ? ' expandable-content collapsed' : '') + '" id="' + attr(bodyId) + '">' +
                (useHome ? post.homeText : post.text) + photoList(post, home) +
            '</div>' +
            (collapse ? '<button type="button" class="expand-button" aria-expanded="false" aria-controls="' +
                        attr(bodyId) + '">Read More</button>' : '') +
            '</article>';
    }

    function setExpanded(card, open) {
        var body = card.querySelector('.expandable-content');
        var btn = card.querySelector('.expand-button');
        if (!body || !btn) return;
        body.classList.toggle('collapsed', !open);
        btn.textContent = open ? 'Read Less' : 'Read More';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function eventCard(ev) {
        var d = day(ev.date);
        var text = ev.text || '';
        if (ev.post) text += ' <a href="club-updates.html#' + attr(ev.post) + '">Read more</a>.';
        var link = '';
        if (ev.link) {
            link = '<p><a href="' + attr(ev.link[0]) + '"' +
                   (isExternal(ev.link[0]) ? ' target="_blank" rel="noopener"' : '') +
                   '><strong>' + ev.link[1] + ' &rarr;</strong></a></p>';
        }
        return '<div class="upcoming-card"' + (ev.id ? ' id="' + attr(ev.id) + '"' : '') +
            ' data-club="' + clubTag(ev.club) + '" data-until="' + attr(ev.until || ev.date) + '">' +
            '<div class="up-date"><span class="up-mon">' + MONTHS[d.getMonth()].slice(0, 3) +
                '</span><span class="up-day">' + d.getDate() + '</span></div>' +
            '<div class="up-body"><h3>' + ev.title + ' &mdash; ' + clubName(ev.club) + '</h3>' +
                (ev.when ? '<p class="up-when">' + ev.when + '</p>' : '') +
                '<p>' + text + '</p>' + link +
            '</div></div>';
    }

    // Club updates
    var onUpdatesPage = /club-updates(\.html)?$/.test(location.pathname);
    document.querySelectorAll('[data-updates]').forEach(function (box) {
        var want = box.getAttribute('data-updates');
        var count = want === 'all' ? sorted.length : parseInt(want, 10) || 3;
        var home = want !== 'all';
        box.innerHTML = sorted.slice(0, count).map(function (p, i) { return postCard(p, ids[i], home); }).join('');
        if (onUpdatesPage) {
            // Links to another post on this page stay on the page.
            box.querySelectorAll('a[href^="club-updates.html#"]').forEach(function (a) {
                a.setAttribute('href', a.getAttribute('href').replace('club-updates.html', ''));
            });
        }
        box.addEventListener('click', function (e) {
            var btn = e.target.closest('.expand-button');
            if (btn) {
                var card = btn.closest('.update-card');
                setExpanded(card, card.querySelector('.expandable-content').classList.contains('collapsed'));
                return;
            }
            var img = e.target.closest('.update-images img');
            if (img) window.open(img.dataset.full, '_blank');
        });
    });

    // Coming Up: cards past their day are left out; an empty section hides.
    var now = new Date();
    document.querySelectorAll('[data-upcoming]').forEach(function (box) {
        var left = EVENTS.filter(function (ev) {
            return new Date(day(ev.until || ev.date).getTime() + 86400000) > now;
        }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
        box.innerHTML = left.map(eventCard).join('');
        var section = box.closest('section, .calendar-section') || box;
        section.hidden = left.length === 0;
    });

    // The page loaded before these cards existed, so jump to #anchor now,
    // opening a collapsed post if that's what the link points to.
    function showHash() {
        var id = decodeURIComponent(location.hash.slice(1));
        var el = id && document.getElementById(id);
        if (!el) return;
        var card = el.closest('.update-card');
        if (card) setExpanded(card, true);
        el.scrollIntoView();
    }
    showHash();
    window.addEventListener('hashchange', showHash);
})();
