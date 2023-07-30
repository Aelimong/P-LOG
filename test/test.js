const slideContainer = document.querySelector(".slide-container");
const album = document.querySelector(".album");
const sentences = document.querySelectorAll(".album div");
const images = document.querySelectorAll(".images");
const firstSectionColor = ["#5D9061", "#D26A51", "#ABA35A", "#5561C7"];
let index = 1;
let index2 = 1;

makeClone();

slideContainer.addEventListener("click", () => {
  console.log("section click");

  for (let el of sentences) {
    el.style.opacity = 0;
  }

  let imgWidth = images[index].querySelector("img").width;
  console.log(imgWidth);

  //   간격은 조절해야 함
  album.style.transform = `translate(${-imgWidth * index2}px,0%)`;
  album.style.transition = "1s";

  sentences[index].style.opacity = 1;
  slideContainer.style.backgroundColor = firstSectionColor[index];

  if ((index2 === images.length) == 1) {
    setTimeout(function () {
      album.style.transition = "0s";
      album.style.transform = "translate(0%,0%)";
    }, 1000);
    index2 = 0;
  }

  index++;
  index2++;

  if (index == sentences.length) {
    index = 0;
  }
  console.log(index, index2);
});

// 1st, 2nd 뒤에 추가- 두번째도 보이기 떄문이다.
function makeClone() {
  let cloneSlideFirst = images[0].cloneNode(true);
  let cloneSlideSecond = images[1].cloneNode(true);
  album.append(cloneSlideFirst, cloneSlideSecond);
}
