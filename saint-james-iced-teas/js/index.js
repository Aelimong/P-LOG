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
  //console.log(pageY); //계
  //console.log(navHeight); //78
  // 2. append를 한 번만...??
  //메인 섹션 안에서만 보이고
  if (pageY >= navHeight && pageY <= mainSecHeight) {
    circle.style.opacity = "1";
  } else {
    // circle.style.scale = "1.1";
    circle.style.opacity = "0";
  }
});

let slideArr = document.getElementsByClassName("slides");
let mainSlide = document.getElementById("main-slide");
let slideX = 0;

let viewWidth = window.innerWidth;

//클릭하면 이미지 옆으로 슬라이드@!!!
function slideMainImages() {
  // for (let i = 0; i < slideArr.length; i++) {
  //   slideX += slideArr[i].width;
  //   slideArr[i].setAttribute(
  //     "style",
  //     `transform: translate3d(-${slideX}px, 0, 0px);`
  //   );
  //   console.log(slideArr[i].getAttribute("style"));
  //   //왼쪽으로 이동한 화면 크기가 뷰포트 너비를 넘어갈 때 0으로 초기화
  //   if (slideX > viewWidth) {
  //     slideArr[i].setAttribute("style", `transform: translate3d(0px, 0, 0px);`);
  //     slideX = 0;
  //   }
  // }
}

let colorArr = ["red", "blue", "green", "pink"];
let colorIndex = 0;

//섹션 배경 색깔 변경!!
function changeBackgroundColor(currentIndex) {
  //background-color: ${colorArr[colorIndex]}

  mainSlide.classList.toggle(colorArr[colorIndex]);

  colorIndex++;

  if (colorIndex === colorArr.length + 1) {
    colorIndex = 0;
  }
}
