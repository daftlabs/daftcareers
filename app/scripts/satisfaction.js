window.addEventListener("DOMContentLoaded", function() {
    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
}
    }, false); 

document.onload function() {
    var satisfaction = getQueryVariable("satisfaction");
    var origin = getQueryVariable("origin");
    getElementById("result").value = satisfaction;
    getElementById("origin").value = origin;
    getElementById("satisfaction").submit();
}
