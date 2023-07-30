let mainSecHeight = document.querySelector("#main-section").clientHeight;
let nav = document.querySelector(".nav");
let navHeight = nav.clientHeight;

document.addEventListener("scroll", () => {
  //scrollY가 메인섹션 높이까지 올 때 헤더 스타일 변경!!
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

// let circle = document.querySelector(".circle");

// document.addEventListener("mousemove", (e) => {
//   //마우스 좌표
//   const mouseX = e.clientX;
//   const mouseY = e.clientY;
//   circle.style.left = mouseX + "px";
//   circle.style.top = mouseY + "px";

//   // 마우스 브라우저 기준 Y 좌표
//   let pageY = e.pageY;

//   //1. 써클 div 만들고
//   const circleDiv = document.createElement("div");
//   circleDiv.classList.add("circle");
//   circleDiv.innerText = "CLICK";

//   // 2. append를 한 번만...??
//   let slideWrapper = document.querySelector(".slide-wrapper");
//   slideWrapper.appendChild(circleDiv);
//   //console.log(pageY); //계
//   //console.log(navHeight); //78

//   //메인 섹션 안에서만 보이고
//   if (pageY >= navHeight && pageY <= mainSecHeight) {
//     circle.style.opacity = "1";
//   } else {
//     // circle.style.scale = "1.1";
//     circle.style.opacity = "0";
//   }
// });

let slides = document.querySelector(".slides");
let slide = document.querySelectorAll(".slides li");

// 현재 몇번째 슬라이드를 보는지 파악하기 위해
let currentIdx = 0;

// 슬라이드의 개수를 알아야 어디까지 이동했는지 알 수 있다
let slideCount = slide.length;

//슬라이드 너비, 간격을 알아야 전체 길이를 알 수 있다.
let slideWidth = 30;
let slideMargin = 25;

let mainSection = document.querySelector("#main-section");
let mainText = document.querySelector(".main-text");
let mainTitle = document.querySelector(".main-title");
let whiteText = document.querySelector(".white-text");
let greyText = document.querySelector(".grey-text");

//배경색 리스트
const bgColorArr = ["#D26A51", "#ABA35A", "#5561C7", "#B2956D", "#5d9061"];

//텍스트 리스트
const whiteTextArr = [
  "PASSIONFRUIT & PEACH TEA",
  "PINEAPPLE & MANGO TEA",
  "BLUEBERRY & RASPBERRY TEA",
  "BLOOD ORANGE & HIBISCUS TEA",
  "ORIGINAL GREEN TEA",
];

const greyTextArr = [
  "SUBTLY SWEET",
  "PERFECTLY PLAYFUL",
  "COOL AND REFRESHING",
  "CRISP AND EASY",
  "A CLEAN TAKE ON A CLASSIC",
];

makeClone();

/**
 * 복사본 만드는 함수
 * 슬라이드 개수에 따라서 5개를 복사본을 만들어서 앞, 뒤로 추가함
 */
function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    //a.cloneNode(), a.cloneNode(true) => 자식 요소까지 전부 복사
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    //a.appendChild(b)
    slides.appendChild(cloneSlide);
  }

  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    //a.prepend(b)
    slides.prepend(cloneSlide);
  }

  updateWidth();

  //초기 위치 잡기
  setInitialPos();

  // 다 배치한 후에 약간의 시간을 두고 animated 클래스 붙여주기
  setTimeout(function () {
    slides.classList.add("animated");
    mainTitle.classList.add("animated");
  }, 50);
}

function updateWidth() {
  //전체 개수 구하고 각 슬라이드의 너비와 마진값을 더해서 곱하기!
  // ( 너비 + 마진 ) * 전체 개수 - 마진

  //현재 슬라이드 요소를 새로 받아와야함!
  let currentSlides = document.querySelectorAll(".slides li");
  let newSlideCount = currentSlides.length;

  let newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "vw";

  slides.style.width = newWidth;
}

function setInitialPos() {
  let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  //slides { transform: translateX(-1000px);}
  slides.style.transform = `translateX(${initialTranslateValue}vw)`;
}

mainSection.addEventListener("click", function () {
  moveSlide(currentIdx + 1);

  //배경색 변경
  changeBackColor(currentIdx - 1);

  // 텍스트 변경
  changeMainText(currentIdx - 1);
});

function moveSlide(num) {
  // 각 슬라이드의 너비와 마진값을 더한만큼 왼쪽으로 - 이동해야함!
  slides.style.left = -num * (slideWidth + slideMargin) + "vw";
  currentIdx = num;
  //console.log(currentIdx, slideCount);

  //이동(0.5초)을 한 다음에 바뀌어야함!
  if (currentIdx === slideCount) {
    setTimeout(function () {
      slides.classList.remove("animated");
      mainTitle.classList.remove("animated");
      slides.style.left = "0";
      currentIdx = 0;
    }, 500);
    setTimeout(function () {
      slides.classList.add("animated");
      mainTitle.classList.add("animated");
    }, 600);
  }
}

//배경색 변경
function changeBackColor(currentIdx) {
  // 현재 인덱스가 0이면
  // arr[0]의 컬러를 메인섹션 & 텍스트 백그라운드 컬러로 CSS 변경
  mainSection.style.backgroundColor = bgColorArr[currentIdx];
  mainText.style.backgroundColor = bgColorArr[currentIdx];
}

// 텍스트 변경
function changeMainText(currentIdx) {
  console.log(typeof whiteTextArr[currentIdx]);
  whiteText.innerText = whiteTextArr[currentIdx];
  greyText.innerText = greyTextArr[currentIdx];
}
