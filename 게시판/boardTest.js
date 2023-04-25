let userData = '[{"key" : "value"}]';
userData = window.localStorage.getItem("로그인");

let signUp = document.querySelector(".signUp");

let written = document.querySelector(".written"); //게시글 전체
let backbtn = document.querySelector(".back-btn");

const boardText = document.querySelector(".board-text"); //게시판 전체
const submit = document.querySelector(".submit");
const boardTitle = document.querySelector(".main-title");
const boardContent = document.querySelector(".main-content");
const contentSelect = document.querySelector(".content");
const content = document.querySelector(".content");
let pagee = document.querySelector(".page-nation");
let searchBtn = document.querySelector(".search-btn");
let index;

let w = window.localStorage.getItem("로그인");
let Jsonw = JSON.parse(w);



if (localStorage.getItem('posts')) {
  index = JSON.parse(localStorage.getItem('posts')).length;
} else {
  index = 0;
}

window.onload = function() {
  showPostList(1)
  pageNation()
}

// 게시글 등록하기 누르면 글쓰는 화면 뜨게
signUp.onclick = function () {
  contentSelect.classList.toggle("popup"); // 맞음
  if(written.classList.contains("popup")){
      console.log("1")
      boardText.classList.remove("popup")
      written.classList.remove("popup")
  }
  else{
      console.log("2")
      boardText.classList.toggle("popup")
      pagee.classList.toggle("hide")
      
  }
}

//  객체에 추가
function addPost() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  if(title.length == 0 || content ==0){
     alert("제목과 내용을 모두 입력해주세요.")
     return;
  }

  let date = new Date().toISOString().substring(0, 10)
  let myname = Jsonw.nickname // 여기에 id
  // 새로운 게시물을 만듭니다.
  var post = {
    title: title,
    content: content,
    index: index,
    date : date,
    myname : myname,
    view: 0,
    like: 0,
    disLike : 0
  };

  // localStorage에서 이전 게시물 목록을 가져옵니다.
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  // 새로운 게시물을 배열에 추가합니다.
  posts.push(post);

  // 배열을 다시 localStorage에 저장합니다.
  localStorage.setItem("posts", JSON.stringify(posts));

contentSelect.classList.toggle("popup");
boardText.classList.toggle("popup");
pagee.classList.remove("hide") 

  // 글을쓰면 목록 초기화 시켜주기
  showPostList(1);
  pageNation()
  index++;
}

let logout = document.querySelector(".logout");

logout.onclick = function(){
    window.localStorage.removeItem("로그인");
    location.href= "../login/login_A.html"
}

// // 게시글 목록
function showPostList(page) {
  // localStorage에서 저장된 게시물 목록을 가져옵니다.
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  // 게시물 목록을 보여줍니다.
  // board-titile 밑에
  let list = document.getElementById("board-list");
  list.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let board = list.children[i] || document.createElement("div");
    //div 만들어줌 
    let div01 = document.createElement("div")
    let div02 = document.createElement("div")
    let div03 = document.createElement("div")
    let div04 = document.createElement("div")
    let div05 = document.createElement("div")
    let div06 = document.createElement("div")
    let div07 = document.createElement("div")
    // 목록에 div 7개 생성
    const arr = [div01, div02, div03, div04, div05, div06, div07];
    arr[0].innerHTML = (i+1); //div01 글번호
    arr[1].innerHTML = post.date; //날짜
    arr[2].innerHTML = post.title;
    arr[3].innerHTML = post.myname //글쓴이
    arr[4].innerHTML = post.view;
    arr[5].innerHTML = post.like;
    arr[6].innerHTML = post.disLike;
    // 클래스명도 넣어주고
    board.classList.add("board-list");
    arr[0].classList.add("number");
    arr[1].classList.add("day");
    arr[2].classList.add("list");
    arr[3].classList.add("writer");
    arr[4].classList.add("view");
    arr[5].classList.add("sym");
    arr[6].classList.add("em");
    // arr element 만큼 추가해줌
    arr.forEach((v) => {
      board.appendChild(v);
    });

    // 제목클릭하면 보여주기
    arr[2].onclick = (function (post) { // 클로저 활용  
      return function () {
        post.view += 1 // 조회수 올리고
        arr[4].innerHTML = post.view; // 밖에 조회수 올리고
        localStorage.setItem("posts", JSON.stringify(posts));
        showPost(post,i);
      };
    })(post);
    // i 는 페이지갯수의 인덱스 
    // i 가 9일때 까지만 목록에 그려줌 (10개 까지만)
    // page 가 0 일때 1 일때 2일때 계속 그려줌 11개 부터 1 
    if (~~(i/10) === page-1){ 
      list.appendChild(board); 
    }

  }
}

