var audio = document.getElementById("timerAudio");

function openNav() {
  document.getElementById("mySidenav").style.width = "400px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const pom = {
  feedback: document.getElementById("timerfeedback"),
  buttons: {
    start: document.getElementById("timerStart"),
    stop: document.getElementById("timerStop")
  }
},
timer = {
  interval: "",
  count: ""
};

document.addEventListener("click", e => {
  if(e.target.id === "timerStart") startPomo();
  if(e.target.id === "timerStop") stopPomo();
  if(e.target.id === "timerReset") resetPomo();
  if(e.target.id === "shuffleBtnTropical") forestVid();
  if(e.target.id === "shuffleBtnMountain") mountainVid();
  if(e.target.id === "shuffleBtnSnow") snowVid();
  if(e.target.id === "shuffleBtnCoffee") coffeeVid();
  if(e.target.id === "shuffleBtnStars") starsVid();
  if(e.target.id === "shuffleBtnLaptop") laptopVid();
  if(e.target.id === "shuffleBtnBrain") studyVid();
  if(e.target.id === "shuffleBtnWalk") walkVid();
  if(e.target.id === "shuffleBtnLib") libVid();
})

document.getElementById('timerfeedback').innerHTML =
  25 + ":" + 0 + 0;

const reset = pom.feedback.innerHTML;
function resetPomo(){
  document.getElementById('timerfeedback').innerHTML =
  25 + ":" + 0 + 0;
}

function startPomo() {
  var currentTime = document.getElementById('timerfeedback').innerHTML;
  var timeArray = currentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1]-1));
  if(s==59){m = m-1};
  if(m<0){alert('timer completed')}
  pom.buttons.start.disabled = true;
  pom.buttons.stop.disabled = false;

  pom.feedback.textContent = m + ":" + s;
  console.log(m);

  timer.interval = setTimeout(startPomo, 1000);
}

function checkSecond(sec){
  if(sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

function stopPomo() {
  clearInterval(timer.interval);
  pom.feedback.textContent = `${pom.feedback.textContent}`;
  pom.buttons.stop.disabled = true;
  pom.buttons.start.disabled = false;
}

// embedded videos
var vid = document.getElementById("myVid");

function forestVid() {
  vid.src = "https://www.youtube.com/embed/oSmUI3m2kLk?autoplay=1&mute=1&loop=1"
}
function mountainVid() {
  vid.src = "https://www.youtube-nocookie.com/embed/xiBZKJkeC_k?autoplay=1&mute=1&loop=1";
}
function snowVid() {
  vid.src = "https://www.youtube-nocookie.com/embed/vz91QpgUjFc?autoplay=1&mute=1&loop=1";
}
function coffeeVid() {
  vid.src = "https://www.youtube-nocookie.com/embed/VMAPTo7RVCo?autoplay=1&mute=1&loop=1";
}
function starsVid() {
  vid.src = "https://www.youtube-nocookie.com/embed/4oY3v0jAWr4?autoplay=1&mute=1&loop=1";
}
function laptopVid() {
  vid.src = "https://www.youtube-nocookie.com/embed/GmA_Ry5yLaE?autoplay=1&mute=1&loop=1";
}
function studyVid() {
  vid.src = "https://www.youtube-nocookie.com/embed/Jvgx5HHJ0qw?autoplay=1&mute=1&loop=1";
}
function walkVid() {
  vid.src = "https://www.youtube-nocookie.com/embed/q1m27R0tAKM?autoplay=1&mute=1&loop=1";
}
function libVid() {
  vid.src = "https://www.youtube.com/embed/757G_El3ABI?autoplay=1&mute=1&loop=1";
}

