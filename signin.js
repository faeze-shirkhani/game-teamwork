const users = {
  "hasti@example.com": { score: 87 },
  "mahan@example.com": { score: 55 }
};

const emailInput = document.getElementById("emailInput");
const errorMsg = document.getElementById("error-message");
const userInfo = document.getElementById("user-info");
const authSection = document.getElementById("auth-section");
const username = document.getElementById("username");
const scoreSpan = document.getElementById("score");

const loggedInEmail = localStorage.getItem("loggedInUser");

if (loggedInEmail && users[loggedInEmail]) {
  authSection.classList.add("d-none");
  userInfo.classList.remove("d-none");
  username.textContent = `Welcome, ${loggedInEmail}`;
  scoreSpan.textContent = users[loggedInEmail].score;
}

function signIn() {
  const email = emailInput.value.trim();
  if (!email) {
    errorMsg.textContent = "Please enter an email.";
    return;
  }
  if (!users[email]) {
    errorMsg.textContent = "Email not found. Please sign up first.";
    return;
  }

  localStorage.setItem("loggedInUser", email);
  location.reload();
}

function signUp() {
  const email = emailInput.value.trim();
  if (!email) {
    errorMsg.textContent = "Please enter an email.";
    return;
  }
  if (users[email]) {
    errorMsg.textContent = "Email already registered. Try signing in.";
    return;
  }

  users[email] = { score: 0 };
  localStorage.setItem("loggedInUser", email);
  location.reload();
}

function goToLeaderboard() {
  window.location.href = "leaderboard.html";
}

function startGame() {
  const level = document.getElementById("level").value;
  if (!level) {
    alert("Please select a level first!");
    return;
  }
  alert(`Starting game at ${level} level...`);
}

function goToSignup() {
  window.location.href = "signup.html";
}
function goToSignin() {
  window.location.href = "signin2.html";
}