searchBtn.onclick = function () {
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  let searchInput = document.getElementById("search-input");
  let valueArr = document.getElementsByClassName("board-list");
  console.log("클릭")
  console.log(searchInput)

  for (let i = 0; i < valueArr.length; i++) {
    let InputValue = searchInput.value
    if(posts[i].title.includes(InputValue)){

      let dog1 = document.querySelector(".dog1");
      let dog2 = document.querySelector(".dog2");
      
      console.log("있음");
      valueArr[i].style.display = "flex";
      if(!dog2.classList.contains("pop")){
        dog1.style.display = "none";
        dog2.classList.add("pop")
        setTimeout(() => {
          dog1.style.display = "block";
          dog2.classList.remove("pop")
        }, 4100);
      }
    }
    else{ 
      console.log("없음");
      valueArr[i].style.display = "none";
    } 
  }
}

// 게시물 클릭하면 보여주기
function showPost(post,i) {
    
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  
  boardText.classList.toggle("popup")
  content.classList.remove("popup")
  written.classList.toggle("popup")
  pagee.classList.toggle("hide")
  // 토글 이슈 해결 i 값 매개변수로 받아와서 넣어줌
  document.querySelector(".written-sym2").onclick = function(){
    let post = posts[i]
    post.like += 1;
    document.querySelector(".written-sym").innerHTML = `공감 ${post.like}` ;
    localStorage.setItem("posts", JSON.stringify(posts));
  }
  document.querySelector(".written-em2").onclick = function () {
    let post = posts[i]
    post.disLike += 1;
    document.querySelector(".written-em").innerHTML = `비공감 ${post.disLike}` ;
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  // localStorage에서 저장된 게시물을 가져옵니다.
  let title = post.title;
  let postcontent = post.content;

  // 숨겨논 인풋 벨류에도 값을 담아줌
  let titleInput = document.getElementById("Retitle");
  titleInput.value = title;
  let contentInput = document.getElementById("Recontent");
  contentInput.value = postcontent;
  let titleInput2 = document.querySelector(".inputTitle")
  let contentInput2 = document.querySelector(".inputContent")
  // 게시물 클릭하면 수정버튼
  let firstRetouchBtn = document.querySelector(".firstRetouch")
  let updateBtn = document.querySelector(".retouch")
  // 삭제버튼
  let deleteBtn = document.querySelector(".delete")
  let writtenTitle = document.querySelector(".written-title")
  writtenTitle.innerHTML = "글제목 : " + title;
  let writtenContent = document.querySelector(".writtenContent")
  writtenContent.innerHTML = postcontent;

  document.querySelector(".written-day").innerHTML = post.date;
  document.querySelector(".written-writer").innerHTML = post.myname;
  document.querySelector(".written-view").innerHTML = `조회수 ${post.view}` ;
  document.querySelector(".written-sym").innerHTML = `공감 ${post.like}` ;
  document.querySelector(".written-em").innerHTML = `비공감 ${post.disLike}` ;

  console.log(post.myname);
  console.log(typeof(post.myname));
  console.log(Jsonw.nickname);
  console.log(typeof(Jsonw.nickname));

  if(post.myname == Jsonw.nickname){
        console.log("같아요")
        firstRetouchBtn.style.display="block";
        deleteBtn.style.display="block";
    }
    else if(post.myname !== Jsonw.nickname) {
        console.log("달라요")
        firstRetouchBtn.style.display="none";
        deleteBtn.style.display="none";
    }

  // 뒤로가기 버튼 누르면 
  backbtn.onclick = function () {

    if(written.classList.contains("popup")){
        written.classList.remove("popup")
        boardText.classList.add("popup")
        pagee.classList.remove("hide") 

    }
    

    showPostList(1);
  };
  // 수정1 버튼누르면
  firstRetouchBtn.onclick = function () {
    console.log("dd");
    updateBtn.style.display = "block"
    firstRetouchBtn.style.display = "none"
    titleInput2.style.display = "block"
    contentInput2.style.display = "block"
    writtenTitle.style.display = "none"
    writtenContent.style.display = "none"
  }
  // 수정2 버튼누르면 
  updateBtn.onclick = function () {
    firstRetouchBtn.style.display = "block"
    updateBtn.style.display = "none"
    // 인풋
    titleInput2.style.display = "none"
    contentInput2.style.display = "none"
    // 원본
    writtenTitle.style.display = "block"
    writtenContent.style.display = "block"
    updatePost(post);

  };
  // 삭제 버튼누르면
  deleteBtn.onclick = function () {
    deletePost(post);
  }
};



// 게시물 수정하기
function updatePost(post) {
  var title = document.getElementById("Retitle").value; //제목값
  var content = document.getElementById("Recontent").value; //내용

  // localStorage에서 저장된 게시물 목록을 객체로 가져옵니다.
  let posts = JSON.parse(localStorage.getItem("posts")) || []; //전체 다 받아오고
  // map 으로 원본값은 냅두고 값을 바꿔준다
  posts.map((a)=>{
    if(a.index==post.index){ //내가 선택한 인덱스가 포스트의 인덱스와 같으면 
      let b = {...a};
      b.title=title
      b.content=content;
      posts[posts.indexOf(a)] = b;
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  })
  document.querySelector(".written-title").innerHTML = "제목 : " + title;
  document.querySelector(".writtenContent").innerHTML = content;

  showPostList(1);
}

// 게시물 삭제
function deletePost(post) {

  // localStorage에서 저장된 게시물 목록을 객체로 가져옵니다.
  var posts = JSON.parse(localStorage.getItem("posts")) || []; //전체 다 받아오고
  // newTemp 에 posts 값만 복사해서 넣고 map 으로 원본값은 냅두고 값을 바꿔준다
  posts.map((a)=>{
    if(a.index==post.index){ //내가 선택한 인덱스가 포스트의 인덱스와 같으면 
      posts.splice(posts.indexOf(a),1)
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  })
  document.querySelector(".written-title").innerHTML = "";
  document.querySelector(".writtenContent").innerHTML = "";
  document.getElementById("Retitle").value = ""
  document.getElementById("Recontent").value = ""

  boardText.classList.toggle("popup")
  written.classList.toggle("popup")
  showPostList(1);
  pageNation()
}

function pageNation(){
  var posts = JSON.parse(localStorage.getItem("posts")) || []; //전체 다 받아오고
  const pageNum = document.querySelector(".page-num")
  pageNum.innerHTML = ""
  for (let i = 1; i <= ~~((posts.length-1)/10) + 1; i++) {
    if (posts.length == 0) return
      let numDiv = document.createElement("div")
      numDiv.classList.add("num");
      numDiv.innerHTML = i;
      numDiv.onclick = ()=>{
        // page 값 i 로 넘겨주기
        showPostList(i)
    }
    pageNum.appendChild(numDiv)
  }
}