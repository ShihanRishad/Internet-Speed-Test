    var button = document.querySelector(".button");
    var speed = document.querySelectorAll(".speed");
    var container = document.querySelector(".container");
    var progressbarr = document.querySelector("#progressBarContainer");
    var speedspan = document.querySelectorAll(".speedspan");
    
    speedspan.forEach(element => {
    element.style.display = "none";
    });
    
    
   // container.style.height = container.scrollHeight + progressbarr.scrollHeight + 10 + "px";

    speed.forEach(element => {
     element.style.height = element.scrollHeight + 10 + "px";
   });

    
function updateProgressBar(percentage) {
  document.getElementById('progressBar').style.width = percentage + '%';
}

function updateSpeedResults(speedBps, speedKbps, speedMbps) {
  document.getElementById('speedBps').textContent = speedBps + ' bps';
  document.getElementById('speedKbps').textContent = speedKbps + ' kbps';
  document.getElementById('speedMbps').textContent = speedMbps + ' Mbps';
}

function testNetworkSpeed() {
  button.style.display = "none";
  
    speedspan.forEach(element => {
    element.style.display = "flex";
    element.style.animation = "width 0.5s";
    });
  
  var downloadSize = 10174706; // Replace with the size of the image in bytes
  var startTime = (new Date()).getTime();
  var cacheBuster = "?nnn=" + new Date().getTime();
  var xhr = new XMLHttpRequest();

  xhr.open('GET', "https://upload.wikimedia.org/wikipedia/commons/f/ff/Pizigani_1367_Chart_10MB.jpg" + cacheBuster, true);
  xhr.responseType = 'blob';

  xhr.onloadstart = function () {
    updateProgressBar(0); // Reset progress bar at the start of the download
  };

  xhr.onprogress = function (event) {
    if (event.lengthComputable) {
      var percentage = (event.loaded / event.total) * 100;
      updateProgressBar(percentage);

      var currentTime = (new Date()).getTime();
      var duration = (currentTime - startTime) / 1000; // time in seconds
      var bitsLoaded = event.loaded * 8;
      var speedBps = (bitsLoaded / duration).toFixed(2);
      var speedKbps = (speedBps / 1024).toFixed(2);
      var speedMbps = (speedKbps / 1024).toFixed(2);
      updateSpeedResults(speedBps, speedKbps, speedMbps);
    }
  };

  xhr.onload = function () {
    button.style.animation = "slide 0.3s";
    button.style.display = "block";
    button.textContent = "Try again";
    if (xhr.status === 200) {
      // The final calculation can be done here if needed
    } else {
      alert("Error during download. Please try again.");
    }
  };

  xhr.onerror = function () {
    alert("Error during download. Please try again.");
  };

  xhr.send();
};
    
    
function adjustStyle() {
  if (window.innerWidth < 405) {
    document.body.style.fontSize = "100%"; // Replace with the style property and value
    button.style.width = "200px";
  } else {
    document.body.style.fontSize = "120%";
    button.style.width = "300px";
  }
}

// Call the function on initial load and window resize
window.addEventListener("load", adjustStyle);
window.addEventListener("resize", adjustStyle);
    