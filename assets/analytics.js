/* Consent UI and safe events. The single standard Google tag is initialized in the document head. */
(function () {
  'use strict';
  var ID = 'G-XW0CJEEMNS', KEY = 'oyster.analytics.consent.v1';
  var host = location.hostname.toLowerCase();
  var production = host === 'oysterskin.com' || host === 'www.oysterskin.com' || host === 'app.oysterskin.com';
  var local = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  if (!production && !local) return;
  var consumer = host === 'app.oysterskin.com' || /^\/consumer(?:\/|$)/.test(location.pathname);
  var choice = null, viewed = false, banner, settings, previousFocus;
  var staticTitle = document.title;
  var knownPaths = ["/","/about/","/ai-skin-analysis-for-dark-skin/","/analytics/","/blog/","/blog/agentic-commerce-in-beauty/","/blog/aha-bha-guide/","/blog/ai-skin-analysis-vs-in-store-consultant/","/blog/ai-skin-analysis-vs-skincare-quiz/","/blog/best-ai-skin-analysis-for-dark-skin/","/blog/best-skin-analysis-app-for-retailers/","/blog/best-skin-analysis-for-clinics/","/blog/best-skin-analysis-for-pharmacies/","/blog/best-skin-analysis-technology/","/blog/best-white-label-skin-analysis/","/blog/building-a-skincare-brand-in-africa/","/blog/ceramides-guide/","/blog/choosing-skin-analysis-technology/","/blog/data-privacy-in-skin-analysis/","/blog/fitzpatrick-scale-explained/","/blog/future-of-beauty-retail-ai/","/blog/growth-factors-peptides-nick-enslin/","/blog/how-accurate-is-ai-skin-analysis-on-dark-skin/","/blog/how-aesthetic-clinics-book-more-consultations/","/blog/how-ai-skin-analysis-increases-sales/","/blog/how-ai-skin-analysis-works/","/blog/how-beauty-retailers-personalize-at-scale/","/blog/how-brands-substantiate-claims/","/blog/how-brands-win-shelf-space-in-pharmacies/","/blog/how-pharmacies-can-sell-more-skincare/","/blog/how-skin-scanning-works-in-retail/","/blog/how-to-benchmark-beauty-retail-conversion/","/blog/how-to-build-a-data-driven-beauty-business/","/blog/how-to-build-trust-in-skincare-recommendations/","/blog/how-to-capture-first-party-skin-data/","/blog/how-to-choose-skincare-products/","/blog/how-to-convert-skincare-samples-into-sales/","/blog/how-to-cross-sell-in-beauty-retail/","/blog/how-to-cut-skincare-sampling-waste/","/blog/how-to-evaluate-skin-analysis-accuracy/","/blog/how-to-forecast-skincare-inventory/","/blog/how-to-grow-a-beauty-brand-with-skin-data/","/blog/how-to-grow-basket-size-in-beauty-retail/","/blog/how-to-improve-beauty-customer-retention/","/blog/how-to-improve-consultation-conversion-clinics/","/blog/how-to-increase-average-order-value-beauty/","/blog/how-to-increase-clinic-treatment-bookings/","/blog/how-to-increase-repeat-purchase-skincare/","/blog/how-to-increase-skincare-conversion-rates/","/blog/how-to-launch-a-skincare-loyalty-program/","/blog/how-to-lower-customer-acquisition-cost-beauty/","/blog/how-to-measure-skincare-recommendation-accuracy/","/blog/how-to-personalize-skincare-email-marketing/","/blog/how-to-read-skin-intelligence-reports/","/blog/how-to-reduce-cart-abandonment-in-beauty/","/blog/how-to-reduce-refunds-for-online-beauty/","/blog/how-to-reduce-skincare-consultation-time/","/blog/how-to-reduce-skincare-returns/","/blog/how-to-retain-skincare-subscribers/","/blog/how-to-run-a-skin-analysis-event-in-store/","/blog/how-to-scale-skincare-advice-without-dermatologists/","/blog/how-to-segment-beauty-customers-by-skin/","/blog/how-to-sell-skincare-on-whatsapp/","/blog/how-to-take-a-skin-scan/","/blog/how-to-treat-melasma-on-dark-skin/","/blog/how-to-turn-browsers-into-buyers-beauty/","/blog/how-to-upsell-skincare-ethically/","/blog/how-to-use-skin-data-for-merchandising/","/blog/how-to-win-repeat-customers-for-pharmacies/","/blog/hyperpigmentation-on-dark-skin/","/blog/in-store-vs-online-skin-analysis/","/blog/introducing-oyster-mcp/","/blog/niacinamide-guide/","/blog/oyster-index-issue-01/","/blog/oyster-vs-haut-ai/","/blog/oyster-vs-meitu/","/blog/oyster-vs-orbo-ai/","/blog/oyster-vs-perfect-corp/","/blog/oyster-vs-revieve/","/blog/personalization-in-beauty-commerce/","/blog/reducing-decision-fatigue-in-skincare/","/blog/retinol-guide/","/blog/roi-of-ai-skin-analysis/","/blog/skin-analysis-api-comparison/","/blog/skin-analysis-for-teledermatology/","/blog/skin-barrier-explained/","/blog/skincare-routine-for-acne-prone-skin/","/blog/skincare-routine-for-combination-skin/","/blog/skincare-routine-for-dry-skin/","/blog/skincare-routine-for-oily-skin/","/blog/skincare-routine-for-sensitive-skin/","/blog/spf-for-dark-skin/","/blog/the-cost-of-skin-tone-bias-in-retail/","/blog/top-aesthetic-clinics-egypt/","/blog/top-aesthetic-clinics-ghana/","/blog/top-aesthetic-clinics-kenya/","/blog/top-aesthetic-clinics-morocco/","/blog/top-aesthetic-clinics-nigeria/","/blog/top-aesthetic-clinics-rwanda/","/blog/top-aesthetic-clinics-saudi-arabia/","/blog/top-aesthetic-clinics-south-africa/","/blog/top-aesthetic-clinics-uae/","/blog/top-aesthetic-clinics-uk/","/blog/top-aesthetic-clinics-usa/","/blog/top-aestheticians-egypt/","/blog/top-aestheticians-ghana/","/blog/top-aestheticians-kenya/","/blog/top-aestheticians-morocco/","/blog/top-aestheticians-nigeria/","/blog/top-aestheticians-saudi-arabia/","/blog/top-aestheticians-south-africa/","/blog/top-aestheticians-uae/","/blog/top-aestheticians-uk/","/blog/top-aestheticians-usa/","/blog/top-affordable-skincare-brands-nigeria/","/blog/top-affordable-skincare-brands-south-africa/","/blog/top-beauty-retailers-egypt/","/blog/top-beauty-retailers-ghana/","/blog/top-beauty-retailers-kenya/","/blog/top-beauty-retailers-morocco/","/blog/top-beauty-retailers-nigeria/","/blog/top-beauty-retailers-rwanda/","/blog/top-beauty-retailers-saudi-arabia/","/blog/top-beauty-retailers-south-africa/","/blog/top-beauty-retailers-uae/","/blog/top-beauty-retailers-uk/","/blog/top-beauty-retailers-usa/","/blog/top-clean-skincare-brands-south-africa/","/blog/top-dermatologist-recommended-skincare-brands/","/blog/top-homegrown-african-skincare-brands/","/blog/top-korean-skincare-brands-africa/","/blog/top-luxury-skincare-brands-uae/","/blog/top-mens-skincare-brands-nigeria/","/blog/top-natural-skincare-brands-nigeria/","/blog/top-pharmacy-skincare-brands-nigeria/","/blog/top-skincare-brands-acne/","/blog/top-skincare-brands-dark-skin/","/blog/top-skincare-brands-egypt/","/blog/top-skincare-brands-ghana/","/blog/top-skincare-brands-hyperpigmentation/","/blog/top-skincare-brands-kenya/","/blog/top-skincare-brands-morocco/","/blog/top-skincare-brands-nigeria/","/blog/top-skincare-brands-oily-skin/","/blog/top-skincare-brands-rwanda/","/blog/top-skincare-brands-saudi-arabia/","/blog/top-skincare-brands-sensitive-skin/","/blog/top-skincare-brands-south-africa/","/blog/top-skincare-brands-south-korea/","/blog/top-skincare-brands-uae/","/blog/top-skincare-brands-uk/","/blog/top-skincare-brands-usa/","/blog/virtual-skin-analysis-tools-compared/","/blog/vitamin-c-guide/","/blog/what-is-a-skin-aware-crm/","/blog/what-is-ai-skin-analysis/","/blog/what-is-the-melanin-moat/","/blog/whatsapp-commerce-for-beauty/","/blog/why-beauty-shoppers-abandon-carts/","/blog/why-skincare-quizzes-underperform/","/book-demo/","/brands/","/careers/","/clinic-os/","/clinics/","/connect-to-ai-assistants/","/contact/","/customers/","/customers/25pskyn/","/customers/delborough/","/customers/fundamentals/","/customers/maxcare/","/customers/paystack/","/customers/tulip/","/docs/","/dpa/","/magento-skin-analysis/","/oyster-pay/","/pearl/","/pharmacy/","/pricing/","/privacy/","/product-journey/","/recommendations/","/research-projects/","/research/","/restock/","/retail-os/","/shopify-skin-analysis/","/skin-analysis-platforms-compared/","/skin-analysis/","/skin-concerns/","/solutions-data-overview/","/terms/","/trust/","/woocommerce-skin-analysis/"];
  var events = ['demo_cta_click', 'calendar_open', 'pricing_enquiry', 'job_application_click', 'consumer_site_click', 'newsletter_email_request'];
  function command() { if (typeof window.gtag === 'function') window.gtag.apply(window, arguments); }
  function consent(granted) {
    return { analytics_storage: granted ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  }
  window['ga-disable-' + ID] = true;
  function readChoice() {
    try { var v = localStorage.getItem(KEY); return v === 'accepted' || v === 'rejected' ? v : null; } catch (_) { return null; }
  }
  function safePage() {
    if (consumer) { var route = location.hash.replace(/^#\//, '').split('#')[0]; var routes = ['home','about','technology','journal','privacy','terms','ai-policy']; return 'https://app.oysterskin.com/' + (routes.indexOf(route) >= 0 && route !== 'home' ? '#/' + route : ''); }
    var pathname = location.pathname.replace(/index\.html$/, '');
    if (pathname.slice(-1) !== '/') pathname += '/';
    /* Only existing published static routes; no unknown identifiers or queries. */
    if (knownPaths.indexOf(pathname) < 0) pathname = '/';
    return 'https://oysterskin.com' + pathname;
  }
  function clearCookies() {
    var names = document.cookie.split(';').map(function (v) { return v.split('=')[0].trim(); }).filter(function (n) { return /^_ga(?:_|$)/.test(n) || /^_gid$|^_gat(?:_|$)/.test(n); });
    var domains = ['', host, '.' + host, 'oysterskin.com', '.oysterskin.com'];
    var paths = ['/'], parts = location.pathname.split('/').filter(Boolean), path = '';
    parts.forEach(function (part) { path += '/' + part; paths.push(path, path + '/'); });
    names.forEach(function (name) { domains.forEach(function (domain) { paths.forEach(function (p) {
      document.cookie = name + '=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=' + p + (domain ? '; domain=' + domain : '') + '; SameSite=Lax';
    }); }); });
  }
  function emit(name) {
    if (choice !== 'accepted' || events.indexOf(name) < 0) return;
    command('event', name, { send_to: ID, page_location: safePage(), page_title: staticTitle, transport_type: 'beacon' });
  }
  function activate() {
    window['ga-disable-' + ID] = !production;
    command('consent', 'update', consent(true));
    if (!viewed) {
      viewed = true;
      command('event', 'page_view', { send_to: ID, page_location: safePage(), page_title: staticTitle, page_referrer: '' });
    }
  }
  function apply(value) {
    choice = value;
    if (value === 'accepted') activate();
    else {
      window['ga-disable-' + ID] = true;
      command('consent', 'update', consent(false)); clearCookies();
    }
    if (banner) banner.hidden = value !== null;
    if (settings) settings.setAttribute('aria-expanded', value === null ? 'true' : 'false');
  }
  function choose(value) {
    try { localStorage.setItem(KEY, value); } catch (_) {}
    apply(value);
    if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    else if (settings) settings.focus();
  }
  function openSettings() {
    previousFocus = document.activeElement;
    banner.hidden = false; settings.setAttribute('aria-expanded', 'true');
    banner.querySelector('button').focus();
  }
  function init() {
    banner = document.createElement('section'); banner.id = 'oy-analytics-consent';
    banner.className = 'oy-analytics-consent'; banner.setAttribute('aria-labelledby', 'oy-analytics-heading');
    banner.innerHTML = '<div><h2 id="oy-analytics-heading">Help us improve Oyster.</h2><p>Allow Google Analytics to help us understand how this website is used. Optional analytics stay off until you accept. You can change this anytime.</p>' + (local ? '<p class="oy-analytics-local">Local preview: choices update a test queue. Analytics events are not transmitted.</p>' : '') + '</div><div class="oy-analytics-actions"><button type="button" data-oy-consent="accepted">Accept analytics</button><button type="button" data-oy-consent="rejected">Reject analytics</button></div>';
    document.body.appendChild(banner);
    settings = document.createElement('button'); settings.type = 'button'; settings.className = 'oy-analytics-settings';
    settings.textContent = 'Analytics preferences'; settings.setAttribute('aria-controls', banner.id); settings.setAttribute('aria-expanded', 'false');
    (document.querySelector('.mfoot-bottom') || document.querySelector('footer') || document.body).appendChild(settings);
    settings.addEventListener('click', openSettings);
    banner.addEventListener('click', function (e) { var b = e.target.closest('[data-oy-consent]'); if (b) choose(b.getAttribute('data-oy-consent')); });
    banner.addEventListener('keydown', function (e) { if (e.key === 'Escape' && choice !== null) { banner.hidden = true; settings.setAttribute('aria-expanded', 'false'); settings.focus(); } });
    apply(readChoice());
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a,button'); if (!a) return;
      var explicit = a.getAttribute('data-analytics-event');
      if (explicit && events.indexOf(explicit) >= 0) { emit(explicit); return; }
      if (a.matches('.aud-switch')) { emit('consumer_site_click'); return; }
      var raw = a.getAttribute('href'); if (!raw) return;
      var url; try { url = new URL(raw, location.href); } catch (_) { return; }
      if (url.protocol === 'mailto:') { if (a.closest('.career-description')) emit('job_application_click'); return; }
      if (url.protocol !== 'https:' && url.protocol !== 'http:') return;
      if (url.hostname === 'app.oysterskin.com') emit('consumer_site_click');
      else if (url.hostname === 'calendar.google.com' || /^(?:www\.)?calendly\.com$/.test(url.hostname)) emit('calendar_open');
      else if ((url.hostname === host || /^(?:www\.)?oysterskin\.com$/.test(url.hostname)) && /^\/book-demo\/?$/.test(url.pathname)) emit('demo_cta_click');
      else if (/^\/pricing\/?$/.test(location.pathname) && /^\/contact\/?$/.test(url.pathname)) emit('pricing_enquiry');
    });
    document.addEventListener('submit', function (e) { if (e.target.matches('form[data-email-request]') && e.target.checkValidity()) emit('newsletter_email_request'); });
  }
  window.addEventListener('hashchange', function () { if (consumer && choice === 'accepted') { var next = safePage(); if (next !== lastConsumerPage) { viewed = false; lastConsumerPage = next; activate(); } } });
  var lastConsumerPage = safePage();
  window.addEventListener('storage', function (e) { if (e.key === KEY || e.key === null) apply(readChoice()); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
