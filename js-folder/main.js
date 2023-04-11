let timeout;
let min;
let sec;
let interval;
let fast = false;

function reset(clearIntervalValue, interValue, timeoutValue, fastValue) {
  clearInterval(clearIntervalValue);
  interval = interValue;
  timeout = timeoutValue;
  fast = fastValue;
}

function setTimer(time) {
  if (!interval) {
    interval = setInterval(() => {
      min = parseInt(timeout/60);
      sec = timeout%60;
      document.getElementById("time").innerHTML=`남은 시간 ${min} : ${sec}`
      timeout--;
      if (timeout < 0) {
        document.getElementById("time").innerHTML=`시간종료`
        reset(interval,null,null,false)
      }
    }, time);
  }
}

function timer() {
  if (interval == 1)return;
  if (timeout == null) timeout = 20;
  // timeout = 20; // 5분
  setTimer(1000);
}
function stopTimer() {
  reset(interval,null,timeout,false)
  console.log("멈춰");
}
function restart() {
  setTimer(1000);
  console.log("다시");
}
function fastTime() {
  if(fast) return;
  reset(interval,null,timeout,true)
  setTimer(500);
  console.log("빨리");
}
const play = document.querySelector(".play");
const timeStop = document.querySelector(".stop");
const skip = document.querySelector(".skip");

play.onclick = timer;
timeStop.onclick = stopTimer;
skip.onclick = fastTime;

