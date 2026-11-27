/* Supernova site behaviour. No dependencies.
   1. Nav mega menu  2. Stat tabs  3. Count-up  4. Scroll reveal */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Nav mega menu: hover or tap a nav button to open its panel */
  var root = document.querySelector('[data-menu-root]');
  if (root) {
    var panels = root.querySelectorAll('[data-menu]');
    var btns = root.querySelectorAll('[data-open]');
    var current = '';
    var setMenu = function (name) {
      current = name;
      for (var i = 0; i < panels.length; i++) { panels[i].hidden = panels[i].getAttribute('data-menu') !== name; }
      for (var j = 0; j < btns.length; j++) { btns[j].setAttribute('aria-expanded', btns[j].getAttribute('data-open') === name ? 'true' : 'false'); }
    };
    var openedBy = '';
    for (var b = 0; b < btns.length; b++) {
      (function (btn) {
        var name = btn.getAttribute('data-open');
        btn.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { openedBy = 'hover'; setMenu(name); } });
        btn.addEventListener('click', function () {
          if (current === name && openedBy === 'click') { setMenu(''); } else { openedBy = 'click'; setMenu(name); }
        });
      })(btns[b]);
    }
    root.addEventListener('mouseleave', function () { setMenu(''); });
    var closeMenu = function () {
      var trigger = root.querySelector('[aria-expanded="true"]');
      setMenu('');
      if (trigger) { trigger.focus(); }
    };
    var mobileMenu = root.querySelector('[data-mobile-menu]');
    document.addEventListener('click', function (e) {
      if (current && !root.contains(e.target)) { setMenu(''); }
      if (mobileMenu && mobileMenu.open && !mobileMenu.contains(e.target)) { mobileMenu.open = false; }
    });
    if (mobileMenu) {
      var compactHeader = window.matchMedia('(max-width: 900px)');
      compactHeader.addEventListener('change', function () {
        mobileMenu.open = false;
        setMenu('');
      });
    }
    root.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      if (mobileMenu && mobileMenu.open) {
        mobileMenu.open = false;
        mobileMenu.querySelector('summary').focus();
      } else if (current) {
        closeMenu();
      }
    });
  }

  /* 2. "Proof that this matters" stat tabs (data comes from window.SN_STATS on the page) */
  var statsHost = document.querySelector('[data-stats]');
  var tpl = document.getElementById('sn-stat-card');
  if (statsHost && tpl && window.SN_STATS) {
    var colors = ['#B562C8', '#7FD6B2', '#F0C84B'];
    var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
    var page = 0, timer = null;
    var render = function () {
      var html = '';
      var rows = window.SN_STATS[page];
      for (var i = 0; i < rows.length; i++) {
        var d = rows[i], p = d[1];
        var ring = 'conic-gradient(from 0deg, #F0A07A 0%, #F2C94C ' + (p * 0.4) + '%, #5ED4DE ' + (p * 0.75) + '%, #4DA6F0 ' + p + '%, #2B2B2B ' + p + '% 100%)';
        var card = tpl.innerHTML;
        if (!d[4]) { card = card.replace(/<!--src-->[\s\S]*?<!--\/src-->/, ''); }
        card = card.split('[[ring]]').join(ring).split('[[color]]').join(colors[i % 3]).split('[[num]]').join(esc(d[0]))
          .split('[[label]]').join(esc(d[2])).split('[[src]]').join(esc(d[3] || '')).split('[[url]]').join(esc(d[4] || ''));
        html += card;
      }
      statsHost.innerHTML = html;
      var inds = document.querySelectorAll('[data-stat-ind]');
      for (var k = 0; k < inds.length; k++) { inds[k].hidden = Number(inds[k].getAttribute('data-stat-ind')) !== page; }
    };
    var tabs = document.querySelectorAll('[data-stat]');
    for (var t = 0; t < tabs.length; t++) {
      (function (tab) {
        tab.addEventListener('click', function () { clearInterval(timer); page = Number(tab.getAttribute('data-stat')); render(); });
      })(tabs[t]);
    }
    render();
    if (!reduce) {
      timer = setInterval(function () { page = (page + 1) % window.SN_STATS.length; render(); }, 5000);
    }
  }

  var hasIO = typeof IntersectionObserver !== 'undefined';

  /* Homepage metrics: count up once on entry, preserving the rendered format.
     Keep final values when JS/observers are unavailable or motion is reduced. */
  if (hasIO && !reduce) {
    var metricObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        metricObserver.unobserve(el);
        var finalText = el.textContent;
        var parts = finalText.match(/^(\D*)(\d+)(.*)$/);
        if (!parts) { return; }
        var target = Number(parts[2]);
        var start = performance.now();
        var frame = function (now) {
          var progress = Math.min(1, (now - start) / 3000);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = progress === 1 ? finalText : parts[1] + Math.round(target * eased) + parts[3];
          if (progress < 1) { requestAnimationFrame(frame); }
        };
        el.textContent = parts[1] + '0' + parts[3];
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-stat-count]').forEach(function (el) {
      metricObserver.observe(el);
    });
  }

  /* 3. "240+ more" counts up over six seconds when it scrolls into view */
  var counters = document.querySelectorAll('.sn-count');
  for (var c = 0; c < counters.length; c++) {
    (function (el) {
      var run = function () {
        var t0 = performance.now();
        var tick = function (now) {
          var p = Math.min(1, (now - t0) / 6000);
          el.textContent = Math.round(240 * p) + '+ more';
          if (p < 1) { requestAnimationFrame(tick); }
        };
        requestAnimationFrame(tick);
      };
      if (!hasIO || reduce) { return; }
      var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) { if (entries[i].isIntersecting) { run(); io.disconnect(); } }
      }, { threshold: 0.6 });
      io.observe(el);
    })(counters[c]);
  }

  /* 4. Scroll reveal: blocks fade and rise in once, the first time they enter the viewport */
  if (hasIO && !reduce) {
    var sel = 'section > div > *, article, .sn-tile, .sn-row, .sn-lead figure, .sn-nums > div';
    var skip = '.sn-float, .sn-slide, .sn-pill, .sn-why, .sn-why-i, .sn-burst, [hidden], [hidden] *, header *, footer *, template, [data-stats] *';
    var all = document.querySelectorAll(sel), els = [];
    for (var i = 0; i < all.length; i++) {
      if (all[i].matches(skip)) { continue; }
      if (getComputedStyle(all[i]).position === 'absolute') { continue; }
      els.push(all[i]);
    }
    if (els.length) {
      document.documentElement.classList.add('sn-js');
      var rio = new IntersectionObserver(function (entries) {
        var n = 0;
        for (var j = 0; j < entries.length; j++) {
          if (!entries[j].isIntersecting) { continue; }
          (function (el, d) {
            el.style.transitionDelay = d + 'ms';
            el.classList.add('sn-in');
            rio.unobserve(el);
            setTimeout(function () { el.classList.remove('sn-rv'); el.classList.remove('sn-in'); el.style.transitionDelay = ''; }, 1100 + d);
          })(entries[j].target, Math.min(n, 6) * 80);
          n++;
        }
      }, { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });
      for (var k2 = 0; k2 < els.length; k2++) { els[k2].classList.add('sn-rv'); rio.observe(els[k2]); }
    }
  }
})();
