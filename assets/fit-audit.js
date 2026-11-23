/* Magic fit audit: paste into the page (devtools or a browser tool) and call fitAudit().
   Edit ROOTS, SCROLLERS and PAIRS for the page. Returns JSON: overflow, per-container overflow,
   clipped text and overlapping overlays. Everything should be 0 / empty. */
window.fitAudit = (opts = {}) => {
  const ROOTS = opts.roots || ['header', 'main'];
  const SCROLLERS = opts.scrollers || [];            // ids of lists/cards that must not overflow
  const PAIRS = opts.pairs || [];                    // [['#credit', '#scale'], ...] must not overlap
  const SKIP = opts.skip || '[data-fade]';           // faded feeds may clip on purpose
  const masked = e => { for (let a = e; a && a !== document.body; a = a.parentElement) { const cs = getComputedStyle(a); const m = cs.maskImage || cs.webkitMaskImage; if (m && m !== 'none') return true; } return false; };
  const vis = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
  const clips = [];
  for (const sel of ROOTS) {
    document.querySelectorAll(sel).forEach(root => root.querySelectorAll('*').forEach(e => {
      if (!vis(e) || e.closest(SKIP) || masked(e)) return;   // faded feeds (mask-image or [data-fade]) clip on purpose
      if (e.children.length && !e.childNodes[0]?.nodeValue?.trim()) return;
      const t = (e.textContent || '').trim(); if (!t) return;
      const cs = getComputedStyle(e), r = e.getBoundingClientRect();
      if (e.scrollWidth > e.clientWidth + 1 && cs.textOverflow !== 'ellipsis' && cs.overflow !== 'visible') clips.push(['h', t.slice(0, 30)]);
      for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
        const ac = getComputedStyle(a);
        if (ac.overflow !== 'visible' || ac.overflowY !== 'visible') {
          const ar = a.getBoundingClientRect();
          if (r.bottom > ar.bottom + 1 && r.top < ar.bottom) clips.push(['v', t.slice(0, 30), Math.round(r.bottom - ar.bottom)]);
          break;
        }
      }
    }));
  }
  const box = s => document.querySelector(s)?.getBoundingClientRect();
  const hit = (a, b) => { const r = box(a), q = box(b); return r && q && r.width && q.width && r.left < q.right && q.left < r.right && r.top < q.bottom && q.top < r.bottom; };
  const de = document.documentElement;
  return JSON.stringify({
    size: innerWidth + 'x' + innerHeight,
    pageY: de.scrollHeight - innerHeight,
    pageX: de.scrollWidth - innerWidth,
    scrollers: SCROLLERS.map(id => { const e = document.getElementById(id); return id + ':' + (e ? e.scrollHeight - e.clientHeight : 'missing'); }),
    overlaps: PAIRS.filter(p => hit(...p)).map(p => p.join('/')),
    clips: clips.slice(0, 20),
    words: (() => {                                  // noise budget: visible words outside tables, drawers, dialogs
      let n = 0; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) { const t = w.currentNode, p = t.parentElement;
        if (!p || p.closest('table,[role=dialog],script,style,[data-fade]') || !vis(p)) continue;
        n += (t.nodeValue.match(/[A-Za-z]{2,}/g) || []).length; }
      return n; })(),
  });
};
