/* =====================================================================
   TRAIL STATUS  --  shared by trails.html and the homepage (index.html).

   Normally you don't edit this file: trail status comes from the club's
   trail naming Google Sheet, tab "Website Status" (row 2 NETWORK is the
   network-wide status; trail rows left blank follow it). The values below
   are only the fallback, used when Google can't be reached.

   1. NETWORK_STATUS sets the default for every trail.
   2. TRAIL_STATUS overrides individual trails that differ. Use the id
      shown in grey next to each trail name on the trails page (e.g. 'GB-01').

   status:    'open' | 'closed' | 'caution'
   condition: 'Great' | 'Good' | 'Moderate' | 'Marginal' | '--'
   ===================================================================== */

var LAST_UPDATED = 'October 28, 2026';

var NETWORK_STATUS = {
    status:    'closed',
    condition: '--',
    groomed:   '--',
    comment:   'Closed for the season. See you in December.'
};

var TRAIL_STATUS = {
    // 'GB-01': { status: 'open', condition: 'Good', groomed: 'Jan 26, 2026', comment: 'Groomed overnight' },
    // 'gb-NEAL_MILL_EXTENSION': { status: 'caution', condition: 'Marginal', groomed: 'Jan 20, 2026', comment: 'Thin over the culvert' },
};

/* Live status: the sheet's "Website Status" tab, published to the web as CSV
   (File > Share > Publish to web). Empty string = use only the values above. */
var STATUS_SHEET_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSB6ZPR3sPrj7SHcDFRLi1Rze2erla-HdtP6RCGhDhsVmocU6Ab2hugBCN85a3rt5Jwo4lpuR-h0cL6/pub?gid=777000111&single=true&output=csv';

/* ===================== nothing below here needs editing ============== */

/* The status one trail shows: its own values, or the network's where blank. */
function statusFor(id) {
    var o = TRAIL_STATUS[id] || {};
    return {
        status:    o.status    || NETWORK_STATUS.status,
        condition: o.condition || NETWORK_STATUS.condition,
        groomed:   o.groomed   || NETWORK_STATUS.groomed,
        comment:   (o.comment !== undefined) ? o.comment : NETWORK_STATUS.comment
    };
}

/* Trails whose status differs from the network's, as [{ id, status, comment }]. */
function trailExceptions() {
    return Object.keys(TRAIL_STATUS).filter(function (id) {
        var st = TRAIL_STATUS[id].status;
        return st && st !== NETWORK_STATUS.status;
    }).map(function (id) {
        var s = statusFor(id);
        return { id: id, status: s.status, comment: TRAIL_STATUS[id].comment || '' };
    });
}

function parseCSV(text) {
    var rows = [], row = [], cell = '', q = false;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (q) {
            if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
            else if (ch === '"') { q = false; }
            else { cell += ch; }
        } else if (ch === '"') { q = true; }
        else if (ch === ',') { row.push(cell); cell = ''; }
        else if (ch === '\n' || ch === '\r') {
            if (ch === '\r' && text[i + 1] === '\n') i++;
            row.push(cell); rows.push(row); row = []; cell = '';
        } else { cell += ch; }
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    return rows;
}

/* Replace NETWORK_STATUS / TRAIL_STATUS / LAST_UPDATED with the sheet's rows.
   Returns false (and changes nothing) if the CSV doesn't look like the tab. */
function applySheet(rows) {
    if (!rows.length) return false;
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    var col = function (name) { return head.indexOf(name); };
    var cId = col('trail id'), cSt = col('status'), cCo = col('condition'),
        cGr = col('last groomed'), cCm = col('comments'), cUp = col('updated');
    if (cId < 0 || cSt < 0) return false;
    var valid = { open: 1, caution: 1, closed: 1 };
    var fresh = {};
    rows.slice(1).forEach(function (r) {
        var id = (r[cId] || '').trim();
        if (!id) return;
        var st = (r[cSt] || '').trim().toLowerCase();
        var entry = {
            status:    valid[st] ? st : undefined,
            condition: cCo >= 0 ? (r[cCo] || '').trim() : undefined,
            groomed:   cGr >= 0 ? (r[cGr] || '').trim() : undefined,
            comment:   cCm >= 0 && (r[cCm] || '').trim() ? r[cCm].trim() : undefined
        };
        if (id.toUpperCase() === 'NETWORK') {
            Object.keys(entry).forEach(function (k) { if (entry[k]) NETWORK_STATUS[k] = entry[k]; });
            if (cUp >= 0 && (r[cUp] || '').trim()) LAST_UPDATED = r[cUp].trim();
        } else {
            fresh[id] = entry;
        }
    });
    TRAIL_STATUS = fresh;
    return true;
}

/* Fetch the sheet and call onUpdate() once its values are in place.
   If the fetch fails, the built-in values above stay and onUpdate isn't called. */
function loadTrailStatus(onUpdate) {
    if (!STATUS_SHEET_CSV || !window.fetch) return;
    fetch(STATUS_SHEET_CSV, { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(function (text) { if (applySheet(parseCSV(text)) && onUpdate) onUpdate(); })
        .catch(function () { /* keep the built-in status */ });
}
