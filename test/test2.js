let slides = document.querySelector(".slides");
//슬라이드는 여러개이니까 qeurySlectorAll
let slide = document.querySelectorAll(".slides li");

// 현재 몇번째 슬라이드를 보는지 파악하기 위해
let currentIdx = 0;

// 슬라이드의 개수를 알아야 어디까지 이동했는지 알 수 있다
let slideCount = slide.length;

//슬라이드 너비, 간격을 알아야 전체 길이를 알 수 있다.
let slideWidth = 30;

let slideMargin = 5;

let firstSection = document.querySelector(".first-section");

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
  }, 100);
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

firstSection.addEventListener("click", function () {
  moveSlide(currentIdx + 1);
});

function moveSlide(num) {
  // 각 슬라이드의 너비와 마진값을 더한만큼 왼쪽으로 - 이동해야함!
  slides.style.left = -num * (slideWidth + slideMargin) + "vw";
  currentIdx = num;
  console.log(currentIdx, slideCount);

  //이동(0.5초)을 한 다음에 바뀌어야함!
  if (currentIdx === slideCount) {
    setTimeout(function () {
      slides.classList.remove("animated");
      slides.style.left = "0";
      currentIdx = 0;
    }, 500);
    setTimeout(function () {
      slides.classList.add("animated");
    }, 600);
  }
}
