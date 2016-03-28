(function() {
  'use strict';

  var allCircles = []
    , canvas = document.getElementById("header-canvas")
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
    , speedFactor = 10;

  function initializeCircleArray() {
    for (var i = 0; i < numCircles ; i++) {
      var color = Math.floor(Math.random() * (colors.length))
        , left = Math.floor(Math.random() * (canvas.width +1))
        , top = Math.floor(Math.random() * (canvas.height + 1))
        , size = Math.floor(Math.random() * (maxCircleSize - minCircleSize + 1)) + minCircleSize
        , leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / speedFactor
        , topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / speedFactor;

      var circle = {
        color: color,
        left: left,
        top: top,
        size: size,
        leftSpeed: leftSpeed,
        topSpeed: topSpeed,
      };

      allCircles.push(circle);
    }
  };

  function moveCircles() {
    for (var h = 0; h < allCircles.length; h++) {
      var currentCircle = allCircles[h];
      context.fillStyle = colors[currentCircle.color-1];
      context.beginPath();

      var dpi = window.devicePixelRatio || 1;
      var zeroBound = currentCircle.size
        , rightBound = (canvas.width / dpi)  - currentCircle.size
        , bottomBound = (canvas.height / dpi)- currentCircle.size;
      if (currentCircle.top > bottomBound || currentCircle.top < zeroBound) {
        currentCircle.topSpeed = -currentCircle.topSpeed;
      }

      if (currentCircle.left > rightBound || currentCircle.left < zeroBound) {
        currentCircle.leftSpeed = -currentCircle.leftSpeed;
      }


      currentCircle.top += currentCircle.topSpeed;
      currentCircle.left += currentCircle.leftSpeed;

      context.arc(
        currentCircle.left,
        currentCircle.top,
        currentCircle.size,
        0,
        2 * Math.PI,
        false
      );
      context.closePath();
      context.fill();
      context.ellipse;
    }
  };

  window.requiresAnimationFrame = (function (callback) {
    return (
      window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  function animate() {
    var canvas = document.getElementById("header-canvas")
      , context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    moveCircles();

    requiresAnimationFrame(function() {
      animate();
    });
  }

  window.onload = function() {
    resizeCanvas(true);
  };

  function resizeCanvas(initialize) {
    var dpi = window.devicePixelRatio || 1
      , headerElement = document.getElementById('front-page-header');

    canvas.width = window.innerWidth * dpi;
    canvas.height = headerElement.clientHeight * dpi;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = headerElement.clientHeight + 'px';
    canvas.getContext('2d').scale(dpi,dpi);

    if(initialize) {
      initializeCircleArray();
    }

    animate();
  }

  window.onresize = function() {
    resizeCanvas(false);
  };
})();
