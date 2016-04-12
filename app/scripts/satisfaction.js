window.onload = function () {
  var satisfaction = getQueryVariable('satisfaction');
  var origin = getQueryVariable('origin');
  document.getElementById('result').value = satisfaction;
  document.getElementById('origin').value = origin;
  document.getElementById('ip').value = myip;
  document.getElementById('satisfaction').submit();
}
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
