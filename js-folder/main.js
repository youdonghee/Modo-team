let timeout;
let min;
let sec;
let interval;
let fast = false;
let isModal=false;
let count=0;
let roundCount = 1;
let body= document.querySelector(".body");
let gamefinish = document.querySelector(".game-finish");
let havingjosik = document.querySelectorAll(".having-josik");
let resultArr=[];
let josikName = ["KI학원","CM건설","JW은행","JY전자","DH통신","소지금"];
let full = document.querySelector(".full");
let accountArr= [];

window.localStorage.clear();
// console.log(result2);

// console.log(result3);

// console.log(result4);

// console.log(result5);

// console.log(result6);




// 타이머
function reset(clearIntervalValue, interValue, timeoutValue, fastValue) {
  clearInterval(clearIntervalValue);
  interval = interValue;
  timeout = timeoutValue;
  fast = fastValue;


}

function gameFinish(){

let result1 = window.localStorage.getItem("KI학원");
let result2 = window.localStorage.getItem("CM건설");
let result3 = window.localStorage.getItem("JW은행");
let result4 = window.localStorage.getItem("JY전자");
let result5 = window.localStorage.getItem("DH통신");
let result6 = window.localStorage.getItem("소지금");

let account1 = window.localStorage.getItem("수량");
let account2 = window.localStorage.getItem("수량1");
let account3 = window.localStorage.getItem("수량2");
let account4 = window.localStorage.getItem("수량3");
let account5 = window.localStorage.getItem("수량4");

console.log(accountArr);

  stopTimer();
  gamefinish.style.display="block";
  body.style.zIndex="1000";
  body.style.backgroundColor= "#0000007d";
  full.style.display ="none";

  resultArr.push(result1);
  resultArr.push(result2);
  resultArr.push(result3);
  resultArr.push(result4);
  resultArr.push(result5);
  resultArr.push(result6);

  accountArr.push(Number(account1));
  accountArr.push(Number(account2));
  accountArr.push(Number(account3));
  accountArr.push(Number(account4));
  accountArr.push(Number(account5));
  accountArr.push(1);
  console.log(typeof(accountArr[0]));
  console.log(typeof(accountArr[5]));

  havingjosik.forEach(function(i,index){
    console.log(i);
    console.log(index);
    console.log(accountArr);

    i.innerHTML =`${josikName[index]}  현재가 :${resultArr[index]} 보유 수량 : ${accountArr[index]} 총 평가금액 : ${resultArr[index]*accountArr[index]}`;
    
    if(index==5){
      i.innerHTML = `${josikName[index]} : ${resultArr[index]}`
    }
  })

  }



function setTimer(time) {
  if (!interval) {
    interval = setInterval(() => {
      min = parseInt(timeout / 60);
      sec = timeout % 60;
      document.getElementById("time").innerHTML = `남은 시간 ${min} : ${sec}`
      timeout--;
      if (timeout < 0) {
        document.getElementById("time").innerHTML = `시간종료`
        reset(interval, null, null, false)
        a();
        count++;
        
        roundCount++

        if(roundCount==2){
          return gameFinish();
        }
        document.querySelector(".round").innerHTML = `ROUND ${roundCount} `
        timer();
        
      }
    }, time);
  }
}

function timer() {
  if (interval == 1) return;
  if (timeout == null) timeout = 10;
  setTimer(1000);
}
function stopTimer() {
  reset(interval, null, timeout, false)
  console.log("멈춰");
}
// function restart() {
//   setTimer(1000);
//   console.log("다시");
// }
function ten() {
  if (fast) return;
  reset(interval, null, 10, true)
  setTimer(1000);
}
const play = document.querySelector(".play");
const timeStop = document.querySelector(".stop");
const skip = document.querySelector(".ten");

play.onclick = timer;
timeStop.onclick = stopTimer;
skip.onclick = ten;

// 뉴스
// 라운드 5분마다 팝업 1개씩 띄우기
// 팝업은 10초후 사라지기



// 매입 매도
let aa = document.querySelectorAll('.f');
let bb = document.querySelectorAll('.closeBtn')
// console.log(aa); // A f, B f 담기고

let open = function (i) {
  if (isModal) {

  } else {
    isModal = true
    let a = document.querySelectorAll(".modal");
    console.log(a);
    a[i].classList.remove("hidden");
  }
}
// 클릭

aa.forEach(function (i, index) {
  
  i.onclick = function () {
    open(index);
    
  }
})

bb.forEach(function (i, index) {
  i.onclick = function () {
    close(index);
  }
})


let close = function (i) {
  let a = document.querySelectorAll(".modal");
  a[i].classList.add("hidden");
  setTimeout(() => {
    isModal = false
  }, 10)
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

// **추가 된 내용

// 뉴스속보
// 팝업 내용을 담은 배열
const popupContents = [
  "Level 1 cleared!",
  "You have a new message!",
  "Game over! Try again?",
  "You found a hidden treasure!"
];

// 팝업 애니메이션 지속시간 
const popupDuration = 5000;

// 팝업 반복 시간 (10초) 6분은 (360000)
let popTime = 10000;

// 팝업 생성 함수
function createPopup() {
  // 랜덤으로 팝업 내용 선택
  const randomIndex = Math.floor(Math.random() * popupContents.length);
  const content = popupContents[randomIndex];

  // 팝업 요소 생성
  const popup = document.createElement("div"); //div 만들고
  popup.classList.add("popup"); // 클래스 이름 popup
  popup.textContent = content; // textContent : text 콘텐츠 계속 변경

  // 팝업을 body 요소에 추가
  document.body.appendChild(popup);

  // 팝업 애니메이션 시작
  setTimeout(() => {
    popup.classList.add("show");
  }, 100);

  // 팝업 삭제
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 1000);
  }, popupDuration);
}

// 주기적으로 팝업 생성
setInterval(createPopup, popTime);
