let mainSecHeight = document.querySelector("#main-section").clientHeight;
let nav = document.querySelector(".nav");
let navHeight = nav.clientHeight;

document.addEventListener("scroll", () => {
  //scrollY가 메인섹션 높이까지 올때 헤더 스타일 변경!!
  if (window.scrollY <= mainSecHeight) {
    nav.setAttribute(
      "style",
      "background-color: transparent; backdrop-filter: blur(0px);"
    );
  } else {
    nav.setAttribute(
      "style",
      "background-color: rgba(84, 57, 57, 0.25); backdrop-filter: blur(25px);"
    );
  }
});

//let mainSection = document.querySelector("#main-section");
let circle = document.querySelector(".circle");

document.addEventListener("mousemove", (e) => {
  //마우스 좌표
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  circle.style.left = mouseX + "px";
  circle.style.top = mouseY + "px";

  // 마우스 브라우저 기준 Y 좌표
  let pageY = e.pageY;

  //1. 써클 div 만들고
  // const circleDiv = document.createElement("div");
  // circleDiv.classList.add("circle");
  // circleDiv.innerText = "CLICK";
  console.log(pageY); //계
  console.log(navHeight); //78
  // 2. append를 한 번만...??
  //메인 섹션 안에서만 보이고
  if (pageY >= navHeight && pageY <= mainSecHeight) {
    circle.style.display = "flex";
  } else {
    circle.style.display = "none";
  }
});
