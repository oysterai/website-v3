(function(){
 'use strict';
 var burger=document.getElementById('navBurger'),menu=document.getElementById('navMob');
 if(burger&&menu){
  // Derive the phone menu from this page's desktop links so routes stay relative.
  var groups=[];
  document.querySelectorAll('.nav-menu .nav-item').forEach(function(item,index){
   var heading=item.querySelector(':scope > button'),columns=item.querySelectorAll('.mega .mcol');
   if(!heading||!columns.length)return;
   var group=document.createElement('section');group.className='nav-mob-group';
   var toggle=document.createElement('button');toggle.type='button';toggle.className='nav-mob-group-toggle';
   toggle.id='mobile-group-toggle-'+index;toggle.setAttribute('aria-expanded','false');
   toggle.appendChild(document.createTextNode(heading.textContent.trim()));
   var chevron=document.createElement('span');chevron.className='nav-mob-chevron';chevron.setAttribute('aria-hidden','true');toggle.appendChild(chevron);
   var panel=document.createElement('div');panel.className='nav-mob-group-panel';panel.id='mobile-group-panel-'+index;
   panel.setAttribute('aria-labelledby',toggle.id);panel.setAttribute('aria-hidden','true');panel.inert=true;
   toggle.setAttribute('aria-controls',panel.id);
   var inner=document.createElement('div');inner.className='nav-mob-group-inner';
   columns.forEach(function(column){
    var label=column.querySelector('h5');
    if(label){var sub=document.createElement('div');sub.className='nav-mob-subheading';sub.textContent=label.textContent;inner.appendChild(sub);}
    column.querySelectorAll('a').forEach(function(source){
     var link=source.cloneNode(true);link.querySelectorAll('.mico,.dot,img,svg').forEach(function(icon){icon.remove();});
     link.textContent=link.textContent.trim();link.removeAttribute('id');inner.appendChild(link);
    });
   });
   panel.appendChild(inner);group.appendChild(toggle);group.appendChild(panel);
   function expand(open){group.classList.toggle('expanded',open);toggle.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));panel.inert=!open;}
   toggle.addEventListener('click',function(){var open=!group.classList.contains('expanded');groups.forEach(function(entry){entry.expand(false);});expand(open);});
   group.addEventListener('keydown',function(e){if(e.key==='Escape'&&group.classList.contains('expanded')){e.preventDefault();e.stopPropagation();expand(false);toggle.focus();}});
   groups.push({element:group,expand:expand});
  });
  if(groups.length){
   var actions=document.createElement('div');actions.className='nav-mob-actions';
   Array.from(menu.children).forEach(function(child){if(child.matches('.btn,.aud-switch'))actions.appendChild(child);else child.remove();});
   groups.forEach(function(entry){menu.appendChild(entry.element);});menu.appendChild(actions);
  }
  burger.setAttribute('aria-controls',menu.id);
  function setMenu(open,restore){
   menu.classList.toggle('open',open);burger.classList.toggle('open',open);
   burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Close menu':'Open menu');
   menu.setAttribute('aria-hidden',String(!open));menu.inert=!open;
   if(restore)burger.focus();
  }
  setMenu(false);
  // Own this click so earlier inline handlers cannot toggle the drawer twice.
  burger.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();setMenu(!menu.classList.contains('open'));},true);
  menu.addEventListener('click',function(e){if(e.target.closest('a,.aud-switch'))setMenu(false);});
  document.addEventListener('click',function(e){if(!menu.contains(e.target)&&!burger.contains(e.target))setMenu(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('open'))setMenu(false,true);});
  matchMedia('(max-width:1080px)').addEventListener('change',function(){setMenu(false);});
 }
 document.querySelectorAll('.nav-item').forEach(function(item,index){
  var button=item.querySelector(':scope > button'),panel=item.querySelector('.mega');
  if(!button||!panel)return;
  if(!panel.id)panel.id='nav-panel-'+index;
  button.setAttribute('aria-controls',panel.id);
  function sync(){var open=!item.classList.contains('nav-dismissed')&&(item.matches(':hover')||item.contains(document.activeElement));button.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));}
  function reveal(){item.classList.remove('nav-dismissed');sync();}
  item.addEventListener('mouseenter',reveal);item.addEventListener('mouseleave',sync);
  item.addEventListener('focusin',reveal);item.addEventListener('focusout',function(){setTimeout(sync,0);});
  button.addEventListener('click',reveal);
  item.addEventListener('keydown',function(e){if(e.key==='Escape'){button.focus();item.classList.add('nav-dismissed');sync();e.preventDefault();}else if(e.key==='ArrowDown'&&e.target===button){reveal();var first=panel.querySelector('a,button');if(first)first.focus();e.preventDefault();}});
  sync();
 });
})();
