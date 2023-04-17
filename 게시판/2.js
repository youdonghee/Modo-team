document.querySelector(".btn").onclick = function () {
  window.location.href = "./1.html";
  alert("등록 되었습니다.");

  let a = document.querySelector(".text", ".text2");

  aa = a.value;
  window.localStorage.setItem("글제목", aa);

  console.log(aa);
};
