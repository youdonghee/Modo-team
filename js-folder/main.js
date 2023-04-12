let timeout;
let min;
let sec;
let interval;
let fast = false;

// 타이머
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
        reset(interval,null,null,false);
        randomPrice();

        timer();
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
// function restart() {
//   setTimer(1000);
//   console.log("다시");
// }
function test1() {
  if(fast) return;
  reset(interval,null,10,true)
  setTimer(1000);
  console.log("rr");
}
// function fastTime() {
//   if(fast) return;
//   reset(interval,null,timeout,true)
//   setTimer(500);
//   console.log("빨리");
// }
const play = document.querySelector(".play");
const timeStop = document.querySelector(".stop");
// const skip = document.querySelector(".skip");
const skip = document.querySelector(".test");

play.onclick = timer;
timeStop.onclick = stopTimer;
// skip.onclick = fastTime;
skip.onclick = test1;

// 뉴스
let showNews = document.querySelector(".news")
let goNews
goNews = function(){
  showNews.classList.add("Show");
  setTimeout(() => {
    showNews.classList.remove("Show");
  }, 5000);
}
goNews();

