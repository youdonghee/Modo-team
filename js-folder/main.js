let timeout;
let min;
let sec;
let interval;
let fast = false;
let isModal=false;

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
        reset(interval,null,null,false)
        randomPrice();

        timer();
      }
    }, time);
  }
}

function timer() {
  if (interval == 1)return;
  if (timeout == null) timeout = 10;
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
function ten() {
  if(fast) return;
  reset(interval,null,10,true)
  setTimer(1000);
}
const play = document.querySelector(".play");
const timeStop = document.querySelector(".stop");
const skip = document.querySelector(".ten");

play.onclick = timer;
timeStop.onclick = stopTimer;
skip.onclick = ten;

// 뉴스
// let target = document.querySelector(".news");
// let player = function player() {
//   target.animate(
//     [
//       {
//         transform : 'translateY(30px)',
//         opacity: '0'
//       },
//       {
//         transform : 'translate(0,0)',
//         opacity: '1'
//       }
//     ], 1000
//   )
// }
// 라운드 5분마다 팝업 1개씩 띄우기
// 팝업은 10초후 사라지기

// 매입 매도
let aa = document.querySelectorAll('.f');
let bb = document.querySelectorAll('.closeBtn')
// console.log(aa); // A f, B f 담기고

let open = function (i) {
  if(isModal){

  }else{
    isModal=true
    let a = document.querySelectorAll(".modal");
    console.log(a);
    a[i].classList.remove("hidden");
  }
}
// 클릭
aa.forEach(function(i,index){
  i.onclick = function(){
    open(index);
  }
})
bb.forEach(function (i,index) {
  i.onclick = function () {
    close(index);
  }
})


let close = function (i) {
  let a = document.querySelectorAll(".modal");
  a[i].classList.add("hidden");
  setTimeout(()=>{
    isModal=false
  },10)
}

// aa.forEach(function(i,index){
//   i.onclick = function(){
//     close(index)
//   }
// })

  
  // document.querySelector(".A").addEventListener("click", open(0));
  // document.querySelector(".B").addEventListener("click", open(i));
  
// document.querySelector(".C").addEventListener("click", open);
// document.querySelector(".D").addEventListener("click", open);
// document.querySelector(".E").addEventListener("click", open);
document.querySelector(".closeBtn").addEventListener("click", close);

// document.querySelector(".bg").addEventListener("click", close);

// 값 보내기
function getvalueInText(i) {
  let inputData = document.getElementsByClassName("data")[i].value;
  let text = document.querySelectorAll(".vol")[i += 1].innerHTML=inputData
}
// let testnum = [];
// testnum.push()