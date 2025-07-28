window.addEventListener("DOMContentLoaded", async () => {
  const signinBtn = document.getElementById("signInBtn");
  signinBtn?.addEventListener("click", () => {
    window.location.href = "signin.html";
  });

  const signUpBtn = document.getElementById("signUpBtn");
  signUpBtn?.addEventListener("click", () => {
    window.location.href = "signup.html";
  });

  const register = document.querySelector(".register_section");
  const gameSection = document.querySelector(".game_section");
  const namePoint = document.querySelector(".userName");

  const loggedInUserId = localStorage.getItem("loggedInUser");

  if (!loggedInUserId) {
    register.classList.remove("d-none");
    gameSection.classList.add("d-none");
    return;
  }

  try {
    const res = await fetch(
      `https://687a55e7abb83744b7ec6d2e.mockapi.io/players/${loggedInUserId}`
    );
    const user = await res.json();

    if (!user.id) throw new Error("User not found");

    register.classList.add("d-none");
    gameSection.classList.remove("d-none");
    namePoint.textContent = `Hello ${user.name}, (score: ${user.score})`;
  } catch (err) {
    console.error("error user info", err);
    localStorage.removeItem("loggedInUser");
    register.classList.remove("d-none");
    gameSection.classList.add("d-none");
  }
});

const startBtn = document.querySelector("#start-game-btn");
const select = document.querySelector("select");

startBtn.addEventListener("click", () => {
  const selectValue = select.value;
  console.log(selectValue);
  localStorage.setItem("gameLevel", selectValue);
  window.location.href = "game_page.html";
});


const btnScore = document.querySelector("#leaderboardBtn")

btnScore.addEventListener("click", () =>{
  window.location.href = "score.html"
})