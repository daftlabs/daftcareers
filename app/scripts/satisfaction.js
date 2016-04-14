jQuery(document).ready(function($) {
  var satisfaction = getQueryVariable('satisfaction');
  var origin = getQueryVariable('origin');
  document.getElementById('result').value = satisfaction;
  document.getElementById('origin').value = origin;
  document.getElementById('ip').value = myip;
});
$( window ).load(function() {
  var formData = $('form').serialize();
  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxtl0qaUunta4r6QaqSNrQookBQ6SuGN2h8VzPvn8MzK_MDDJkw/exec',
    data: formData,
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
  });
});
function getQueryVariable(variable) {
  var vars = window.location.search.substring(1).split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if(pair[0] === variable) {
      return pair[1];
    }
  }
  return null;
}
