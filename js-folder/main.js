let timeout;
let min;
let sec;
let interval;
let fast = false;
let isModal=false;
let count=0;
let roundCount = 0;
let body= document.querySelector(".body");
let gamefinish = document.querySelector(".game-finish");
let havingjosik = document.querySelectorAll(".having-josik");
let resultArr=[];
let josikName = ["KI학원","CM건설","JW은행","JY전자","DH통신","소지금"];
let full = document.querySelector(".full");
let fullTop=document.querySelector(".full-top");
let accountArr= [];
let sum=[];
let totalMoney = document.querySelector(".total-money");
let btnstyle = document.querySelector(".btnstyle")
let ment = document.querySelector(".ment");
// window.localStorage.clear();

let w = window.localStorage.getItem("로그인");
let Jsonw = JSON.parse(w);
console.log(Jsonw);


const loadingText = document.getElementById('loading');

let count1 = 0;
const loadingInterval = setInterval(() => {
  if (count1 === 0) {
    loadingText.innerHTML = '보유한 주식과 소지금을 정산중입니다.';
    count1++;
  } else if (count1 === 1) {
    loadingText.innerHTML = '보유한 주식과 소지금을 정산중입니다..';
    count1++;
  } else if(count1===2){
    loadingText.innerHTML = '보유한 주식과 소지금을 정산중입니다...';
    count1++;
  } else if(count1 === 3){
    loadingText.innerHTML = '보유한 주식과 소지금을 정산중입니다....';
    count1=0;
  }
}, 500); 


// 타이머
function reset(clearIntervalValue, interValue, timeoutValue, fastValue) {
  clearInterval(clearIntervalValue);
  interval = interValue;
  timeout = timeoutValue;
  fast = fastValue;


}

function gameFinish(num){
// console.log(num);
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

// console.log(accountArr);

  
  gamefinish.style.display="block";
  body.style.zIndex="1000";
  body.style.backgroundColor= "#0000007d";
  full.style.display ="none";
  fullTop.style.display="none";
  
  if(num==1){
  // console.log(typeof(num));
  ment.innerHTML = "모든 라운드가 진행되어 장이 마감되었습니다.";
  let mentSound = new Audio("../BGM/장마감했습니다.wav");
  mentSound.play();
  }

  if(num==2){
    // console.log(typeof(num));
    ment.innerHTML = "소지금이 모두 소진되어 게임이 종료되었습니다."
  }

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
  // console.log(typeof(accountArr[0]));
  // console.log(typeof(accountArr[5]));

  havingjosik.forEach(function(i,index){
    // console.log(i);
    // console.log(index);
    // console.log(accountArr);
    
    sum.push(resultArr[index]*accountArr[index]);
    console.log(sum[index]);
    setTimeout(() => {

      i.innerHTML =`${josikName[index]} / 현재가 :${resultArr[index]} / 보유 수량 : ${accountArr[index]} / 총 평가금액 : ${sum[index]}`;
    
    if(index==5){
      if(resultArr[index] == null){
        resultArr[index] = 10000;
        i.innerHTML = `${josikName[index]} : ${resultArr[index]}`
      }
      else{
      i.innerHTML = `${josikName[index]} : ${resultArr[index]}`
      }
    }
    loadingText.innerHTML="정산완료!"
    loadingText.style.textAlign="center";
    count1=4;
    
    
    
    totalMoney.innerHTML = `최종 소지금 : ${sum[0]+sum[1]+sum[2]+sum[3]+sum[4]+Number(resultArr[5])}`
    totalMoney.appendChild(btnstyle)
    // ${sum[0]+sum[1]+sum[2]+sum[3]+sum[4]}
  }, 5000);
  })
    
  }
  

function setTimer(time) {
  // let result7 = window.localStorage.getItem("소지금");
  // console.log(result7);
  // console.log(money);
  
  if (!interval) {
    interval = setInterval(() => {
      min = parseInt(timeout / 60);
      sec = timeout % 60;
      document.getElementById("time").innerHTML = `남은 시간 ${min} : ${sec}`
      timeout--;
      if( sec <6){
        createPopup(sec);
      }
      if (timeout < 0) {
        document.getElementById("time").innerHTML = `시간종료`
        reset(interval, null, null, false)
        a();
        count++;
        
        roundCount++;

        if(roundCount==1){ //라운드 설정
          // createPopup(1);
          removePopup()
          document.querySelector(".round").innerHTML = "ROUND OVER";
          stopTimer();
          
          console.log("aa");
          setTimeout(() => {
            console.log("jj");
            return gameFinish(1);
            
          }, 5000);
        }
        else if((money+Mon)==0){
          // createPopup(1);
          removePopup()
          document.querySelector(".round").innerHTML = "ROUND OVER";
          stopTimer();
          setTimeout(() => {
            return gameFinish(2);
          }, 5000);
        }
        else{
        document.querySelector(".round").innerHTML = `ROUND ${(roundCount+1)} / 10 `
        timer();
        }
      }
    }, time);
  }
}

function timer() {
  if (interval == 1) return;
  if (timeout == null) timeout = 120;
  // 주기적으로 팝업 생성
  setInterval(createPopup(),popTime)
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
  reset(interval, null, 5, true)
  setTimer(1000);

  let ten = new Audio("../BGM/장개시10초전.wav");
        ten.play();
}

const play = document.querySelector(".play");
const timeStop = document.querySelector(".stop");
const skip = document.querySelector(".ten");

play.onclick = timer;
// timeStop.onclick = stopTimer;
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
    // console.log(a);
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

document.querySelector(".closeBtn").addEventListener("click", close);

// **추가 된 내용

// 뉴스속보
// 팝업 내용을 담은 배열
const popupContents = [
  "장 시작 1초전",
  "장 시작 2초전",
  "장 시작 3초전",
  "장 시작 4초전",
  "장 시작 5초전"
];

// 팝업 애니메이션 지속시간 
const popupDuration = 900;

// 팝업 반복 시간 (10초) 6분은 (360000)
let popTime = 10000;



function removePopup() {
  setTimeout(() => {
    clearInterval(createPopup())
  }, 1000);
}
// 팝업 생성 함수
function createPopup(sec) {

   // 랜덤으로 팝업 내용 선택
  // const randomIndex = Math.floor(Math.random() * popupContents.length);
  const content = popupContents[sec-1];

  // 팝업 요소 생성
  const popup = document.createElement("div"); //div 만들고
  popup.classList.add("popup"); // 클래스 이름 popup
  popup.textContent = content; // textContent : text 콘텐츠 계속 변경
  
  
  
  // 팝업을 body 요소에 추가
  document.body.appendChild(popup);
  
  // 팝업 애니메이션 시작
  setTimeout(() => {
    popup.classList.add("show");
  });

  // 팝업 삭제
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(popup);
    },100);
  }, popupDuration);
  
}

// // 주기적으로 팝업 생성
// setInterval(createPopup(),popTime)