let userData = '[{"key" : "value"}]';
userData = window.localStorage.getItem("로그인");
let userDataArr = JSON.parse(userData);
console.log(userDataArr);
console.log(userDataArr.id);
//---------------------------------------------------------------------------------------------

//-------게시글 등록영역 - 제목과 내용을 모두 입력해야만 등록이 클릭. 로컬스토리지에 담긴다.---------
let addTitleInput = document.getElementById('addTitle-input');       //제목 인풋
let addTextarea = document.getElementById("main");                   //내용 텍스트아리아
let addBtn = document.querySelector(".add-btn");                      //등록하기 버튼
addBtn.onclick = function () {
    // console.log(addTextarea.value)
    // console.log(addTextarea.value.length)
    // console.log(addTitleInput.value)
    // console.log(addTitleInput.value.length)
    
    
    let board = window.localStorage.getItem("게시판");
    let boardArr1 = JSON.parse(board);
    // console.log(boardArr1.length)

    if (addTitleInput.value.length != 0 && addTextarea.value.length != 0 ) {
        if (board) {
            var boardArr = JSON.parse(localStorage.getItem("게시판"));
            boardArr.push({ no:boardArr1.length+1, id: userDataArr.id, nick: userDataArr.nickname, title: addTitleInput.value, text: addTextarea.value, view: 0, like: 0 });
            window.localStorage.setItem("게시판", JSON.stringify(boardArr));
            document.querySelector(".board-add").classList.remove("popup");
            document.querySelector(".board-ground").classList.add("popup");
            addTitleInput.value = "";
            addTextarea.value = "";
        }
        else {
            console.log("as")
            window.localStorage.setItem("게시판", JSON.stringify([{ no:/*boardArr1[index]+*/1, id: userDataArr.id, nick: userDataArr.nickname, title: addTitleInput.value, text: addTextarea.value, view: 0, like: 0 }]))
            document.querySelector(".board-add").classList.remove("popup");
            document.querySelector(".board-ground").classList.add("popup");
            addTitleInput.value = "";
            addTextarea.value = "";
            // num++;
            
        }
        //게시판 그리는 함수 추가하기
        // console.log(boardArr.pop(boardArr))

    }
    else {
        alert("제목과 내용을 입력해주세요!")
    }
    // num++;
    render();
}
//---------------------------------------------------------------------------------------------


