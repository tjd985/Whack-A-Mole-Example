const moleEls = document.querySelectorAll("td > img");
const buttonEL = document.querySelector("button.start");
const tableEl = document.querySelector("table");
const crtpointEl = document.querySelector(".footer>.point>.currentPoint");

let arr = [];
let cnt = 0;
let point = 0;
let timer;

function showRandomMole() {
  cnt++;
  if (cnt > 10) {
    buttonEL.style.pointerEvents = "auto";
    buttonEL.textContent = "TRT AGAIN";
    showEnd();
    return;
  }

  let randomNum = Math.floor(Math.random() * 9);
  if (arr.length === 0 || arr[arr.length - 1] !== randomNum) {
    arr.push(randomNum);
  } else {
    while (arr[arr.length - 1] === randomNum) {
      randomNum = Math.floor(Math.random() * 8);
    }
    arr.push(randomNum);
  }

  moleEls[randomNum].classList.add("show");
  timer = setTimeout(() => {
    hideMole(moleEls[randomNum]);
  }, 3000);

  tableEl.addEventListener("click", catchMole);
}

function hideMole(clickedMole) {
  clickedMole.classList.remove("show");
  setTimeout(showRandomMole, 1000);
}

function catchMole(event) {
  if (event.target.tagName !== "IMG") return;
  crtpointEl.textContent = ++point;
  clearTimeout(timer);

  const clickedMole = document.querySelector("img.show");
  clickedMole.classList.remove("show");
  setTimeout(showRandomMole, 1000);
}

function start() {
  buttonEL.style.pointerEvents = "none";
  buttonEL.textContent = "NOW PLAYING";
  point = 0;
  cnt = 0;
  arr = [];
  crtpointEl.textContent = point;
  setTimeout(showRandomMole, 1000);
}

function showEnd() {
  const showScoreEl = document.querySelector(".scoreModal>p");
  showScoreEl.textContent = point * 10;

  const scoreEl = document.querySelector(".scoreModal");
  scoreEl.style.display = "flex";

  function closeScore() {
    scoreEl.style.display = "none";
  }
  const closeBtnEl = document.querySelector(".closeButton");
  closeBtnEl.addEventListener("click", closeScore);
}

buttonEL.addEventListener("click", start);
