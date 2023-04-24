
//-------- 게임아이콘, 이름 더블클릭 시 로그인 팝업이 뜬다.--------------------------------------------
let gameIcon = document.querySelector(".game-icon");        //게임 아이콘 
let iconText = document.querySelector(".icon-text");        //게임 텍스트
let background = document.querySelector(".background");     //로그인 영역
let loginX = document.querySelector(".login-x");            //로그인 영역 x버튼

gameIcon.ondblclick = function(){       //게임아이콘 더블클릭 시 로그인 창이 뜬다.
    // console.log("클릭돼");
    background.classList.toggle("popup")
    // const audio = new Audio();
    // audio.src = "../BGM/Windows XP Startup.wav";
    // audio.play();
}

iconText.ondblclick = function(){       //게임 이름 더블 클릭 시 로그인 창이 뜬다.
    background.classList.toggle("popup")
}

loginX.onclick = function(){            //로그인 영역의 x버튼을 한 번 클릭 시 로그인 창이 닫힌다.
    background.classList.remove("popup")
}
//-------------------------------------------------------------------------------------------------


//--------- 아이디, 패스워드 정규식 함수 -------------------------------------------------------------
function isId(asValue) {
    //5~8자, 영문 + 숫자 조합
    var regExp = /^[a-zA-Z][0-9a-zA-Z]{4,7}$/i;
    //test메소드로 검사해서 정규식 형식이 맞으면 true. 아니면 false 반환
    return regExp.test(asValue);
}

