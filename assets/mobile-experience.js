/* Supplemental mobile motion. No scroll interception or continuous render loop. */
(function () {
  'use strict';
  var viewport = matchMedia('(max-width:900px)');
  var reduced = matchMedia('(prefers-reduced-motion:reduce)');
  var dispose = function () {};
  function setup() {
    dispose();
    if (!viewport.matches || !('IntersectionObserver' in window)) return;
    var root = document.documentElement, observers = [], frame = 0;
    var reveals = [], depths = [], loops = [], activeDepth = new Set();
    var framesLeft = 0;
    var motion = !reduced.matches;
    var stackCards = Array.from(document.querySelectorAll('.feat-stack > .feat'));
    var stackFrame = 0, stackObserver;
    function measureStack() {
      stackFrame = 0;
      var nav = document.getElementById('nav');
      var navBottom = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 76;
      var vh = window.visualViewport ? window.visualViewport.height : innerHeight;
      stackCards.forEach(function (card, index) {
        // Tall cards scroll fully into view before pinning at their lower edge.
        // Short cards tuck below the nav. Six-pixel steps keep the layered edge.
        var top = Math.min(navBottom + 12 + index*6,
          vh - card.offsetHeight - 24 - (stackCards.length-1-index)*6);
        card.style.setProperty('--oy-stack-top', Math.round(top)+'px');
      });
    }
    function scheduleStack() {
      if (!stackFrame) stackFrame = requestAnimationFrame(measureStack);
    }
    if (motion && stackCards.length) {
      measureStack();
      if ('ResizeObserver' in window) {
        stackObserver = new ResizeObserver(scheduleStack);
        stackCards.forEach(function (card) {stackObserver.observe(card);});
        var navForStack = document.getElementById('nav');
        if (navForStack) stackObserver.observe(navForStack);
      }
      addEventListener('resize',scheduleStack,{passive:true});
      if (window.visualViewport) window.visualViewport.addEventListener('resize',scheduleStack,{passive:true});
    }
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('oy-mobile-seen');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold:0, rootMargin:'0px 0px -5% 0px'});
    observers.push(revealObserver);
    if (motion) document.querySelectorAll('.rv').forEach(function (el) {
      // Avoid nested reveals: one entrance per visual group.
      if (el.matches('.feat-stack,.feat') || el.querySelector('.feat-stack') || el.parentElement.closest('.rv')) return;
      var rect = el.getBoundingClientRect();
      el.classList.add('oy-mobile-reveal');
      el.style.setProperty('--oy-mobile-delay', el.classList.contains('rv-d2') ? '100ms' : el.classList.contains('rv-d1') ? '50ms' : '0ms');
      reveals.push(el);
      if (rect.bottom < 0) el.classList.add('oy-mobile-seen');
      else revealObserver.observe(el);
    });
    function tick(now) {
      frame = 0;
      if (document.hidden || !motion) return;
      var vh = innerHeight;
      activeDepth.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        // At most 16px total travel; separate translate never overwrites card transforms.
        var target = Math.max(-8, Math.min(8, ((rect.top + rect.height/2 - vh/2) / vh) * -16));
        var current = Number(el.dataset.oyMobileY || 0);
        current += (target-current) * .22;
        el.dataset.oyMobileY = current.toFixed(3);
        el.style.setProperty('--oy-mobile-y', current.toFixed(2)+'px');
      });
      // A bounded ease-out settles the last scroll movement, then the loop stops.
      if (--framesLeft > 0) frame = requestAnimationFrame(tick);
      else activeDepth.forEach(function (el) { el.style.removeProperty('will-change'); });
    }
    function schedule() {
      if (!motion || document.hidden || !activeDepth.size) return;
      framesLeft = 18;
      activeDepth.forEach(function (el) { el.style.willChange = 'translate'; });
      if (!frame) frame = requestAnimationFrame(tick);
    }
    var depthObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activeDepth.add(entry.target);
        else { activeDepth.delete(entry.target); entry.target.style.removeProperty('will-change'); }
      });
      schedule();
    }, {threshold:0});
    observers.push(depthObserver);
    if (motion) document.querySelectorAll('.feat-shot,.tab-visual,.sefeat .fvis').forEach(function (el) {
      if (el.closest('[data-par]')) return;
      depths.push(el); el.classList.add('oy-mobile-depth'); depthObserver.observe(el);
    });
    var loopObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { entry.target.classList.toggle('oy-mobile-paused', !entry.isIntersecting); });
    }, {rootMargin:'80px'});
    observers.push(loopObserver);
    document.querySelectorAll('.foot-belt,.tb-sec,.feat-shot,.stage-holder,.facepanel').forEach(function (el) {
      loops.push(el); loopObserver.observe(el);
    });
    function visibility() {
      root.classList.toggle('oy-mobile-hidden', document.hidden);
      if (document.hidden) { cancelAnimationFrame(frame); frame=0; }
      else schedule();
    }
    function tabFocus(event) {
      var tab = event.target.closest('.tabs-row .tab');
      if (!tab) return;
      var row=tab.parentElement, tr=tab.getBoundingClientRect(), rr=row.getBoundingClientRect();
      if (tr.left<rr.left || tr.right>rr.right) row.scrollTo({left:row.scrollLeft+tr.left-rr.left-(rr.width-tr.width)/2,behavior:motion?'smooth':'auto'});
    }
    addEventListener('scroll',schedule,{passive:true});
    addEventListener('resize',schedule,{passive:true});
    document.addEventListener('visibilitychange',visibility);
    document.addEventListener('focusin',tabFocus);
    document.addEventListener('click',tabFocus);
    dispose = function () {
      observers.forEach(function (o) {o.disconnect();}); cancelAnimationFrame(frame);
      cancelAnimationFrame(stackFrame);
      if (stackObserver) stackObserver.disconnect();
      removeEventListener('resize',scheduleStack);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize',scheduleStack);
      stackCards.forEach(function (card) {card.style.removeProperty('--oy-stack-top');});
      removeEventListener('scroll',schedule); removeEventListener('resize',schedule);
      document.removeEventListener('visibilitychange',visibility); document.removeEventListener('focusin',tabFocus);document.removeEventListener('click',tabFocus);
      reveals.forEach(function (el) {el.classList.remove('oy-mobile-reveal','oy-mobile-seen');el.style.removeProperty('--oy-mobile-delay');});
      depths.forEach(function (el) {el.classList.remove('oy-mobile-depth');el.style.removeProperty('--oy-mobile-y');el.style.removeProperty('will-change');delete el.dataset.oyMobileY;});
      loops.forEach(function (el) {el.classList.remove('oy-mobile-paused');});root.classList.remove('oy-mobile-hidden');
    };
    visibility();
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup,{once:true}); else setup();
  viewport.addEventListener('change',setup);reduced.addEventListener('change',setup);
})();
