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

let index;
if (localStorage.getItem('posts')) {
  index = JSON.parse(localStorage.getItem('posts')).length;
} else {
  index = 0;
}

window.onload = function() {
  showPostList()
}

// 게시글 등록하기 누르면 글쓰는 화면 뜨게
signUp.onclick = function () {
  written.style.display = "none";
  boardText.style.display = "none";
  contentSelect.style.display = "block";
};

//  객체에 추가
function addPost() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  let date = new Date().toISOString().substring(0, 10)
  let myname = "유동희"
  // 새로운 게시물을 만듭니다.
  var post = {
    title: title,
    content: content,
    index: index,
    date : date,
    myname : myname
  };

  // localStorage에서 이전 게시물 목록을 가져옵니다.
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  // 새로운 게시물을 배열에 추가합니다.
  posts.push(post);

  // 배열을 다시 localStorage에 저장합니다.
  localStorage.setItem("posts", JSON.stringify(posts));

  written.style.display = "none";
  boardText.style.display = "block";
  contentSelect.style.display = "none";

  // 글을쓰면 목록 초기화 시켜주기
  showPostList();
  index++;
}

// // 게시글 목록
function showPostList() {
  // localStorage에서 저장된 게시물 목록을 가져옵니다.
  var posts = JSON.parse(localStorage.getItem("posts")) || [];

  // 게시물 목록을 보여줍니다.
  // board-titile 밑에
  var list = document.getElementById("board-list");

  list.innerHTML = "";

  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];

    var board = list.children[i] || document.createElement("div");
    // span = post.title
    // var titleSpan = board.children[0] || document.createElement("span");
    var titleSpan = document.createElement("span");
    titleSpan.textContent = post.title;

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
    arr[2].appendChild(titleSpan);
    arr[2].innerHTML = post.title;
    div03.append(titleSpan);
    arr[3].innerHTML = post.myname //글쓴이
    arr[4].innerHTML = 0;
    arr[5].innerHTML = 0;
    arr[6].innerHTML = 0;

    // 클래스명도 넣어주고
    board.classList.add("board-list");
    titleSpan.classList.add("list1");
    arr[0].classList.add("number");
    arr[1].classList.add("day");
    arr[2].classList.add("list");
    arr[3].classList.add("writer");
    arr[4].classList.add("view");
    arr[5].classList.add("sym");
    arr[6].classList.add("em");

    // arr element 만큼 추가해줌
    arr.forEach((v,index) => {
      board.appendChild(v);
    });

    // 제목클릭하면 보여주기
    titleSpan.onclick = (function (post) { // 클로저 활용
      return function () {
        showPost(post);
      };
    })(post);

    list.appendChild(board);
  }
}

// 게시물 클릭하면 보여주기
function showPost(post) {
  content.style.display = "none";
  boardText.style.display = "none";
  written.style.display = "block";

  // localStorage에서 저장된 게시물을 가져옵니다.
  let title = post.title;
  let postcontent = post.content;

  // 숨겨논 인풋 벨류에도 값을 담아줌
  let titleInput = document.getElementById("Retitle");
  titleInput.value = title;
  let contentInput = document.getElementById("Recontent");
  contentInput.value = postcontent;

  // 게시물 클릭하면 수정버튼 뜨고 글쓰기 버튼 사라짐
  let updateBtn = document.querySelector(".retouch")
  // 삭제버튼
  let deleteBtn = document.querySelector(".delete")

  document.querySelector(".written-title").innerHTML = "글제목 : " + title;
  document.querySelector(".written-content").innerHTML = postcontent;
  document.querySelector(".written-day").innerHTML = post.date
  document.querySelector(".written-writer").innerHTML = post.myname

  // 뒤로가기 버튼 누르면 
  backbtn.onclick = function () {
    written.style.display = "none";
    boardText.style.display = "block";
    content.style.display = "none";
  };

  // 수정 버튼누르면 
  updateBtn.onclick = function () {
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
  document.querySelector(".written-content").innerHTML = "내용 : " + content;

  showPostList();
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
  document.querySelector(".written-content").innerHTML = "";
  document.getElementById("Retitle").value = ""
  document.getElementById("Recontent").value = ""

  written.style.display = "none";
  boardText.style.display = "block";
  contentSelect.style.display = "none";

  showPostList();
}

