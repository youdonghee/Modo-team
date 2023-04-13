
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



//--------- 윈도우를 열면 로컬스토리지에 어드민 계정 생성 ---------------------------------------------
window.onload = function () {

    // userData = JSON.parse(localStorage.getItem('유저'));
    userData = localStorage.getItem('유저');
    if (!userData) {
        window.localStorage['유저'] = JSON.stringify([{ id: "admin", pw: "q123123!", nickname: "관리자", tnf: 1 }])
        // window.localStorage.setItem("유저", JSON.stringify([{ id: "admin", pw: "q123123!", nickname: "관리자" }]));
        // userData = JSON.parse(localStorage.getItem('유저'));
        userData = localStorage.getItem('유저');
    }
}
//--------------------------------------------------------------------------------------------------



// let signUserData = JSON.parse(localStorage.getItem('유저'));
// if (!signUserData) {
//     signUserData = [{ id: "admin", pw: "q123123!", nickname: "관리자" }];
// } 
// console.log(signUserData);

// window.localStorage.setItem("유저", JSON.stringify([{ id: "admin", pw: "q123123!", nickname: "관리자" }]));
// let signUserData = JSON.parse(localStorage.getItem('유저'));
// signUserData.push({ id: "admin", pw: "q123123!", nickname: "관리자" });



