/* Original geometric avatar illustrations. Seeds choose artwork, never markup. */
(function (root) {
  'use strict';
  var skins = ['#F5C9A6','#E3AE82','#CD9169','#B97A51','#975E3E','#73432E','#533122'];
  var inks = ['#30251E','#473126','#694632','#946948','#27242B','#544034'];
  var backgrounds = ['#F3D486','#D7DFC3','#EDC6B5','#D6DFE5','#E5CEC9','#ECDDC1','#CEDAD2','#F2C99D'];
  var shirts = ['#9D583D','#47685C','#496979','#9B7442','#754F5A','#4D4F38','#B06E43','#70644E'];
  function hash(value) {
    var text = String(value == null ? '' : value), n = 2166136261;
    for (var i=0;i<text.length;i++) { n ^= text.charCodeAt(i); n = Math.imul(n,16777619); }
    return n >>> 0;
  }
  function svg(seed) {
    var state=hash(seed);
    function pick(list) { state=(Math.imul(state,1664525)+1013904223)>>>0; return list[state%list.length]; }
    var skin=pick(skins), hair=pick(inks), bg=pick(backgrounds), shirt=pick(shirts);
    var style=pick([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    var eyes=pick([0,1,2]), accessory=pick([0,1,2,3,4]), smile=pick([0,1,2]);
    var back='',front='';
    switch(style) {
      case 0: front='<path d="M27 43Q24 20 48 19Q72 19 70 44L63 32Q48 41 31 31Z"/>';break;
      case 1: back='<path d="M22 70V39Q22 14 49 14Q74 15 74 40V72L62 67L34 72Z"/>';front='<path d="M27 39Q28 20 49 21Q67 22 69 37Q52 32 48 27Q41 37 27 39Z"/>';break;
      case 2: back='<circle cx="48" cy="19" r="12"/><path d="M24 40Q23 17 48 16Q73 17 72 41Z"/>';front='<path d="M27 38Q46 34 52 25Q60 35 69 39V30H27Z"/>';break;
      case 3: back='<circle cx="28" cy="35" r="12"/><circle cx="35" cy="24" r="12"/><circle cx="49" cy="20" r="13"/><circle cx="62" cy="25" r="12"/><circle cx="70" cy="38" r="10"/>';front='<path d="M28 38Q35 24 46 29Q55 20 68 36L67 26H29Z"/>';break;
      case 4: front='<path d="M27 42V31Q34 15 55 19Q68 21 69 38L61 31L54 35L45 28L36 36Z"/>';break;
      case 5: back='<path d="M24 68V35Q24 15 48 16Q72 16 72 35V68L63 64V37H33V66Z"/>';front='<path d="M27 36V29Q46 15 67 29L69 38L51 34L49 28L44 36Z"/>';break;
      case 6: front='<path d="M27 40Q26 21 48 21Q70 21 69 40Q64 28 48 28Q32 28 27 40Z"/>';break;
      case 7: back='<ellipse cx="48" cy="35" rx="26" ry="23"/>';front='<path d="M26 38Q33 28 48 32Q56 22 69 34L65 23H30Z"/>';break;
      case 8: back='<path d="M23 69L25 35Q23 17 48 18Q73 17 71 36L74 69L64 65L62 35H35L33 67Z"/>';front='<path d="M27 36Q42 15 64 26L69 39Q54 39 48 29Q39 35 27 36Z"/>';break;
      case 9: front='<path d="M27 36Q24 22 39 21L37 15L47 19L53 13L57 21Q71 23 69 40L60 30Q41 34 27 36Z"/>';break;
      case 10: back='<circle cx="22" cy="42" r="11"/><circle cx="74" cy="42" r="11"/>';front='<path d="M27 37Q28 16 49 19Q68 18 69 38L48 29Z"/>';break;
      case 11: front='<path d="M28 35Q35 23 48 25Q64 24 68 36L66 29Q49 17 30 29Z"/>';break;
      case 12: back='<path d="M21 74V39Q20 16 48 15Q76 17 75 42L73 74L64 69L62 34H34L32 70Z"/>';front='<path d="M26 36Q30 19 51 20Q67 21 70 37L55 33L47 25L40 34Z"/>';break;
      case 13: front='<path d="M27 38Q25 22 40 19Q55 11 66 25L70 38Q52 31 47 26Q40 34 27 38Z"/>';break;
      case 14: back='<path d="M25 59Q15 29 32 22Q27 12 39 16Q53 6 60 18Q78 16 76 35L69 62Z"/>';front='<path d="M27 36Q40 21 53 28Q63 24 69 36V23H28Z"/>';break;
      default: front='<path d="M28 35Q30 20 47 20Q65 20 68 35Q50 28 28 35Z"/>';
    }
    var eyeMarkup=eyes===0?'<path d="M35 46h3m20 0h3" stroke-linecap="round"/>':eyes===1?'<path d="M34 47q3-4 6 0m16 0q3-4 6 0" fill="none" stroke-linecap="round"/>':'<circle cx="37" cy="46" r="1.5"/><circle cx="59" cy="46" r="1.5"/>';
    var mouth=smile===0?'<path d="M41 58q7 7 14 0" fill="none" stroke-linecap="round"/>':smile===1?'<path d="M42 59q6 3 12 0" fill="none" stroke-linecap="round"/>':'<path d="M41 57h14q-1 8-7 8t-7-8Z" stroke="none"/><path d="M43 58h10v2H43Z" fill="#FFF2DF" stroke="none"/>';
    var details='';
    if(accessory===0)details='<g fill="none" stroke="#433329" stroke-width="2"><rect x="29" y="41" width="16" height="12" rx="5"/><rect x="51" y="41" width="16" height="12" rx="5"/><path d="M45 45q3-2 6 0M26 43l3 1m38 0 3-1"/></g>';
    if(accessory===1)details='<g fill="none" stroke="#D6A842" stroke-width="2.5"><circle cx="25" cy="55" r="4"/><circle cx="71" cy="55" r="4"/></g>';
    if(accessory===2 && style>10)details='<path d="M23 32Q24 11 48 12Q72 12 73 32Z" fill="'+shirt+'"/><path d="M20 33h56" stroke="'+shirt+'" stroke-width="7" stroke-linecap="round"/>';
    if(accessory===3 && style<5)details='<path d="M35 61Q48 71 61 61L58 67Q48 77 38 67Z" fill="'+hair+'"/>';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" aria-hidden="true" focusable="false" style="display:block;width:100%;height:100%"><rect width="96" height="96" rx="28" fill="'+bg+'"/><g fill="'+hair+'">'+back+'</g><path d="M12 96Q15 75 38 74H58Q81 75 84 96Z" fill="'+shirt+'"/><path d="M39 66h18v12q-9 10-18 0Z" fill="'+skin+'"/><ellipse cx="27" cy="47" rx="5" ry="7" fill="'+skin+'"/><ellipse cx="69" cy="47" rx="5" ry="7" fill="'+skin+'"/><path d="M27 39Q27 24 48 24Q69 24 69 39V49Q68 72 48 74Q28 72 27 49Z" fill="'+skin+'"/><g fill="'+hair+'">'+front+'</g><g fill="#30251E" stroke="#30251E" stroke-width="2">'+eyeMarkup+'<path d="M48 48l-2 6h4" fill="none" stroke-opacity=".35" stroke-linecap="round"/>'+mouth+'</g>'+details+'<path d="M37 78l11 9 11-9" fill="none" stroke="#FFF1DC" stroke-opacity=".5" stroke-width="2"/></svg>';
  }
  root.OysterReviewAvatars = Object.freeze({svg:svg});
})(window);
