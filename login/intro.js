//-------- 인풋영역에서 아무것이나 입력하고 엔터키를 눌렀을 때 BGM이 나오며, 로그인창으로 이동한다. ----------------------------
let userInput = document.querySelector(".user-input");      //유저가 데이터를 입력할 인풋영역
// let userValue = document.querySelector(".user-input").value;      //유저가 입력한 데이터 값
let introDiv = document.querySelector(".intro")
// console.log(userInput.value)
// console.log("얌", userValue)

userInput.addEventListener("keyup",function(e){
    let a = document.querySelector(".user-input").value;
    console.log(a);
    if(e.keyCode == 13){
        // console.log("키 업 실행")
        // console.log(e)
        // console.log(a)
        // console.log(e.keyCode)
        // console.log(e.userValue)        //이슈 - 입력된 value값이 뜨지 않고 undefined뜸
        // console.log(userValue)
        // console.log("클릭")
        if(a.length == 0){
            alert("데이터를 입력해주세요!")
        }
        else{
            console.log("실행")
            const audio = new Audio();
            audio.src = "../BGM/Windows XP Startup.wav";
            audio.play();
            introDiv.style.display = "none";
        }
    }
    // console.log(userValue)
})
//-----------------------------------------------------------------------------------------------------------


//-------- 인풋영역에서 아무것이나 입력하고 초록버튼을 눌렀을 때 BGM이 나오며, 로그인창으로 이동한다. --------------------------
let loginIntroBtn = document.querySelector(".intro-login-btn");        // 인풋 영역 옆에 위치한 초록버튼

loginIntroBtn.addEventListener("click",function(){
    let a = document.querySelector(".user-input").value;
    if(a.length == 0){
        alert("데이터를 입력해주세요!")
    }
    else{
        const audio = new Audio();
        audio.src = "../BGM/Windows XP Startup.wav";
        audio.play();
        introDiv.style.display = "none";
    }
})
//-----------------------------------------------------------------------------------------------------------
