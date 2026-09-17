/* Manual email requests until an approved mailing-list provider is connected. */
document.querySelectorAll('form[data-email-request]').forEach(function(form){
 form.addEventListener('submit',function(event){
  event.preventDefault();if(!form.reportValidity())return;
  var email=form.querySelector('input[type="email"]').value.trim();
  var url='mailto:team@oysterskin.com?subject='+encodeURIComponent('Oyster Index updates request')+'&body='+encodeURIComponent('Hello Oyster,\n\nPlease send me monthly Oyster Index updates at '+email+'.\nThank you.');
  var note=form.querySelector('small');note.textContent='Send the draft to request updates. If your email app did not open, email team@oysterskin.com. You have not been subscribed automatically.';
  window.location.href=url;
 });
});