function isPw(asValue) {
    //최소 8자, 하나 이상의 대소문자 및 하나의 숫자, 하나의 특수문자
    var regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
//-------------------------------------------------------------------------------------------------



//--------- 로그인 진행 - 아이디와 패스워드는 정규식에 맞게 입력해야 한다. -----------------------------
let loginBtn = document.querySelector('.login-btn');

let userData = '[{"key" : "value"}]';
userData = window.localStorage.getItem("유저");
console.log(userData);
//-------------------------------------------------------------------------------------------------



//--------- 윈도우를 열면 로컬스토리지에 어드민 계정 생성 / 윈도우 시작 오디오 재생 --------------------
window.onload = function () {

    // userData = JSON.parse(localStorage.getItem('유저'));
    userData = localStorage.getItem('유저');
    if (!userData) {
        window.localStorage['유저'] = JSON.stringify([{ id: "admin", pw: "q123123!", nickname: "관리자", tnf: 1 }])
        // window.localStorage.setItem("유저", JSON.stringify([{ id: "admin", pw: "q123123!", nickname: "관리자" }]));
        // userData = JSON.parse(localStorage.getItem('유저'));
        userData = localStorage.getItem('유저');
    }
    
    // let audio = new Audio('./BGM/Windows XP Startup.wav')

    // audio.play();
}
//--------------------------------------------------------------------------------------------------
//-------로그인 버튼을 클릭했을 때 실행되는 함수 - 정규식 여부확인,  
loginBtn.onclick = function () {
    userData = window.localStorage.getItem("유저");

    // console.log("클릭");
    let userId = document.querySelector('.user-id').value;
    let userPw = document.querySelector('.user-pw').value;
    
    let idIndex = JSON.parse(userData).findIndex(user =>
        user.id == userId)          //회원 목록에 입력된 아이디가 없으면 -1, 있으면 해당 아이디 값의 인덱스를 반환
        // console.log(user.id);
        console.log(userId);
    console.log(idIndex);

    // console.log(JSON.parse(userData)[idIndex].pw)
    if(isId(userId) && isPw(userPw)){                                   //입력된 아이디와 비밀번호가 정규식이 맞는지 확인
        if(idIndex != -1){      //가입된 아이디가 있다.                 // 입력된 아이디 값이 회원목록에서 확인이 되면
            if(JSON.parse(userData)[idIndex].id == "admin"){            //확인된 아이디 값이 어드민 계정이라면
                if(JSON.parse(userData)[idIndex].pw == userPw){         //어드민 아이디 인덱스 값의 패스워드와 내가 입력한 패스워드 값이 동일하면 
                    alert("관리자 계정으로 로그인 성공!");
                    adminDiv.classList.add("popup");                    //어드민 팝업창 열기
                }
                else{                                                   //어드민 아이디 인덱스 값의 패스워드와 내가 입력한 패스워드 값이 동일하지 않으면
                    alert("회원정보와 일치하지 않습니다.\n비밀번호를 확인하세요!")
                }
            }
            //확인된 인덱스 값의 패스워드와 입력한 패스워드의 값이 동일하고, 해당 인덱스의 tnf값이 1(승인된계정)일때
            else if(JSON.parse(userData)[idIndex].pw == userPw && JSON.parse(userData)[idIndex].tnf == 1){
                alert("회원가입 한 아이디로 로그인 성공!");
                
                                //로그인 성공 시, 성공한 계정은 로컬스토리지 '로그인'에 저장되어야 한다.
                let login = JSON.parse(userData)[idIndex];
                window.localStorage.setItem("로그인", JSON.stringify(login));
                console.log(login);
                
                location.href= "../html-folder/main.html"
            }
            //확인된 인덱스 값의 패스워드와 입력한 패스워드의 값이 동일하고, 해당 인덱스의 tnf값이 0(승인되지 않은 계정)일때
            else if(JSON.parse(userData)[idIndex].pw == userPw && JSON.parse(userData)[idIndex].tnf == 0){
                alert("가입 승인된 계정이 아닙니다.")
            }
            //확인된 인덱스 값의 패스워드와 입력된 패스워드의 값이 동일하지 않을 때
            else{
                alert("회원정보와 일치하지 않습니다.\n비밀번호를 확인하세요!")
            }
        }
        else{       //가입된 아이디가 아닐 때
            alert("가입된 계정이 아닙니다.\n아이디를 확인하세요!")
        }
    }
    else{           //입력된 아이디나 패스워드가 정규식과 맞지 않을 때
        alert("아이디와 비밀번호 형식을 확인하세요!");
    }












}
//---------------------------------------------------------------------------------------------------


//--------- 회원가입 진행 - 회원가입 버튼 클릭 시 팝업창 여닫기 ----------------------------------------
let signBtn = document.querySelector('.signup-btn');
let signDiv = document.querySelector('.sign-div');
let signXBtn = document.querySelector('.sign-x');

signBtn.onclick = function () {
    signDiv.classList.toggle("popup")
}

signXBtn.onclick = function () {
    signDiv.classList.remove("popup")
}
//--------------------------------------------------------------------------------------------------


//--------- 회원가입 진행 - 아이디 중복확인 클릭 시 안내멘트 띄우기 ------------------------------------
let signIdBtn = document.querySelector('.sign-idbtn');              //아이디 영역 중복확인 버튼
let signNickBtn = document.querySelector('.sign-nickbtn');              //닉네임 영역 중복확인 버튼

let signIdSub = document.querySelector('.id-subtext');              //아이디 영역 결과노출 텍스트 영역
let signPWSub1 = document.querySelector('.pw1-subtext');            //패스워드 영역 결과노출 텍스트 영역
let signPWSub2 = document.querySelector('.pw2-subtext');            //패스워드 확인 영역 결과노출 텍스트 영역
let signNickSub = document.querySelector('.nick-subtext');          //닉네임 영역 결과노출 텍스트 영역

let signIdInput = document.querySelector('.sign-idInput');          //아이디 인풋
let signPwInput = document.querySelector('.sign-pwInput');          //패스워드 인풋
let signRePwInput = document.querySelector('.sign-rePwInput');      //패스워드 확인 인풋
let signNickname = document.querySelector('.sign-nickname');        //닉네임 인풋


let userIdTnF = 1;                  //유저 아이디가 정규식에 만족할 경우 0, 아닐경우 1.
let userPwTnF = 1;                  //유저 패스워드 확인이 첫 번째 패스워드 입력값과 일치할 경우 0, 아닐경우 1

let userIdOverlapTnF = 1;           //유저 아이디가 중복되지 않을 경우 0, 아닐경우 1.
let userNickOverlapTnF = 1;         //유저 닉네임이 중복되지 않을 경우 0, 아닐경우 1.

// ------ 아이디 중복확인 버튼 ------------------------------------------------------------버튼 동작 완료

//------- 아이디 중복확인 버튼 클릭 시 어드민 계정 생성 --------------------------------------------
signIdBtn.onclick = function () {
    console.log("동작")
    userData = localStorage.getItem("유저");
    // console.log(window.localStorage.getItem("유저"));
    console.log(JSON.parse(userData));


    let userIDSearch = JSON.parse(userData).filter(function (idvalue) {
        return idvalue.id === signIdInput.value;
    })
    console.log(userIDSearch);
    if (userIDSearch.length == 0 && userIdTnF == 0 && signIdInput.value != "admin") {
        signIdSub.innerHTML = "사용 가능한 아이디 입니다.";
        signIdSub.style.color = "blue";
        userIdOverlapTnF = 0;
    }
    else if (signIdInput.value == "admin") {
        signIdSub.innerHTML = "사용이 불가한 아이디 입니다.";
        signIdSub.style.color = "red";
        userIdOverlapTnF = 1;
    }
    else if (userIDSearch.length == 0 && userIdTnF != 0) {
        signIdSub.innerHTML = "대소문자+숫자. 5~8자로 입력해주세요.";
        signIdSub.style.color = "red";
        userIdOverlapTnF = 1;
    }
    else {
        signIdSub.innerHTML = "이미 사용 중인 아이디 입니다.";
        signIdSub.style.color = "red";
        userIdOverlapTnF = 1;
    }
    
}
// filter에서 id를 찾아서 일치하지 않은것만 return
//--------------------------------------------------------------------------------------------------

// ------ 닉네임 중복확인 버튼 ------------------------------------------------------------버튼 동작 완료
signNickBtn.onclick = function () {
    userData = window.localStorage.getItem("유저");

    let userNICKSearch = JSON.parse(userData).filter(function (idvalue) {
        return idvalue.nickname === signNickname.value;
    })
    console.log(userNICKSearch);
    if (userNICKSearch.length == 0) {
        signNickSub.innerHTML = "사용 가능한 닉네임 입니다.";
        signNickSub.style.color = "blue";
        userNickOverlapTnF = 0;
    }
    else {
        signNickSub.innerHTML = "이미 사용 중인 닉네임 입니다.";
        signNickSub.style.color = "red";
        userNickOverlapTnF = 1;
    }
    
}
//--------------------------------------------------------------------------------------------------



//--------- 회원가입 진행 - 아이디, 비밀번호 입력 시 양식에 맞게 입력멘트 ------------------------------------

//------- 아이디 입력 시 형식에 맞지 않을 경우, "대소문자+숫자. 5~8자로 입력해주세요." 출력 -------------------
signIdInput.oninput = function () {
    if (isId(signIdInput.value)) {
        signIdSub.innerHTML = "등록 가능한 아이디 입니다.";
        signIdSub.style.color = "blue";
        userIdTnF = 0;
    }
    else {
        signIdSub.innerHTML = "대소문자+숫자. 5~8자로 입력해주세요.";
        signIdSub.style.color = "red";
        userIdTnF = 1;
    }
}
//----------------------------------------------------------------------

//------- 패스워드 입력 시 형식에 맞지 않을 경우, "대소문자+숫자+특수문자. 최소 8자로 입력해주세요." 출력 -------
signPwInput.oninput = function signID() {
    if (isPw(signPwInput.value)) {
        signPWSub1.innerHTML = "사용 가능한 패스워드 입니다.";
        signPWSub1.style.color = "blue";
    }
    else {
        signPWSub1.innerHTML = "대소문자+숫자+특수문자. 최소 8자로 입력해주세요.";
        signPWSub1.style.color = "red";
    }

}

//----------------------------------------------------------------------
//------- 패스워드 확인 입력 시 이전 입력값과 동일하지 않을 경우, "비밀번호가 일치하지 않습니다." 출력 ----------
signRePwInput.oninput = function () {
    // console.log(isPw(signPwInput.value));
    if (isPw(signPwInput.value)) {
        if (signRePwInput.value == signPwInput.value) {
            signPWSub2.innerHTML = "비밀번호가 일치합니다.";
            signPWSub2.style.color = "blue";
            userPwTnF = 0;
        }
        else {
            signPWSub2.innerHTML = "비밀번호가 일치하지 않습니다.";
            signPWSub2.style.color = "red";
            userPwTnF = 1;
        }
    }
    else{
        signPWSub2.innerHTML = "대소문자+숫자+특수문자. 최소 8자로 입력해주세요.";
        signPWSub2.style.color = "red";
        userPwTnF = 1;
    }
}
//----------------------------------------------------------------------
signNickname.oninput = function () {
    userNickOverlapTnF = 1;
}


//--------- 회원가입 진행 - 로컬스토리지에 저장 ------------------------------------
let signAdd = document.querySelector('.signup-add')

signAdd.onclick = function () {
    // let value = window.localStorage.getItem("유저");
    //닉네임 조건도 추가해야 한다.
    if (window.localStorage.length == 0) {        //로컬 스토리지에 아무 내용도 기입되지 않았을 경우
        if (userIdTnF == 0 && userPwTnF == 0 && userIdOverlapTnF == 0 && userNickOverlapTnF == 0) {        //아이디와 패스워드가 정규식 조건에 맞을 경우, 아이디와 닉네임이 중복되지 않았을 경우
            //tnf: 회원가입 승인여부. 승인이 안났을 경우 0, 승인완료된 경우 1
         
            window.localStorage.setItem("유저", JSON.stringify([...ass,  { id: signIdInput.value, pw: signPwInput.value, nickname: signNickname.value, tnf: 0 }]));
            // window.localStorage.setItem("유저", JSON.stringify([{ id: "admin", pw: "123123q!", nickname: "관리자" }]));
            alert("회원가입 신청이 완료되었습니다.\n승인이 완료되면 로그인이 가능합니다.");

            //회원가입 신청 완료 후, 다시 가입신청을 할 때 중복확인을 하지 않아도 중복으로 가입신청이 되는 이슈 발생
            userIdOverlapTnF = 1;
            userNickOverlapTnF = 1;

        }
        else {   //모든 조건이 들어맞지 않을 때
            alert("회원가입을 진행 할 수 없습니다. 입력한 사항을 다시 확인해주세요.1");
        }
    }
    else {       //로컬스토리지에 내용이 기입되어 있을 경우 추가로 기입되도록 함
        if (userIdTnF == 0 && userPwTnF == 0 && userIdOverlapTnF == 0 && userNickOverlapTnF == 0) {        //아이디와 패스워드가 정규식 조건에 맞을 경우.
            signUserData = JSON.parse(localStorage.getItem('유저'));
            signUserData.push({ id: signIdInput.value, pw: signPwInput.value, nickname: signNickname.value, tnf: 0 });
            window.localStorage.setItem("유저", JSON.stringify(signUserData));
            alert("회원가입 신청이 완료되었습니다.\n승인이 완료되면 로그인이 가능합니다.");
            userIdOverlapTnF = 1;
            userNickOverlapTnF = 1;
            
        }
        else {   //모든 조건이 들어맞지 않을 때
            alert("회원가입을 진행 할 수 없습니다. 입력한 사항을 다시 확인해주세요.2");
            console.log(userIdTnF);
            console.log(userPwTnF);
            console.log(userIdOverlapTnF);
            console.log(userNickOverlapTnF);
        }
    }
    console.log(window.localStorage.getItem("유저"));
    adminadd();
}
//------------------------------------------------------------------------------------------------------
//--------- 어드민 진행 - 어드민 계정으로 로그인 시 팝업창 열기 ----------------------------------------
let adminXBtn = document.querySelector('.x');
let adminDiv = document.querySelector('.admin-div');

function admin() {
    adminDiv.classList.add("popup")
}

adminXBtn.onclick = function adminX() {      //어드민 팝업에서 X버튼 클릭 시 팝업 창 닫기
    adminDiv.classList.remove("popup")
}
//--------------------------------------------------------------------------------------------------

console.log(userData);
console.log(Array.isArray(userData))


//--------- 어드민 진행 - 회원가입 시 어드민 창 회원 정보에 그려져야 한다. -----------------------------
function adminadd() {
    
    userData = window.localStorage.getItem("유저");
    let userData2 = JSON.parse(userData);
    let adminAddNRemove = document.querySelector(".admin-addsub");
    let adminRemove = document.querySelector(".admin-listsub");

    adminAddNRemove.innerHTML = "";  
       //추가 할 때 초기화 시켜주는 구문.
       adminRemove.innerHTML='';
    
    //----- 가입승인 리스트 목록 --------------------------------
    let _Aul = document.createElement("ul");
    // let _ul2 = document.createElement("ul");
    let _Ali = document.createElement("li");
    _Ali.className = 'approve';
    // let _li1 = document.createElement("li");
    // let _li2 = document.createElement("li");
    // let _topDiv1 = document.createElement("div");
    // let _topDiv2 = document.createElement("div");
    let _Adiv1 = document.createElement("div");
    let _Adiv2 = document.createElement("div");
    let _Adiv3 = document.createElement("div");
    let _Adiv4 = document.createElement("div");
    let _Adiv5 = document.createElement("div");
    // let _div6 = document.createElement("div");
    
    // _topDiv1.className = "mo";
    
    
    _Adiv1.innerHTML = "아이디";
    _Adiv2.innerHTML = "비밀번호";
    _Adiv3.innerHTML = "닉네임";
    _Adiv4.innerHTML = "수락";
    _Adiv5.innerHTML = "거절";
    // _Adiv6.innerHTML = "삭제";
    
    // _topDiv1.style.display = "flex";
    _Ali.style.display = "flex";
    _Ali.append(_Adiv1,_Adiv2,_Adiv3,_Adiv4,_Adiv5);
    _Aul.append(_Ali);
    
    //----- 회원목록 리스트 목록 --------------------------------
    let _Bul = document.createElement("ul");
    let _Bli = document.createElement("li");
    let _Bdiv1 = document.createElement("div");
    let _Bdiv2 = document.createElement("div");
    let _Bdiv3 = document.createElement("div");
    let _Bdiv4 = document.createElement("div");
    
    
    _Bdiv1.innerHTML = "아이디";
    _Bdiv2.innerHTML = "비밀번호";
    _Bdiv3.innerHTML = "닉네임";
    _Bdiv4.innerHTML = "삭제";
    
    _Bli.style.display = "flex";
    _Bli.append(_Bdiv1,_Bdiv2,_Bdiv3,_Bdiv4);
    _Bul.append(_Bli);

    //---------------------------------------------------------
    

    // [...userData2].forEach(function(i,index){
    userData2.forEach(function(i,index){
        let _Ali = document.createElement('li');
        let _Bli = document.createElement('li');
  
        let _Adiv1 = document.createElement("div");
        let _Adiv2 = document.createElement("div");
        let _Adiv3 = document.createElement("div");
        let _Adiv4 = document.createElement("div");
        let _div5 = document.createElement("div");

        let _Bdiv1 = document.createElement("div");
        let _Bdiv2 = document.createElement("div");
        let _Bdiv3 = document.createElement("div");  
        let _Bdiv4 = document.createElement("div");
        
        let _addBtn = document.createElement("button");    
        let _removeBtn = document.createElement("button");
        let _removeBtn2 = document.createElement("button");
        
        _addBtn.onclick = function(){
            console.log("수락될거임");
            console.log(userData2);
            console.log([...userData2]);
            console.log(userData2==[...userData2]);
            // i.tnf = 1;
            userData2[index].tnf = 1;
            window.localStorage.setItem('유저',JSON.stringify(userData2));
            adminadd();
            
        }

        _removeBtn.onclick = function(){
            userData2.splice(index,1);
            // window.localStorage.removeItem
            console.log("나");
            console.log(userData2);
            console.log(...userData2);
            window.localStorage.setItem('유저',JSON.stringify(userData2));
            adminadd();

        }

        _removeBtn2.onclick = function(){
            userData2.splice(index,1);
            // window.localStorage.removeItem
            console.log("나");
            console.log(userData2);
            console.log(...userData2);
            window.localStorage.setItem('유저',JSON.stringify(userData2));
            adminadd();
        }
        
        //가입승인에 들어오는 계정 값
        _Adiv1.innerHTML = (i).id;
        _Adiv2.innerHTML = (i).pw;
        _Adiv3.innerHTML = (i).nickname;

        //회원목록에 들어오는 계정 값
        _Bdiv1.innerHTML = (i).id;
        _Bdiv2.innerHTML = (i).pw;
        _Bdiv3.innerHTML = (i).nickname;
        
        if((i).tnf == 0){
            _addBtn.innerHTML = "수락";
            _removeBtn.innerHTML = "거절";
            _Adiv4.append(_addBtn);
            _div5.append(_removeBtn);
            _Aul.append(_Ali);
        } else {
            _removeBtn2.innerHTML = "삭제"
            _Bdiv4.append(_removeBtn2);
            _Bul.append(_Bli);
        }
        
        
        _Ali.style.display = "flex";                //가입승인 추가되는 계정들 정보 나열
        _Ali.append(_Adiv1,_Adiv2,_Adiv3,_Adiv4,_div5);


        _Bli.style.display = "flex";                //회원목록 추가되는 계정들 정보 나열
        // _topDiv2.append(_li.cloneNode(true));
        _Bli.append(_Bdiv1,_Bdiv2,_Bdiv3,_Bdiv4);
        
        
    });
    adminAddNRemove.append(_Aul);
    adminRemove.append(_Bul);
}
adminadd()
//--------------------------------------------------------------------------------------------------

//--------- 로그인 팝업 드래그이동 -------------------------------------------------------------------
let loginTop = document.querySelector(".login-drag");       //로그인 상단 파란영역 (클릭될 영역)

let loginPress = false;      //마우스 클릭 여부
let loginStartX;             //마우스 클릭 시작지점 X좌표
let loginStartY;             //마우스 클릭 시작지점 Y좌표

loginTop.addEventListener('mousedown', function(e){         //로그인 상단 파란 바를 클릭 시 발생되는 이벤트
    // console.log(e);
    loginStartX = e.clientX;             //loginStartX에 마우스 클릭이 시작되는 X축의 좌표를 구한다.
    loginStartY = e.clientY;             //loginStartY에 마우스 클릭이 시작되는 Y축의 좌표를 구한다.
    // console.log(loginStartX)
    // console.log(loginStartY)
    loginPress = true;                  //이벤트가 동작되는 중
})


loginTop.addEventListener('mousemove', function(e){         //로그인 상단 파란 바를 클릭한 상태로 움직이면 발생되는 이벤트
    if(!loginPress){                    //이벤트가 동작되지 않으면 값을 리턴한다.
        return;
    }                                   //이벤트가 동작중이면 하단의 코드들이 실행된다.
    let posX = loginStartX - e.clientX; //이전좌표와 현재좌표의 차이값을 저장한다.
    let posY = loginStartY - e.clientY;

    loginStartX = e.clientX;            //이전좌표에 현재 좌표 값을 대입한다.
    loginStartY = e.clientY;

    background.style.left = (background.offsetLeft - posX) + "px";      //X축 이동.
    background.style.top = (background.offsetTop - posY) + "px";        //Y축 이동.

})


loginTop.addEventListener('mouseup', function(){        //로그인 상단 파란 바를 클릭하다가 떼면 발생하는 이벤트
    loginPress = false;                 //이벤트가 더 이상 동작하지 않음을 알린다.
})

//--------------------------------------------------------------------------------------------------



//--------- 회원가입 팝업 드래그이동 -----------------------------------------------------------------
let signTop = document.querySelector(".sign-drag")         //회원가입 상단 파란영역 (클릭될 영역)

let signPress = false;      //마우스 클릭 여부
let signStartX;             //마우스 클릭 시작지점 X좌표
let signStartY;             //마우스 클릭 시작지점 Y좌표

signTop.addEventListener('mousedown',function(e){
    console.log("클릭");
    signStartX = e.clientX;
    signStartY = e.clientY;

    signPress = true;
})

signTop.addEventListener('mousemove', function(e){

    if(!signPress){
        return;
    }
    let posX = signStartX - e.clientX;
    let posY = signStartY - e.clientY;

    signStartX = e.clientX;
    signStartY = e.clientY;

    signDiv.style.left = (signDiv.offsetLeft - posX) + "px";
    signDiv.style.top = (signDiv.offsetTop - posY) + "px";
})

signTop.addEventListener('mouseup',function(){
    signPress = false;
})
//--------------------------------------------------------------------------------------------------


//--------- 어드민 팝업 드래그이동 -------------------------------------------------------------------
let adminTop = document.querySelector(".admin-drag")         //어드민 상단 파란영역 (클릭될 영역)

let adminPress = false;      //마우스 클릭 여부
let adminStartX;             //마우스 클릭 시작지점 X좌표
let adminStartY;             //마우스 클릭 시작지점 Y좌표

adminTop.addEventListener('mousedown', function(e){
    console.log("클릭");
    adminStartX = e.clientX;
    adminStartY = e.clientY;

    adminPress = true;
})

adminTop.addEventListener('mousemove', function(e){
    if(!adminPress){
        return;
    }
    let posX = adminStartX - e.clientX;
    let posY = adminStartY - e.clientY; 

    adminStartX = e.clientX;
    adminStartY = e.clientY;    

    adminDiv.style.left = (adminDiv.offsetLeft - posX) + "px";
    adminDiv.style.top = (adminDiv.offsetTop - posY) + "px";
})

adminTop.addEventListener('mouseup', function(){
    adminPress = false;
})
//--------------------------------------------------------------------------------------------------


//--------- 윈도우바 우측 현재시간간 ------------------------------------------------------------------
let time = document.querySelector(".time");

function now() {
    const date = new Date();            //현재 시간 총 데이터
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let SnM = "";

    if (hour < 12) {
        SnM = "오전"
        if (hour < 10) {
            hour = "0" + hour;
        }
    }
    else {
        SnM = "오후"
        hour -= 12;
        if (hour < 10) {
            hour = "0" + hour;
        }
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    time.innerHTML = `${SnM} ${hour}:${minutes}`
}
now();
setInterval(now, 1000);
//--------------------------------------------------------------------------------------------------