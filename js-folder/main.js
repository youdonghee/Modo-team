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

let playyy = document.querySelector(".playyy");
let pause = document.querySelector(".pause");
let bgm = new Audio("../BGM/bgm.mp3");

playyy.onclick = function(){
  console.log("클릭됨")
  bgm.play();
}
pause.onclick = function(){
  console.log("클릭됨")
  bgm.pause();
}
//새로고침 막기
function NotReload(){
  if( (event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) || (event.keyCode == 116) ) {
      event.keyCode = 0;
      event.cancelBubble = true;
      event.returnValue = false;
  } 
}
document.onkeydown = NotReload;

// let mentSound = new Audio("../BGM/장마감했습니다.wav");
//   mentSound.play();
//   mentSound.loop = true;




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
console.log(min);
console.log(sec);

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

        if(roundCount==3){ //라운드 설정
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

const play = document.querySelector(".play");
const timeStop = document.querySelector(".stop");
const skip = document.querySelector(".ten");

function timer() {

  

  play.classList.add("toggle");
  skip.classList.remove("toggle");
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
  reset(interval, null, 10, true)
  setTimer(1000);

  let ten = new Audio("../BGM/장개시10초전.wav");
        ten.play();
}



play.onclick = function(){
  
    bgm.play();
    bgm.volume=0.2;
    bgm.loop = true;
  timer();
}
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

    if(min==undefined && sec==undefined){
      console.log("게임시작 눌러");
      alert("게임 시작을 버튼을 눌러야 매수,매도가 가능합니다!");
      return;
    }
    console.log(min);
    console.log(sec);
    
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


let logout = document.querySelector(".logout");


logout.onclick = function(){
    window.localStorage.removeItem("로그인");
    location.href= "../login/login_A.html"
}

//------------------------------------------------------------------------------

let popupCookie = getCookie("event-popup");
let waringClose = document.querySelector(".waring-close");
let waring = document.querySelector(".waring");

function popupOpen(){
  
  if(waring.classList.contains("off")){
      
      waring.classList.remove('off');
  }else{
    waring.classList.add('off');
  }
}

waringClose.onclick = function(){
  
  popupOpen();
  setCookie("event-popup",true,3600);

}

function setCookie(c_name,value,time){ // event-popup, true, 10초 이렇게 들어옴
  let date = new Date(); // date에 현재시간 설정하고
  date.setTime(date.getTime() + time * 1000); // 현재시간을 가져와서 10초를 더한걸 다시 date 에 셋한다.
   
  let str = c_name+"="+value+";expires="+date.toUTCString()+";path=/"; //  10초를 더해서 셋된 시간
  console.log("split전"+str);
  let str2 = getCookieTime(str);

  console.log("만료시간"+getCookieTime(str));
  document.cookie = c_name+"="+`{"value" : "${value}", "time" : "${date.toUTCString()}"}`+";expires="+date.toUTCString()+";path=/"

  let value2 = getCookie("event-popup");
  console.log(JSON.parse(value2));
}

//위에 documnet.cookie로 작성해서 cookie에 담긴 쿠키 문자열을  매개변수로 가져온다.
function getCookieTime(cookie){  // 이과정을 하는 이유?

  let str = cookie.split(';');
  
  let str2 = str.find(function(i){
      console.log(i);
      let temp = i.trim();
      return temp.startsWith('expires=');
  })
  console.log(str2);

  if(str2){
      let str3 = str2.trim();
      console.log(str3);

      return new Date(str3);
  }else{
      return null;
  }
}

console.log(typeof getCookie("event-popup"))

if(popupCookie == undefined)
{
    popupOpen();
}

function getCookie(c_name)
{
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0;i<ARRcookies.length;i++)
   {
     x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
     y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
     x=x.replace(/^\s+|\s+$/g,"");
     if (x==c_name)
     {
       return unescape(y);
     }
   }
}

let setTime = setInterval(() => {
  let date2 = new Date(); //현재시간
  
  let timeTag = document.querySelector('.popup-time');

  if(popupCookie != undefined)
  {
      let time = JSON.parse(popupCookie).time; 
      let date = new Date(time);
      console.log("경고문 다시 열리기까지 남은시간"+times(popupTime(date, date2)));
  }else{

  }
}, 1000);

function popupTime(date1,date2) {
  return date1.getTime() - date2.getTime();
}

function times(time){
  let day = Math.floor(time / (24 * 60 * 60 * 1000));

  time %= (24 * 60 * 60 *1000);
  let hour = Math.floor(time / (60 * 60 * 1000));
  
  time %= (60 * 60 * 1000);
  let min = Math.floor(time /(60 * 1000));

  time %= (60 * 1000)

  let sec = Math.floor(time / 1000);

  return `${day}일 ${hour}시 ${min}분 ${sec}초`;
}
