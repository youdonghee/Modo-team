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

let index;
if (localStorage.getItem('posts')) {
  index = JSON.parse(localStorage.getItem('posts')).length;
} else {
  index = 0;
}

// window.onload = function() {
//   showPostList()
// }

// 게시글 등록하기 누르면 글쓰는 화면 뜨게
signUp.onclick = function () {
  written.style.display = "none";
  boardText.style.display = "none";
  contentSelect.style.display = "block";
};

//   // 객체에 추가되는거 확인함!! 
function addPost() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  // 새로운 게시물을 만듭니다.
  var post = {
    title: title,
    content: content,
    index: index
  };

  // localStorage에서 이전 게시물 목록을 가져옵니다.
  var posts = JSON.parse(localStorage.getItem("posts")) || [];

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
  var list = document.getElementById("post-list");

  list.innerHTML = "";

  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];

    var board = list.children[i] || document.createElement("div");
    var titleSpan = board.children[0] || document.createElement("span");
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

    arr[0].innerHTML = post.index + 1; //div01 글번호
    console.log(arr[0]);
    console.log(post.index);
    arr[1].innerHTML = new Date().toISOString().substring(0, 10); //날짜
    //const data = new Date().toISOString().substring(0, 10);

    arr[2].appendChild(titleSpan);
    arr[2].innerHTML = title;
    div03.append(titleSpan);
    arr[3].innerHTML = ""; //글쓴이
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

    titleSpan.onclick = (function (post) { // 클로저 활용
      return function () {
        showPost(post);
      };
    })(post);
    board.appendChild(titleSpan);
    list.appendChild(board);
  }
}

// 게시물 클릭하면 보여주기
function showPost(post) {
  // localStorage에서 저장된 게시물을 가져옵니다.
  var title = post.title;
  var content = post.content;
  // // 게시물 클릭하면 수정버튼 뜨고 글쓰기 버튼 사라짐
  // let updateBtn = document.querySelector(".updateBtn")
  // updateBtn.style.display = "block"
  // // 삭제버튼
  // let deleteBtn = document.querySelector(".deleteBtn")
  // deleteBtn.style.display = "block"
  // let addBtn = document.querySelector(".signUp");
  // addBtn.style.display = "none";
  // // 화면에 게시물을 보여줍니다.
  // var titleInput = document.getElementById("title");
  // var contentInput = document.getElementById("content");
  // titleInput.value = title;
  // contentInput.value = content;
  // document.querySelector(".showtitle").innerHTML = "제목 : " + title;
  // document.querySelector(".showcontent").innerHTML = "내용 : " + content;

  // // 수정 버튼누르면 
  // updateBtn.onclick = function () {
  //   updatePost(post);
  // };
  // // 삭제 버튼누르면
  // deleteBtn.onclick = function () {
  //   deletePost(post);
  // }
};



// // 게시물 수정하기
// function updatePost(post) {
//   var title = document.getElementById("title").value; //제목값
//   var content = document.getElementById("content").value; //내용
//   // localStorage에서 저장된 게시물 목록을 객체로 가져옵니다.
//   var posts = JSON.parse(localStorage.getItem("posts")) || []; //전체 다 받아오고
// // newTemp 에 posts 값만 복사해서 넣고 map 으로 원본값은 냅두고 값을 바꿔준다
//   posts.map((a)=>{
//     if(a.index==post.index){ //내가 선택한 인덱스가 포스트의 인덱스와 같으면 
//       var b = {...a};
//       b.title=title
//       b.content=content;
//       posts[posts.indexOf(a)] = b;
//       localStorage.setItem("posts", JSON.stringify(posts));
//     }
//   })
//   document.querySelector(".showtitle").innerHTML = "제목 : " + title;
//   document.querySelector(".showcontent").innerHTML = "내용 : " + content;
//   document.getElementById("title").value = ""
//   document.getElementById("content").value = ""
//   let updateBtn = document.querySelector(".updateBtn")
//   updateBtn.style.display="none"
//   let deleteBtn = document.querySelector(".deleteBtn")
//   deleteBtn.style.display="none"
//   let addBtn = document.querySelector(".signUp");
//   addBtn.style.display = "block";
//   showPostList();
// }

// // 게시물 삭제
// function deletePost(post) {
//   // localStorage에서 저장된 게시물 목록을 객체로 가져옵니다.
//   var posts = JSON.parse(localStorage.getItem("posts")) || []; //전체 다 받아오고
// // newTemp 에 posts 값만 복사해서 넣고 map 으로 원본값은 냅두고 값을 바꿔준다
//   posts.map((a)=>{
//     if(a.index==post.index){ //내가 선택한 인덱스가 포스트의 인덱스와 같으면 
//       posts.splice(posts.indexOf(a),1)
//       localStorage.setItem("posts", JSON.stringify(posts));
//     }
//   })
//   document.querySelector(".showtitle").innerHTML = "";
//   document.querySelector(".showcontent").innerHTML = "";
//   document.getElementById("title").value = ""
//   document.getElementById("content").value = ""
//   let updateBtn = document.querySelector(".updateBtn")
//   updateBtn.style.display="none"
//   let deleteBtn = document.querySelector(".deleteBtn")
//   deleteBtn.style.display="none"
//   let addBtn = document.querySelector(".signUp");
//   addBtn.style.display = "block";
//   showPostList();
// }