//-------로그인 버튼을 클릭했을 때 실행되는 함수 - 정규식 여부확인,  
loginBtn.onclick = function () {
    userData = window.localStorage.getItem("유저");

    // console.log("클릭");
    let userId = document.querySelector('.user-id').value;
    let userPw = document.querySelector('.user-pw').value;

    // console.log(userData);
    // console.log(JSON.parse(userData));
    // console.log(JSON.parse(userData)[0].id);
    // console.log(JSON.parse(userData).length);

    // let idIndex = JSON.parse(userData).findIndex(function(user){
    //     user.id == userId;
    //     console.log(user.id)
    //     console.log(userId)
    // });

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











//     let text = document.querySelector(".textbox");
// try{
//     if (isId(userId) && isPw(userPw)) { // 정규식이 맞았고
//         // console.log("로그인 성공");

//         JSON.parse(userData).forEach(function(e,index){

//                 console.log(e);
//                 console.log(JSON.parse(userData));

//                 if(userId !== e.id && userPw !== e.pw){

//                     // alert("로그인 성공");
//                     text.innerHTML="로그인 실패";
//                 }

//                 else{
//                     throw new Error(alert("로그인 성공"));
//                 }
//         })
//     }

// }
// catch(e){

// }
    //     for (let i = 0; i < JSON.parse(userData).length; i++) {
    //         console.log(JSON.parse(userData)[i].id)
    //         console.log(userId);
    //         console.log(JSON.parse(userData)[i].pw);
    //         console.log(userPw)

    //         if (JSON.parse(userData)[i].id == userId && JSON.parse(userData)[i].pw == userPw && JSON.parse(userData)[i].tnf == 1) {
    //             // alert("동작s")
    //             //회원가입 한 로그인 성공 시 동작하는 명령문
    //             if (userId != "admin") {
    //                 alert("회원가입 한 아이디로 로그인 성공!")


    //                 // 해당 영역에서 게임 페이지로 이동!


    //                 break;
    //             }
    //             else {
    //                 //어드민 계정 로그인 시 팝업창 띄움
    //                 alert("관리자 계정으로 로그인 성공!")
    //                 admin();
    //                 // console.log("관리자 계정으로 로그인 성공!")
    //                 break;
    //             }

    //         }
    //         // else {
    //         //     alert("가입된 계정이 아닙니다.\n아이디와 비밀번호를 확인하세요!");

    //         // }
    //         else if (JSON.parse(userData)[i].id == userId && JSON.parse(userData)[i].pw != userPw) {
    //         alert("회원정보와 일치하지 않습니다.\n비밀번호를 확인하세요!");
            
    //         }
    //         else if (JSON.parse(userData)[i].id != userId && JSON.parse(userData)[i].pw == userPw) {
    //         alert("가입된 계정이 아닙니다.\n아이디를 확인하세요!");
            
    //         }
    //         else if (JSON.parse(userData)[i].id != userId && JSON.parse(userData)[i].pw !== userPw) {
    //         alert("가입된 계정이 아닙니다.\n아이디와 비밀번호를 확인하세요!");
            
    //         }
    //     }
    // }
    // else {
    //     alert("아이디와 비밀번호 형식을 확인하세요!");
    // }



        // for (let i = 0; i < JSON.parse(userData).length; i++) {
    //     console.log(JSON.parse(userData)[i].id)
    //     console.log(userId);
    //     console.log(JSON.parse(userData)[i].pw);
    //     console.log(userPw);
    //     if (isId(userId) && isPw(userPw)) {
    //         console.log("로그인 성공");
    //         if (JSON.parse(userData)[i].id == userId && JSON.parse(userData)[i].pw == userPw && JSON.parse(userData)[i].tnf == 1) {
    //             alert("동작s")
    //             //회원가입 한 로그인 성공 시 동작하는 명령문
    //             if(userId != "admin"){
    //                 alert("회원가입 한 아이디로 로그인 성공!")
    //                 // console.log("회원가입 한 아이디로 로그인 성공!")
    //                 break;
    //             }
    //             else{
    //                 //어드민 계정 로그인 시 팝업창 띄움
    //                 alert("관리자 계정으로 로그인 성공!")
    //                 admin();
    //                 // console.log("관리자 계정으로 로그인 성공!")
    //                 break;
    //             }

    //         }
    //         // else {
    //         //     alert("가입된 계정이 아닙니다.\n아이디와 비밀번호를 확인하세요!");

    //         // }
    //     }
    //     else {
    //         alert("아이디와 비밀번호 형식을 확인하세요!");
    //     }
    // }
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

    // //userData = JSON.parse(localStorage.getItem('유저'));
    // userData = localStorage.getItem('유저');
    // if (!userData) {
    //     window.localStorage['유저'] = JSON.stringify([{ id: "admin", pw: "q123123!", nickname: "관리자", tnf: 1 }])
    //     // window.localStorage.setItem("유저", JSON.stringify([{ id: "admin", pw: "q123123!", nickname: "관리자" }]));
    //     // userData = JSON.parse(localStorage.getItem('유저'));
    //     userData = localStorage.getItem('유저');
    // }
    //  console.log(userData);
    //------------------------------------------------------------------------------------

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
    /*
    for (let i = 0; i < JSON.parse(userData).length; i++) {
        console.log(signIdInput.value)
        if (!JSON.parse(userData)[i].id == signIdInput.value) {
            //for문으로 저장된 아이디값 돌려서 같은 값이 나오면 else
            //다른 값이 나오면 if
            console.log("중복?")
            signIdSub.innerHTML = "사용 가능한 아이디 입니다.";
            signIdSub.style.color = "blue";
            userIdOverlapTnF = 0;
            break;
        }
        else {
            signIdSub.innerHTML = "이미 사용 중인 아이디 입니다.";
            signIdSub.style.color = "red";
            break;
        }
    }
    */
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
    /*
    for (let i = 0; i < JSON.parse(userData).length; i++) {
        console.log(signNickname.value)
        if (!JSON.parse(userData)[i].nickname == signNickname.value) {
            //for문으로 저장된 아이디값 돌려서 같은 값이 나오면 else
            //다른 값이 나오면 if
            signNickSub.innerHTML = "사용 가능한 닉네임 입니다.";
            signNickSub.style.color = "blue";
            userNickOverlapTnF = 0;
            break;
        }
        else {
            signNickSub.innerHTML = "이미 사용 중인 닉네임 입니다.";
            signNickSub.style.color = "red";
            break;
        }
    }
    */
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




// let arr = [{ "id": "dsfsdklf", "pw": "sfsdf123!", "nickname": "af" }, { "id": "jiwon1", "pw": "123123q!", "nickname": "지원1" }]






/*
function addUser() {
    let value = window.localStorage.getItem("유저");
    //닉네임 조건도 추가해야 한다.
    if(window.localStorage.length == 0){        //로컬 스토리지에 아무 내용도 기입되지 않았을 경우
        if (userIdTnF == 0 && userPwTnF == 0 ) {        //아이디와 패스워드가 정규식 조건에 맞을 경우.
            window.localStorage.setItem("유저", `{"id": "${signIdInput.value}", "pw": "${signPwInput.value}", "nickname": "${signNickname.value}" }`);
        }
        else {   //모든 조건이 들어맞지 않을 때
            alert("회원가입을 진행 할 수 없습니다. 입력한 사항을 다시 확인해주세요.")
        }
    }
    else{       //로컬스토리지에 내용이 기입되어 있을 경우 추가로 기입되도록 함
        if (userIdTnF == 0 && userPwTnF == 0 ) {        //아이디와 패스워드가 정규식 조건에 맞을 경우.
            window.localStorage.setItem("유저", value + "|" + `{"id": "${signIdInput.value}", "pw": "${signPwInput.value}", "nickname": "${signNickname.value}" }`);
        }
        else {   //모든 조건이 들어맞지 않을 때
            alert("회원가입을 진행 할 수 없습니다. 입력한 사항을 다시 확인해주세요.")
        }
    }
    console.log(window.localStorage.getItem("유저"));
}
*/



//--------- 어드민 진행 - 어드민 계정으로 로그인 시 팝업창 열기 ----------------------------------------
let adminXBtn = document.querySelector('.x');
let adminDiv = document.querySelector('.admin-div');

function admin() {
    adminDiv.classList.add("popup")
}

adminXBtn.onclick = function adminX() {      //어드민 팝업에서 X버튼 클릭 시 팝업 창 닫기
    adminDiv.classList.remove("popup")
    signDiv.classList.remove("popup")
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
    let _ul = document.createElement("ul");
    let _ul2 = document.createElement("ul");
    let _li = document.createElement("li");
    let _li1 = document.createElement("li");
    let _li2 = document.createElement("li");
    let _topDiv1 = document.createElement("div");
    let _topDiv2 = document.createElement("div");
    let _div1 = document.createElement("div");
    let _div2 = document.createElement("div");
    let _div3 = document.createElement("div");
    let _div4 = document.createElement("div");
    let _div5 = document.createElement("div");
    let _div6 = document.createElement("div");

    _topDiv1.className = "mo";


    _div1.innerHTML = "아이디";
    _div2.innerHTML = "비밀번호";
    _div3.innerHTML = "닉네임";
    _div4.innerHTML = "수락";
    _div5.innerHTML = "거절";
    _div6.innerHTML = "삭제";

    _topDiv1.style.display = "flex";
    _li.style.display = "flex";
    _li.append(_div1,_div2,_div3,);
    _topDiv1.append(_li);
    
    _li1.style.display = "flex";
    _li1.append(_div4,_div5);
    _topDiv1.append(_li1);
    _ul.append(_topDiv1);

    _topDiv2.style.display = "flex";
    _li2.style.display = "flex";
    _li2.append(_div6);
    _topDiv2.append(_li.cloneNode(true));
    _topDiv2.append(_li2);
    _ul2.append(_topDiv2);

    // [...userData2].forEach(function(i,index){
    userData2.forEach(function(i,index){
        let _li = document.createElement('li');
        let _li2 = document.createElement('li');
        let _div1 = document.createElement("div");
        let _div2 = document.createElement("div");
        let _div3 = document.createElement("div");
        let _div4 = document.createElement("div");
        let _div5 = document.createElement("div");
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

        _div1.innerHTML = (i).id;
        _div2.innerHTML = (i).pw;
        _div3.innerHTML = (i).nickname;
        if((i).tnf == 0){
            _addBtn.innerHTML = "수락";
            _removeBtn.innerHTML = "거절";
            _div4.append(_addBtn);
            _div5.append(_removeBtn);
            _ul.append(_li);
        } else {
            _removeBtn2.innerHTML = "삭제"
            _div4.append(_removeBtn2);
            _ul2.append(_li);
        }
        
        
        _li.style.display = "flex";
        _li.append(_div1,_div2,_div3,_div4, _div5);
        
        
    });
    adminAddNRemove.append(_ul);
    adminRemove.append(_ul2);
}
adminadd()
//--------------------------------------------------------------------------------------------------


// //--------- 어드민 진행 - 회원가입 시 어드민 창 회원 정보에 그려져야 한다. -----------------------------
// function adminadd() {
    
//     userData = window.localStorage.getItem("유저");
//     let userData2 = JSON.parse(userData);
//     let adminAddNRemove = document.querySelector(".admin-addsub");
//     let adminRemove = document.querySelector(".admin-listsub");
    
//     adminAddNRemove.innerHTML = "";     //추가 할 때 초기화 시켜주는 구문.
//     let _ul = document.createElement("ul");
//     let _li = document.createElement('li');
//     let _div1 = document.createElement("div");
//     let _div2 = document.createElement("div");
//     let _div3 = document.createElement("div");
//     let _div4 = document.createElement("div");
//     let _div5 = document.createElement("div");

//     _div1.innerHTML = "아이디";
//     _div2.innerHTML = "비밀번호";
//     _div3.innerHTML = "닉네임";
//     _div4.innerHTML = "수락";
//     _div5.innerHTML = "거절";

//     _li.style.display = "flex";
//     _li.append(_div1,_div2,_div3,_div4,_div5);
//     _ul.append(_li);

//     // [...userData2].forEach(function(i,index){
//     userData2.forEach(function(i,index){
//         let _li = document.createElement('li');
//         let _div1 = document.createElement("div");
//         let _div2 = document.createElement("div");
//         let _div3 = document.createElement("div");
//         let _div4 = document.createElement("div");
//         let _div5 = document.createElement("div");
//         let _addBtn = document.createElement("button");    
//         let _removeBtn = document.createElement("button");
        
//         if((i).tnf == 0){
//             _div1.innerHTML = (i).id;
//             _div2.innerHTML = (i).pw;
//             _div3.innerHTML = (i).nickname;
//             _addBtn.innerHTML = "수락";
//             _removeBtn.innerHTML = "거절";
//             _div4.append(_addBtn);
//             _div5.append(_removeBtn);
//         }
        
//         _addBtn.onclick = function(){
//             console.log("수락될거임");
//             console.log(userData2);
//             console.log([...userData2]);
//             console.log(userData2==[...userData2]);
//             // i.tnf = 1;
//             userData2[index].tnf = 1;
//             window.localStorage.setItem('유저',JSON.stringify(userData2));
//             console.log(index)
            
//         }

//         _removeBtn.onclick = function(){
//             userData2.splice(index,1);
//             // window.localStorage.removeItem
//             console.log("나");
//             console.log(userData2);
//             console.log(...userData2);
//             window.localStorage.setItem('유저',JSON.stringify(userData2));
//             adminadd();

//         }
//         _li.style.display = "flex";
//         _li.append(_div1,_div2,_div3,_div4, _div5);
//         _ul.append(_li);
//     });
//     adminAddNRemove.append(_ul);
//     // adminRemove.append(_ul);
// }
// adminadd()
// //--------------------------------------------------------------------------------------------------

//--------- 어드민 진행 - 가입 신청 된 회원정보. 수락, 거절이 되어야 한다. -----------------------------








//--------- 어드민 진행 - 가입되어 있는 회원정보. 삭제가 되어야 한다. ----------------------------------
