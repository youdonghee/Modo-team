// document.querySelector(".textBtn").onclick = function () {
//   window.location.href = "./board_item.html";
// };

let userData = '[{"key" : "value"}]';
userData = window.localStorage.getItem("로그인");
console.log(userData);

let signUp = document.querySelector(".signUp");
let boardText = document.querySelector(".board-text");
let content = document.querySelector(".content");
let submit = document.querySelector(".submit");
let list1 = document.querySelector(".list1");
let written = document.querySelector(".written");
let backbtn = document.querySelector(".back-btn");

signUp.onclick = function(){
    written.style.display= "none";
    boardText.style.display  = "none";
    content.style.display = "block";

}

submit.onclick = function(){
    written.style.display= "none";
    boardText.style.display  = "block";
    content.style.display = "none";
}

list1.onclick=function(){
    content.style.display = "none";
    boardText.style.display="none";
    written.style.display= "block";
}

backbtn.onclick = function(){
    written.style.display= "none";
    boardText.style.display  = "block";
    content.style.display = "none";
}