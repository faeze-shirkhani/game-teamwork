localStorage.setItem("gameLevel", "medium");
localStorage.setItem("user", JSON.stringify({ name: "Ali", score: 10 }));

const gameLevel = localStorage.getItem("gameLevel");
const user = JSON.parse(localStorage.getItem("user"));

const settingGame = {
  easy: { time: 5 * 60, point: 5, length: 6 },
  medium: { time: 10 * 60, point: 10, length: 8 },
  hard: { time: 15 * 60, point: 20, length: 10 },
};

let gameOver = false;

// set number of tries
let remainGuesses = 10;
const tries = document.querySelector(".remaining span");
tries.textContent = remainGuesses;

// Set up the game settings based on the user's choice

const setting = settingGame[gameLevel];
let timeLeft = setting.time;
const point = setting.point;
const passLength = setting.length;

// set a timer
const timerElement = document.querySelector(".timer span");

const timer = setInterval(() => {
  const minutes = Math.floor(timeLeft / 60);
  const secend = timeLeft % 60;

  timerElement.textContent = `${minutes}:${secend.toString().padStart(2, "0")}`;

  if (timeLeft <= 10) timerElement.style.color = "red";
  if (timeLeft <= 0) {
    clearInterval(timer);
    alert(`time is up!Game over. correct pass:${randomPassword.join(",")} `);
    window.location.href = "home.html";
    return;
  }
  timeLeft--;
}, 1000);

// generate a password

const colors = ["red", "yellow", "orange", "green", "purple", "blue"];

let randomPassword = generatepass(passLength);

console.log(randomPassword);

function generatepass(length) {
  const pass = [];

  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * colors.length);
    pass.push(colors[rand]);
  }

  return pass;
}

// color buttons

let currentGesse = [];

const colorBtnsBox = document.querySelector(".colorBtns");

const currentGesseBox = document.querySelector(".curentGuess");

colors.forEach((color) => {
  const colorBtnDiv = document.createElement("div");

  colorBtnDiv.style.backgroundColor = color;

  colorBtnDiv.className = "divColor";
  colorBtnsBox.append(colorBtnDiv);

  colorBtnDiv.addEventListener("click", (e) => {
    // console.log(e);
    if (currentGesse.length >= passLength) return;

    const colorBtnDiv = document.createElement("div");

    colorBtnDiv.style.backgroundColor = color;

    colorBtnDiv.className = "divColor";

    currentGesseBox.append(colorBtnDiv);

    currentGesse.push(color);
    // console.log(currentGesse);
  });
});

//  reset btn

const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", () => {
  currentGesseBox.innerHTML = " <p>Your curent guess:</p>";
  currentGesse = [];
});

// guess checker
function guesscheker(guess, password) {
  let correct = 0;
  let misplaced = 0;

  let guessCopy = [...guess];
  let passwordCopy = [...password];

  // right place
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === password[i]) {
      correct++;
      guessCopy[i] = null;
      passwordCopy[i] = null;
    }
  }

  // misplaced color
  for (let i = 0; i < guess.length; i++) {
    if (guessCopy[i] && passwordCopy.includes(guessCopy[i])) {
      misplaced++;
      passwordCopy[passwordCopy.indexOf(guessCopy[i])] = null;
    }
  }
  return { correct, misplaced };
}

//  show guess
const historyBox = document.querySelector(".history");

function displayGuess(guess, correct, misplaced) {
  const divguesscontainer = document.createElement("div");

  divguesscontainer.classList =
    "d-flex justify-content-between align-items-center my-4";

  const divguess = document.createElement("div");
  divguess.classList =
    "d-flex justify-content-Between gap-2 align-items-center";

  guess.forEach((color) => {
    const divcurent = document.createElement("div");

    divcurent.style.backgroundColor = color;

    divcurent.className = "divColor";

    divguess.appendChild(divcurent);
  });
  const guid = document.createElement("p");
  guid.innerText = `correct:${correct} , misplaced: ${misplaced}`;
  guid.classList = "text-center";
  divguesscontainer.append(divguess, guid);
  historyBox.append(divguesscontainer);
}

//  submit btn
const submit = document.querySelector(".submit");
submit.addEventListener("click", () => {
  if (gameOver) return;
  if (currentGesse.length < passLength) {
    alert(`you must choose exactly ${passLength} color`);
    return;
  }

  const { correct, misplaced } = guesscheker(currentGesse, randomPassword);
  displayGuess(currentGesse, correct, misplaced);
  if (correct === currentGesse.length) {
    gameOver = true;
    clearInterval(timer);
    user.score += point;

    alert(`you win!  pass: ${randomPassword.join(",")}`);
    window.location.href = "home.html";
    return;
  }

  remainGuesses--;
  tries.textContent = remainGuesses;

  currentGesseBox.innerHTML = " <p>Your curent guess:</p>";
  currentGesse = [];

  if (remainGuesses === 0) {
    alert(`game over! correct pass: ${randomPassword.join(",")}`);
    gameOver = true;
    clearInterval(timer);
    window.location.href = "home.html";
  }
});
