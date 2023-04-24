let userData = '[{"key" : "value"}]';
userData = window.localStorage.getItem("로그인");
// console.log(userData);
let boardCounter=1;
let signUp = document.querySelector(".signUp");
let list1 = document.querySelectorAll(".list1");
let written = document.querySelector(".written");
let backbtn = document.querySelector(".back-btn");
// let _index = 1;
let localTitle={};
let localContent={};
let localTitleArr=[];
let localContentArr=[];
let boardContentArr=[];
let boardTitleDataArr2;
let boardContentDataArr2;
let boardTitleDataArr = [];
let boardContentDataArr = [];
let date ;
let boardboard = document.querySelector(".board-board");
let writtenContent = document.querySelector(".written-content");
let writtenDay = document.querySelector(".written-day");
let writtenTitle = document.querySelector(".written-title");
let pageNummain = document.querySelector(".page-nummain");
let pageNum=document.querySelectorAll(".page-num");


function CreateBoard({_title,_date,_id,_user,_content}){
    this.title = _title;
    this.date = _date;
    this.id = _id;
    this.user= _user;
    this.content=_content;
}

const boardText = document.querySelector(".board-text");
const submit = document.querySelector(".submit");
const boardTitle = document.querySelector(".main-title");
const boardContent = document.querySelector(".main-content");
const content = document.querySelector(".content");

signUp.onclick = function () {
    written.style.display = "none";
    boardText.style.display = "none";
    content.style.display = "block";
  };

window.onload = function(){
    render();
    listrender();
}

//등록하기를 눌렀을 때
submit.onclick = function(){

    
  // 작성한 제목이랑 내용의 벨류를 변수에 담는다
  const boardTitleData = boardTitle.value;
  const boardContentData = boardContent.value;

    // 변수에 담은 입력한 벨류 값을 각각 배열에 푸쉬하여 쌓는다.
    // boardTitleDataArr.push(boardTitleData);
    // boardContentDataArr.push(boardContentData);
  
  // 현재 날짜를 data에 담는다.
  date = new Date().toISOString().substring(0, 10);

  written.style.display = "none";
  boardText.style.display = "block";
  content.style.display = "none";

// 제목배열이라는 키값으로 boardTitleDataArr를 문자열로 저장

// boardTitleDataArr2 = (window.localStorage.setItem("제목배열",boardTitleDataArr));
// boardTitleDataArr2 = JSON.stringify(boardTitleDataArr);

// window.localStorage.setItem("제목배열",boardTitleDataArr2);

// boardContentDataArr2 = JSON.stringify(boardContentDataArr);
// window.localStorage.setItem("내용배열",boardContentDataArr2);

// JSON.stringify(window.localStorage.setItem("내용배열",boardContentDataArr));
// };

//제목배열을 객체로 변환시켜  localTitle 로 저장
boardContentArr = JSON.parse(window.localStorage.getItem("boardContentArr"));

let boardMain = new CreateBoard({_title:boardTitleData, _date:date,
                                    _id:1, _user:userData,_content:boardContentData});
// _index++;

// console.log(boardMain);
// console.log(boardContentArr);

    if(!boardContentArr){ //arr에 데이터가 없음
        // console.log(boardContentArr.length == 0);
        // console.log("arr에 데이터가 없음")
        boardContentArr=[];
        boardContentArr.push(boardMain);
        window.localStorage.setItem("boardContentArr",JSON.stringify(boardContentArr));
    }

    else{ //arr에 데이터가 있음
        // console.log(boardContentArr.length);
        // console.log("arr에 데이터가 있음")
        boardMain.id = boardContentArr.length+1;
        a = JSON.parse(window.localStorage.getItem("boardContentArr"));
        // console.log(a);
        a.push(boardMain);
        // console.log(a);
        window.localStorage.setItem("boardContentArr",JSON.stringify(a));
    }
render();
listrender();

}

    let a;
    let ia=1;
