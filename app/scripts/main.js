(function() {
  'use strict';

  var circles = []
    , canvas = document.getElementById("headerCanvas")
    , context = canvas.getContext("2d")
    , opacity = 1
    , colors = [
        'rgba(255, 255, 255,' + opacity + ')',
        'rgba(200, 200, 200,' + opacity + ')',
        'rgba(100, 100, 100,' + opacity + ')'
      ]
    , minSize = 0.5
    , maxSize = 2
    , numCircles = 100
    , minSpeed = -0.5
    , maxSpeed = 0.5
    , expandState = true;

    function buildArray() {
      for (var i =0; i < numCircles ; i++){
        var color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1,
          left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
          top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
          size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
          leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
          topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
          expandState = expandState;

        while(leftSpeed == 0 || topSpeed == 0){
          leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
          topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10;
        }

        var circle = {color:color, left:left, top:top, size:size, leftSpeed:leftSpeed, topSpeed:topSpeed, expandState:expandState };
        circles.push(circle);
      }
    };

    function build(){
      for(var h = 0; h < circles.length; h++){
        var curCircle = circles[h];
        context.fillStyle = colors[curCircle.color-1];
        context.beginPath();
        if(curCircle.left > canvas.width+curCircle.size){
          curCircle.left = 0-curCircle.size;
          context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else if(curCircle.left < 0-curCircle.size){
          curCircle.left = canvas.width+curCircle.size;
          context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else{
          curCircle.left = curCircle.left+curCircle.leftSpeed;
          context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }

        if(curCircle.top > canvas.height+curCircle.size){
          curCircle.top = 0-curCircle.size;
          context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else if(curCircle.top < 0-curCircle.size){
          curCircle.top = canvas.height+curCircle.size;
          context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else{
          curCircle.top = curCircle.top+curCircle.topSpeed;
          if(curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == false){
            curCircle.size = curCircle.size-0.1;
          }
          else if(curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == true){
            curCircle.size = curCircle.size+0.1;
          }
          else if(curCircle.size == maxSize && curCircle.expandState == true){
            curCircle.expandState = false;
            curCircle.size = curCircle.size-0.1;
          }
          else if(curCircle.size == minSize && curCircle.expandState == false){
            curCircle.expandState = true;
            curCircle.size = curCircle.size+0.1;
          }
          context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }

        context.closePath();
        context.fill();
        context.ellipse;
      }
    };

    var xVal = 0;

    window.requestAnimFrame = (function (callback) {
      return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
          window.setTimeout(callback, 1000/60);
      };
    })();

    function animate() {
      var canvas = document.getElementById("headerCanvas"),
          context = canvas.getContext("2d");

      context.clearRect(0, 0, canvas.width, canvas.height);

      xVal++;
      build();

      requestAnimFrame(function () {
          animate();
      });
    }

    window.onload = function () {
      resizeCanvas(true);
    };

    function resizeCanvas(build) {
      var dpi = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpi;
      canvas.height = document.getElementById('frontPageHeader').clientHeight * dpi;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = document.getElementById('frontPageHeader').clientHeight + 'px';
      canvas.getContext('2d').scale(dpi,dpi);

      if(build) {
        buildArray();
      }

      animate();
    }

    window.onresize = function () {
      resizeCanvas(false);
    };
})();
