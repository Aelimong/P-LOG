let mainSection = document.querySelector("#main-section");
let footer = document.querySelector("#footer");

let mainSecHeight = mainSection.clientHeight;
let footerHeight = footer.clientHeight;
let pageHeight = document.documentElement.scrollHeight;

/* web */
let nav = document.querySelector(".nav");
let navHeight = nav.clientHeight;

/* mobile */
let moNav = document.querySelector("header.mo-header");
let moNavHeight = moNav.clientHeight;

document.addEventListener("scroll", () => {
  // scrollY가 메인섹션 높이까지 올 때 헤더 스타일 변경!!
  // 전체 높이 - 푸터
  // console.log("1. 메인섹션 : " + mainSecHeight);
  // console.log("2. 푸터 높이 : " + footerHeight);
  // console.log("3. 메뉴 : " + navHeight);
  // console.log("4. 불투명 높이 : " + (pageHeight - footerHeight));
  // console.log("5. 현재 스크롤 : " + window.scrollY);

  //1. 푸터
  if (window.scrollY >= pageHeight - footerHeight) {
    nav.setAttribute(
      "style",
      "background-color: rgba(84, 57, 57, 0.25); backdrop-filter: blur(25px);"
    );
    moNav.setAttribute(
      "style",
      "background-color: rgba(84, 57, 57, 0.25); backdrop-filter: blur(25px);"
    );
    // 2. 메인 섹션
  } else if (window.scrollY < mainSecHeight) {
    nav.setAttribute(
      "style",
      "background-color: transparent; backdrop-filter: blur(0px);"
    );
    moNav.setAttribute(
      "style",
      "background-color: transparent; backdrop-filter: blur(0px);"
    );
    // 3. 나머지
  } else {
    nav.setAttribute(
      "style",
      "background-color: rgba(84, 57, 57, 0.25); backdrop-filter: blur(25px);"
    );
    moNav.setAttribute(
      "style",
      "background-color: rgba(84, 57, 57, 0.25); backdrop-filter: blur(25px);"
    );
  }
});

// 마우스 커서 따라다니기

let circle = document.querySelector(".circle");

// mainSection.addEventListener("mousemove", (e) => {
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
let slideWidth;
let slideMargin;

window.addEventListener("load", (event) => {
  console.log("슬라이드 이미지 너비 : " + slideWidth);
  let clientWidthInit = document.documentElement.clientWidth;

  // 768보다 큰 경우
  if (clientWidthInit >= 768) {
    // console.log("768보다 큼 - load");
    slideWidth = 35;
    slideMargin = 25;

    // 576보다 크고 768보다 작은 경우
  } else if (clientWidthInit < 768 && clientWidthInit >= 576) {
    // console.log("768보다 작고 576보다 큼 - load");
    slideWidth = 35;
    slideMargin = 25;

    //576보다 작은 경우
  } else {
    // console.log("576보다 작음 - load");
    slideWidth = 60;
    slideMargin = 14;
  }
  makeClone();
  updateWidth();
});

window.onresize = function (event) {
  console.log("사이즈 변경");
  let clientWidth = document.documentElement.clientWidth;
  if (clientWidth >= 768) {
    // console.log("768보다 큼 - resize");
    slideWidth = 35;
    slideMargin = 25;
  } else if (clientWidth < 768 && clientWidth >= 576) {
    // console.log("768보다 작고 576보다 큼 - resize");
    slideWidth = 35;
    slideMargin = 25;
  } else {
    // console.log("576보다 작음 - resize");
    slideWidth = 60;
    slideMargin = 14;
  }
};

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
  whiteText.innerText = whiteTextArr[currentIdx];
  greyText.innerText = greyTextArr[currentIdx];
}

// 모바일 메뉴 열기
const moHeader = document.querySelector(".mo-nav");
const openIcon = document.querySelector(".open-icon");
const closeIcon = document.querySelector(".close-icon");
const drawer = document.querySelector(".drawer");
const backDrop = document.querySelector(".back-drop");

openIcon.addEventListener("click", openMenu);
closeIcon.addEventListener("click", closeMenu);
backDrop.addEventListener("click", closeMenu);

// 메뉴 펼칠 때
function openMenu() {
  //슬라이드 메인으로
  if (moHeader.classList.contains("slide-to-side")) {
    moHeader.classList.remove("slide-to-side");
  }

  moHeader.classList.add("slide-to-main");

  //drawer 보이게
  // if (drawer.classList.contains("hide")) {
  //   drawer.classList.remove("hide");
  // }
  // drawer.classList.add("show");

  // backdrop 보이게
  if (backDrop.classList.contains("hide")) {
    backDrop.classList.remove("hide");
  }

  backDrop.classList.add("show");
  let backDropHeight = document.documentElement.scrollHeight;
  backDrop.setAttribute("style", `height: ${backDropHeight}px`);

  // 햄버거 메뉴 안 보이게
  if (openIcon.classList.contains("show")) {
    openIcon.classList.remove("show");
  }
  openIcon.classList.add("hide");
  openIcon.setAttribute("style", "opacity: 0");
}

// 메뉴 닫기
function closeMenu() {
  //슬라이드 사이드로
  if (moHeader.classList.contains("slide-to-main")) {
    moHeader.classList.remove("slide-to-main");
  }

  moHeader.classList.add("slide-to-side");

  // backdrop 안 보이게
  if (backDrop.classList.contains("show")) {
    backDrop.classList.remove("show");
  }

  backDrop.classList.add("hide");
  backDrop.setAttribute("style", `height: 0`);

  // 햄버거 메뉴 보이게
  if (openIcon.classList.contains("hide")) {
    openIcon.classList.remove("hide");
  }
  openIcon.classList.add("show");
  openIcon.setAttribute("style", "opacity: 1");
}