function render(){

    a = JSON.parse(window.localStorage.getItem("boardContentArr"));
   
    boardboard.innerHTML="";

    console.log(a.length);
    if(a.length>11 ) // 
    {   
        let b = parseInt(a.length/10);

        if(a.length%10==0 || a.length%10==1){
            b= b-1;
        }
        console.log("b는" + b);
        console.log("11보다 커서 들어옴");
        boardboard = document.querySelectorAll(".board-board");
        console.log(boardboard);

        for(let aa =0; aa <= b ; aa++){
        boardboard[aa].innerHTML = "";
        
        }
    }

    
    if (!a) {
        return false;
    }
    
    a.forEach(function(i, index){
        // console.log(index);


        if((parseInt(index/10))==1 && index >=10 || (parseInt(index/10))==2){
             console.log("여기 들어오니?");
             console.log(index);

             console.log("create"+a.length);

             if(a.length % 10==1 && a.length>10 && a.length-index==1){
                console.log("이번만 만든다");
                let newboardboard = document.createElement("div"); 
                newboardboard.className="board-board";
             }
            

        const boardlist = document.createElement("div");
        const titleSpan = document.createElement("span");
        let div01 =document.createElement("div")
        let div02 =document.createElement("div")
        let div03 =document.createElement("div")
        let div04 =document.createElement("div")
        let div05 =document.createElement("div")
        let div06 =document.createElement("div")
        let div07 =document.createElement("div")
       
        boardlist.className ="board-list";
        titleSpan.className = "list1";
        div01.className ="number";
        div02.className ="day";
        div03.className ="list";
        div04.className ="writer";
        div05.className ="view";
        div06.className ="sym";
        div07.className ="em";
        
        let {title,date,id,user} = i; //이거 안하면 아래처럼 해야됌
        // let ti=i.title;
        // console.log(id);

        div01.innerHTML = id;
        div02.innerHTML = date;
        titleSpan.innerHTML = title;
        div04.innerHTML = user;
        div05.innerHTML = "0";
        div06.innerHTML = "0";
        div07.innerHTML = "0";

        if((a.length-1)%10==0 && index%10==0 && a.length-index==1){
            console.log("index가 10으로 나눴을 때 0일때만");
            let newboardboard = document.createElement("div"); 
            newboardboard.className="board-board";

            div03.append(titleSpan);  
            boardlist.append(div01,div02,div03,div04,div05,div06,div07);
            boardboard = document.querySelectorAll(".board-board");
            newboardboard.append(boardlist);
            boardText.append(newboardboard);
            boardboard = document.querySelectorAll(".board-board");
            boardboard[parseInt(index/10)].style.display="none";

            console.log( boardboard[parseInt(index/10)]);
            console.log(parseInt(index/10));
            console.log(index);
        }
        if(a.length >11 && a.length <21){
        //

            console.log("11부터 들어옴");
            div03.append(titleSpan); 
            boardlist.append(div01,div02,div03,div04,div05,div06,div07);
            boardboard = document.querySelectorAll(".board-board");
            console.log(boardboard);
            console.log("몇이니"+parseInt(index/10))
            boardboard[parseInt(index/10)].append(boardlist);
            
            boardText.append(boardboard[parseInt(index/10)]);

            console.log( boardboard[parseInt(index/10)]);
            console.log(parseInt(index/10));
            console.log(index);
            console.log("배열확인" +boardlist);
            // boardboard = document.querySelectorAll(".board-board");
            // boardboard[parseInt(index/10)].style.display="none";

        }
        if(a.length >21){
            //
    
                console.log("11부터 들어옴");
                div03.append(titleSpan); 
                boardlist.append(div01,div02,div03,div04,div05,div06,div07);
                boardboard = document.querySelectorAll(".board-board");
                console.log(boardboard);
                console.log("몇이니"+parseInt(index/10))
                boardboard[parseInt(index/10)].append(boardlist);
                
                boardText.append(boardboard[parseInt(index/10)]);
    
                console.log( boardboard[parseInt(index/10)]);
                console.log(parseInt(index/10));
                console.log(index);
                console.log("배열확인" +boardlist);
                // boardboard = document.querySelectorAll(".board-board");
                // boardboard[parseInt(index/10)].style.display="none";
    
            }
        
        
        }
       
        else{
            
            // console.log("처음"+a.length);
            // if(a.length > 10){
            // return;
            // }
            // let divboard = document.createElement("div"); 
            // divboard.className="board-board";
            // else{
        const boardlist = document.createElement("div");
        const titleSpan = document.createElement("span");
        let div01 =document.createElement("div")
        let div02 =document.createElement("div")
        let div03 =document.createElement("div")
        let div04 =document.createElement("div")
        let div05 =document.createElement("div")
        let div06 =document.createElement("div")
        let div07 =document.createElement("div")
        
        boardlist.className ="board-list";
        titleSpan.className = "list1";
        div01.className ="number";
        div02.className ="day";
        div03.className ="list";
        div04.className ="writer";
        div05.className ="view";
        div06.className ="sym";
        div07.className ="em";
        
        let {title,date,id,user} = i; //이거 안하면 아래처럼 해야됌
        // let ti=i.title;

        div01.innerHTML = id;
        div02.innerHTML = date;
        titleSpan.innerHTML = title;
        div04.innerHTML = user;
        div05.innerHTML = "0";
        div06.innerHTML = "0";
        div07.innerHTML = "0";

        if(a.length>10){

        // console.log("10개이상이라  여기들어옴");
        div03.append(titleSpan);  
        boardlist.append(div01,div02,div03,div04,div05,div06,div07);
        boardboard = document.querySelectorAll(".board-board");
        
        // boardboard[0].innerHTML="";
        boardboard[0].append(boardlist);
        }

        else{
            console.log("a의 랭스는"+a.length);
        div03.append(titleSpan);  
        boardlist.append(div01,div02,div03,div04,div05,div06,div07);
        boardboard.append(boardlist);
        }
        }
    
    })
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  if(a.length % 10==1 && a.length>10){
    // console.log(a.length);

    
    let pagenum02 = document.createElement("div");

    
    pagenum02.className="page-num";        
    pagenum02.innerText= `${parseInt(a.length/10)+1}`;
    pageNummain.append(pagenum02);


    // divboard.append(boardlist);
    // divboard.display="none";


    pageNum=document.querySelectorAll(".page-num");
    
    pageNum.forEach(function(i,index){

    boardboard = document.querySelectorAll(".board-board");
    console.log(i);

    i.onclick = function(){

        
        // console.log("클릭됨");
        console.log(pageNum.length);
        // console.log(boardboard);
        // console.log(boardboard[0]);
        // console.log(boardboard[1]);        
        let indexx= index+2;
        for (let i = 0; i < indexx; i++) { 
             console.log("나는"+ i);
            if(index == i){
                boardboard[i].style.display ="block";
            }

            if(index !== i && i!==(pageNum.length)){
                boardboard[i].style.display ="none";
            
            }
            if(i==(pageNum.length)){
                return;
            }
        }
        // boardboard[i].style.display ="none";
        // boardboard[i].style.display ="block";
    }
})
  }
  
}

function listrender(){
    // console.log("listrender");
    // console.log(document.querySelectorAll('.list1'));
    list1 = document.querySelectorAll(".list1");
    list1.forEach(function(i,index){

        // console.log(i);
        i.addEventListener('click', function(){
            console.log("나 클릭됨");
            console.log(a);
            console.log(a[0].content);
            content.style.display = "none";
            boardText.style.display = "none";
            written.style.display = "block";
            writtenContent.innerHTML = `${a[index].content}`;
            writtenDay.innerHTML = `${a[index].date}`;
            writtenTitle.innerHTML = `${a[index].title}`;
        });
    })
    // console.log("listrender...");
}

// function pagenation(){
//     console.log(a.length);
// }
// pagenation();
// boardText.insertAdjacentHTML('beforeend', '<div class ="board-list"><div class="number">div01</div><div class="day">2023-04-17</div><div class="list"><span class="list1">JY전자는 왜 맨날 떨어지냐?</span></div><div class="writer">이재영</div><div class="view">3</div><div class="sym">2</div><div class="em">0</div></div>');

backbtn.onclick = function () {
  written.style.display = "none";
  boardText.style.display = "block";
  content.style.display = "none";
}
