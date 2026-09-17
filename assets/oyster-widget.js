/* Unified Oyster widget. Public vendor key; no customer context or analytics payloads supplied. */
(function () {
  'use strict';
  if (window.__oysterWebsiteWidget) return;
  window.__oysterWebsiteWidget = true;
  var PUBLIC_KEY = 'pk_live_019cab3e4ca070dc854df2f371f86f7a';
  var BUNDLE = 'https://widget-lib.oysterskin.com/v1/oysterskin-vendor-widget-web.umd.js';
  var instance, loading, launcher, feedback, previousFocus, recoveryTimer;
  function notify(text) { feedback.textContent = text; feedback.hidden = !text; }
  function loadBundle() {
    if (window.OysterskinWidget) return Promise.resolve(window.OysterskinWidget);
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var script = document.createElement('script'), done = false;
      script.src = BUNDLE; script.async = true; script.dataset.oysterWidgetBundle = 'true';
      var timer = setTimeout(function () { finish(new Error('timeout')); }, 15000);
      function finish(error) {
        if (done) return; done = true; clearTimeout(timer);
        if (error) { script.remove(); loading = null; reject(error); }
        else resolve(window.OysterskinWidget);
      }
      script.onload = function () { finish(window.OysterskinWidget ? null : new Error('unavailable')); };
      script.onerror = function () { finish(new Error('unavailable')); };
      document.head.appendChild(script);
    });
    return loading;
  }
  function openWidget(view) {
    clearTimeout(recoveryTimer);
    previousFocus = document.activeElement;
    launcher.disabled = true; launcher.setAttribute('aria-busy','true'); launcher.textContent = 'Opening Oyster…';
    notify('');
    loadBundle().then(function (api) {
      if (!instance) instance = api.createUnifiedWidget({
        publicKey: PUBLIC_KEY, mode: 'float', autoOpen: false,
        displayAutoPopup: false, displayHoverPopup: false,
        callback: function (message) {
          // Deliberately do not log or forward scan, contact, cart or customer data.
          if (!message || typeof message.event !== 'string') return;
          if (message.event === 'closed' || message.event === 'minimized') {
            clearTimeout(recoveryTimer); notify('');
            var focusTarget = previousFocus && !previousFocus.hidden ? previousFocus : document.querySelector('.oysterskin-floating-button');
            if (focusTarget && document.contains(focusTarget)) focusTarget.focus();
          }
          if (message.event === 'checkout') notify('For help completing your order, contact team@oysterskin.com.');
        }
      });
      if (!instance || typeof instance.open !== 'function') throw new Error('unavailable');
      var opened = view === 'scan' && typeof instance.openScan === 'function' ? instance.openScan() : instance.open();
      return Promise.resolve(opened).then(function () {
        launcher.hidden = true;
        // The vendor API does not expose session failures. Offer an escape from a stalled connection.
        clearTimeout(recoveryTimer);
        recoveryTimer = setTimeout(function () {
          notify('Having trouble connecting? ');
          var retry = document.createElement('button'); retry.type = 'button'; retry.textContent = 'Close and retry';
          retry.addEventListener('click', function () { instance.close(); launcher.hidden = false; notify(''); launcher.focus(); });
          feedback.appendChild(retry);
          var dismiss = document.createElement('button'); dismiss.type = 'button'; dismiss.textContent = 'Dismiss'; dismiss.style.marginLeft = '16px'; dismiss.addEventListener('click', function () { notify(''); }); feedback.appendChild(dismiss);
          document.body.appendChild(feedback);
        }, 20000);
      });
    }).catch(function () {
      launcher.hidden = false;
      notify('Oyster could not load. Please try again, or contact team@oysterskin.com.');
    }).finally(function () {
      launcher.disabled = false; launcher.removeAttribute('aria-busy');launcher.textContent = 'Try Oyster';
    });
  }
  function init() {
    launcher = document.createElement('button'); launcher.type='button';launcher.className='oy-widget-launcher';launcher.textContent='Try Oyster';
    launcher.setAttribute('aria-label','Open the Oyster unified widget');launcher.addEventListener('click',function(){openWidget();});
    feedback = document.createElement('div'); feedback.className='oy-widget-feedback';feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');feedback.hidden=true;
    document.body.appendChild(launcher);document.body.appendChild(feedback);
    document.addEventListener('click',function(e){var trigger=e.target.closest('[data-oyster-widget]');if(!trigger)return;e.preventDefault();openWidget(trigger.getAttribute('data-oyster-widget'));});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