//-------게시글 리스트영역 - 게시글을 등록하면 게시글 리스트에 추가되어야 한다.---------------------
function render(){
    let boardData = window.localStorage.getItem("게시판");
    let boardArr = JSON.parse(boardData);
    let boardDiv = document.querySelector(".board-bottom");

    //-------게시글 리스트영역 - 게시글을 등록하기를 클릭하면 게시글 등록 팝업이 뜬다.-------------------
    let boardaddBtn = document.querySelector(".boardadd-btn");

    boardaddBtn.onclick = function(){
        console.log("클릭")
        document.querySelector(".board-add").classList.toggle("popup")
        if(document.querySelector(".board-text").classList.contains("popup")){
            console.log("1")
            document.querySelector(".board-ground").classList.remove("popup")
            document.querySelector(".board-text").classList.remove("popup")
        }
        else{
            console.log("2")
            document.querySelector(".board-ground").classList.toggle("popup")
        }

        // console.log(document.querySelector(".board-text").classList.contains("popup"))
        // document.querySelector(".board-text").classList.remove("popup")

    }

//---------------------------------------------------------------------------------------------


    //------게시글 제목 영역 그리기---------------------------------------
    let _ul = document.createElement("ul");
    let _li = document.createElement("li");
    let _div1 = document.createElement("div");
    let _div2 = document.createElement("div");
    let _div3 = document.createElement("div");
    let _div4 = document.createElement("div");
    let _div5 = document.createElement("div");
    
    _li.className = "borderAddList"
    _div1.className = "boardDiv1";
    _div2.className = "boardDiv2";
    _div3.className = "boardDiv3";
    _div4.className = "boardDiv4";
    _div5.className = "boardDiv5";


    boardDiv.innerHTML = "";

    _div1.innerHTML = "번호";
    _div2.innerHTML = "제목";
    _div3.innerHTML = "작성자";
    _div4.innerHTML = "조회수";
    _div5.innerHTML = "공감";

    _li.append(_div1,_div2,_div3,_div4,_div5);
    _ul.append(_li);
    //-------------------------------------------------------------------



    //-----게시글 내용 그리기 --------------------------------------------
    boardArr.forEach(function(i, index){
        let _li = document.createElement("li");
        let _div1 = document.createElement("div");
        let _div2 = document.createElement("div");
        let _div3 = document.createElement("div");
        let _div4 = document.createElement("div");
        let _div5 = document.createElement("div");
        
        _li.className = "borderAddList";
        _div1.className = "boardDiv1";
        _div2.className = "boardDiv2";
        _div3.className = "boardDiv3";
        _div4.className = "boardDiv4";
        _div5.className = "boardDiv5";

        _div1.innerHTML = (i).no;
        _div2.innerHTML = (i).title;
        _div3.innerHTML = (i).id;
        _div4.innerHTML = (i).view;
        _div5.innerHTML = (i).like;

        //-------게시글 리스트영역 - 게시글을 클릭하면 해당 게시글의 본문 팝업이 떠야 한다.--------
        _div2.onclick = function(){
            let board = window.localStorage.getItem("게시판");
            let boardArr = JSON.parse(board);

            document.querySelector(".board-ground").classList.toggle("popup")
            document.querySelector(".board-add").classList.remove("popup")
            document.querySelector(".board-text").classList.toggle("popup")


            // 텍스트영역에 값을 넣어준다.
            document.querySelector(".text-title").innerHTML = i.title
            document.querySelector(".text-nick").innerHTML = i.nick
            document.querySelector(".text-view").innerHTML = i.view
            document.querySelector(".text-like").innerHTML = i.like
            document.querySelector(".text-board").innerHTML = i.text

            //--------- 페이지 본문에서 닫기 버튼을 클릭하면 게시판 리스트로 넘어간다. -------------------------
            let closer = document.querySelector(".closer");

            closer.onclick = function(){
                //조회수를 증가시킨다.
                let a = i.view += 1;
                boardArr[index].view = a
                window.localStorage.setItem("게시판",JSON.stringify(boardArr));
                render();
                
                document.querySelector(".board-ground").classList.toggle("popup")
                document.querySelector(".board-text").classList.toggle("popup")
            }
            //---------------------------------------------------------------------------------------------

            //--------- 페이지 본문에서 삭제 버튼을 클릭하면 해당 로컬이 삭제되며 알럿이 뜨고 게시판 리스트로 넘어간다.
            let remove = document.querySelector(".remove");

            remove.onclick = function(){
                boardArr.splice(index,1);
                window.localStorage.setItem("게시판",JSON.stringify(boardArr));
                render();
                document.querySelector(".board-ground").classList.toggle("popup")
                document.querySelector(".board-text").classList.toggle("popup")
            }
            //---------------------------------------------------------------------------------------------


            //--------- 페이지 본문에서 공감 버튼을 클릭하면 로컬에 데이터가 적용된다.--------------------------
            let like = document.querySelector(".like");

            like.onclick = function(){
                let a = i.like += 1;
                boardArr[index].like = a
                window.localStorage.setItem("게시판",JSON.stringify(boardArr));
                render();
            }
            //----------------------------------------------------------------------------------------------

            //--------- 페이지 본문에서 수정 버튼을 클릭하면 로컬 데이터불러와져 수정이 진행된다.-----------------
            let edit = document.querySelector(".edit");

            let board2 = window.localStorage.getItem("게시판");
            let boardArr2 = JSON.parse(board2); 
            

            edit.onclick = function(){
                let reText = window.localStorage.setItem("게시판",JSON.stringify({no:boardArr2.length+1, id: userDataArr.id, nick: userDataArr.nickname, title: addTitleInput.value, text: addTextarea.value, view: i.view, like:i.like }))
                
                boardArr2.splice(index,1,reText);
                render();
            }
        }
        //-----------------------------------------------------------------------------------
        _li.append(_div1,_div2,_div3,_div4,_div5);
        _ul.append(_li);
    });
    boardDiv.append(_ul);
}
render();
//---------------------------------------------------------------------------------------------



//-------게시글 리스트영역 - 로그아웃 영역을 클릭하면 로컬 로그인 키가 클리어되고, 로그인페이지로 이동한다.
//---------------------------------------------------------------------------------------------


//-------게시글 리스트영역 - 게시글을 순서를 클릭하면 해당 순서로 리스트가 세팅된다.-----------------
//---------------------------------------------------------------------------------------------


//-------게시글 리스트영역 - 검색을 하면 해당 내용에 관련된 내용의 게시글이 뜬다.-------------------
//---------------------------------------------------------------------------------------------


//-------게시글 리스트영역 - 페이지네이션--------------------------------------------------------
//---------------------------------------------------------------------------------------------