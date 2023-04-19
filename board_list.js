let userData = '[{"key" : "value"}]';
userData = window.localStorage.getItem("로그인");
console.log(userData);

let signUp = document.querySelector(".signUp");
let list1 = document.querySelectorAll(".list1");
let written = document.querySelector(".written");
let backbtn = document.querySelector(".back-btn");

signUp.onclick = function () {
  written.style.display = "none";
  boardText.style.display = "none";
  content.style.display = "block";
};

const boardText = document.querySelector(".board-text");
const submit = document.querySelector(".submit");
const boardTitle = document.querySelector(".main-title");
const boardContent = document.querySelector(".main-content");
const content = document.querySelector(".content");

// 페이지가 다 렌더 됬을때 실행되는 자동으로 실행
// 페이지가 처음 렌더 되었을 때 board라는 키값을 가진 데이터를 찾음
// 없으면 게시글이 없는거고, 있으면 게시글을 화면에 넣어줌
document.addEventListener("DOMContentLoaded", () => {
  // 게시글 있는지 확인함
  if (localStorage.getItem("board")) {
    // 게시글 데이터 가져옴
    const board = getDataFromLocalStorage();
    // 게시글 데이터 화면에 뿌려줌
    let index = location.hash.replace("#", "");
    getBoardList(board, index);
  }
});

submit.onclick = (event) => {
  event.preventDefault();
  const boardTitleData = boardTitle.value;
  const boardContentData = boardContent.value;

  const data = new Date().toISOString().substring(0, 10);
  const board = createBoard(2, data, boardTitleData);

  // 조립한 게시글 내용을 게시글 목록에 넣어줌
  boardText.appendChild(board);

  written.style.display = "none";
  boardText.style.display = "block";
  content.style.display = "none";
};

// 게시글 내용들을 조립?하는 느낌
let boardCounter = 2;
const createBoard = (num, date, title) => {
  const board = document.createElement("div");
  const titleSpan = document.createElement("span");
  const arr = [
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
  ];

  titleSpan.innerHTML = title;
  arr[0].innerHTML = boardCounter++;
  arr[1].innerHTML = date;
  arr[2].appendChild(titleSpan);
  arr[3].innerHTML = "";
  arr[4].innerHTML = 0;
  arr[5].innerHTML = 0;
  arr[6].innerHTML = 0;

  board.classList.add("board-list");
  titleSpan.classList.add("list1");
  arr[0].classList.add("number");
  arr[1].classList.add("day");
  arr[2].classList.add("list");
  arr[3].classList.add("writer");
  arr[4].classList.add("view");
  arr[5].classList.add("sym");
  arr[6].classList.add("em");

  arr.forEach((v) => {
    board.appendChild(v);
  });

  // 로컬스토리지에 넣을 게시글 데이터 목록에 객체임 [{}]
  const boardData = {
    num: num,
    date: date,
    title: title,
    writer: "이충민",
    view: 0,
    sym: 0,
    em: 0,
  };

  // 로컬스토리지에 데이터 저장
  saveDataToLocalStorage(boardData);

  return board;
};

// 가져온 게시글 데이터를 조립해줘야 함
// 게시글 리스트가 [{},{}] 이렇게 있는데 이거를 이제 반복문 돌려서
// 게시글 수 만큼 조립을 해서 화면에 넣어줄거임
const getBoardList = (data, index) => {
  let boardData = JSON.parse(data);
  boardData = boardData.slice(index * 10, 10);
  // 현재 갯수에서 index * 10 단위로 자르고 그 뒤에 10개를 가져온다.
  for (let i = 0; i < boardData.length; i++) {
    const board = document.createElement("div");
    const titleSpan = document.createElement("span");
    const arr = [
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
    ];

    titleSpan.innerHTML = boardData[i].title;
    arr[0].innerHTML = boardData[i].num;
    arr[1].innerHTML = boardData[i].date;
    arr[2].appendChild(titleSpan);
    arr[3].innerHTML = boardData[i].writer;
    arr[4].innerHTML = boardData[i].view;
    arr[5].innerHTML = boardData[i].sym;
    arr[6].innerHTML = boardData[i].em;

    board.classList.add("board-list");
    titleSpan.classList.add("list1");
    arr[0].classList.add("number");
    arr[1].classList.add("day");
    arr[2].classList.add("list");
    arr[3].classList.add("writer");
    arr[4].classList.add("view");
    arr[5].classList.add("sym");
    arr[6].classList.add("em");

    arr.forEach((v) => {
      board.appendChild(v);
    });

    boardText.appendChild(board);
  }
};

// 로컬스토리지에 데이터 저장 => 게시글이 생성 될 때마다 실행될 거임
// 데이터를 받음 => 객체 형태임 => 객체 형태 그대로 넣어주는데
// 로컬스토리지에 key : value 형태로 값이 들어감 => JSON.stringify() 이걸 이용해서 객체를 문자열로 바꿔줌
// 이렇게 하면 한 key 값에 게시글 목록을 전부 다 넣을 수 있음
function saveDataToLocalStorage(data) {
  // 최초로 게시글을 등록하는지 확인
  if (localStorage.getItem("board")) {
    // 기존 게시글 목록이 있을때 실행
    // 기존 게시글 목록을 가져옴
    // JSON.parse로 원래의 형태로 바꿔줄거임 => [{},{}]
    const boardList = JSON.parse(localStorage.getItem("board"));
    // 기존 게시글 목록에 새로운 게시글을 넣어줌
    // 배열안에 새로운 게시글 데이터 객체를 넣음
    boardList.push(data);
    // 다시 로컬스토리지의 추가된 게시글을 업데이트
    localStorage.setItem("board", JSON.stringify(boardList));
  } else {
    // 처음 게시글을 작성할 때 실행
    localStorage.setItem("board", JSON.stringify([data]));
  }
}

// board라는 키값을 가진 data를 찾아옴 => 게시글 리스트 [{}]
function getDataFromLocalStorage() {
  const data = localStorage.getItem("board");
  return data;
}

list1.forEach(function (i, index) {
  i.onclick = function () {
    content.style.display = "none";
    boardText.style.display = "none";
    written.style.display = "block";
  };
});

list1[0].onclick = function () {
  content.style.display = "none";
  boardText.style.display = "none";
  written.style.display = "block";
};

backbtn.onclick = function () {
  written.style.display = "none";
  boardText.style.display = "block";
  content.style.display = "none";
};
