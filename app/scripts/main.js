// This makes some dots and moves those dots.

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
    , minCircleSize = 0.5
    , maxCircleSize = 2
    , numCircles = 100
    , minSpeed = -0.5
    , maxSpeed = 0.5
    , expandState = true;

    function buildCircleArray() {
      for (var i = 0; i < numCircles ; i++) {
        var color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1,
          left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
          top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
          size = Math.floor(Math.random() * (maxCircleSize - minCircleSize + 1)) + minCircleSize,
          leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
          topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
          expandState = expandState;

        while(leftSpeed == 0 || topSpeed == 0){
          leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
          topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10;
        }

        var circle = {
          color:color,
          left:left,
          top:top, size:size,
          leftSpeed:leftSpeed,
          topSpeed:topSpeed,
          expandState:expandState
        };

        circles.push(circle);
      }
    };

    function buildCircles() {
      for (var h = 0; h < circles.length; h++) {
        var currentCircle = circles[h];
        context.fillStyle = colors[currentCircle.color-1];
        context.beginPath();
        if(currentCircle.left > canvas.width + currentCircle.size) {
          currentCircle.left = 0 - currentCircle.size;
          context.arc(currentCircle.left, currentCircle.top, currentCircle.size, 0, 2 * Math.PI, false);
        } else if(currentCircle.left < 0 - currentCircle.size){
          currentCircle.left = canvas.width + currentCircle.size;
          context.arc(currentCircle.left, currentCircle.top, currentCircle.size, 0, 2 * Math.PI, false);
        } else{
          currentCircle.left = currentCircle.left + currentCircle.leftSpeed;
          context.arc(currentCircle.left, currentCircle.top, currentCircle.size, 0, 2 * Math.PI, false);
        }

        if(currentCircle.top > canvas.height + currentCircle.size) {
          currentCircle.top = 0 - currentCircle.size;
          context.arc(currentCircle.left, currentCircle.top, currentCircle.size, 0, 2 * Math.PI, false);
        } else if(currentCircle.top < 0 - currentCircle.size) {
          currentCircle.top = canvas.height + currentCircle.size;
          context.arc(currentCircle.left, currentCircle.top, currentCircle.size, 0, 2 * Math.PI, false);
        } else {
          currentCircle.top = currentCircle.top + currentCircle.topSpeed;
          if(currentCircle.size != maxCircleSize && currentCircle.size != minCircleSize && currentCircle.expandState == false){
            currentCircle.size = currentCircle.size - 0.1;
          }
          else if(currentCircle.size != maxCircleSize && currentCircle.size != minCircleSize && currentCircle.expandState == true){
            currentCircle.size = currentCircle.size + 0.1;
          }
          else if(currentCircle.size == maxCircleSize && currentCircle.expandState == true){
            currentCircle.expandState = false;
            currentCircle.size = currentCircle.size - 0.1;
          }
          else if(currentCircle.size == minCircleSize && currentCircle.expandState == false){
            currentCircle.expandState = true;
            currentCircle.size = currentCircle.size + 0.1;
          }
          context.arc(currentCircle.left, currentCircle.top, currentCircle.size, 0, 2 * Math.PI, false);
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
        buildCircleArray();
      }

      animate();
    }

    window.onresize = function () {
      resizeCanvas(false);
    };
})();
