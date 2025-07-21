const startBtn = document.querySelector("#start-game-btn")
const select = document.querySelector("select")

startBtn.addEventListener("click", () =>{
  const selectValue = select.value
  localStorage.setItem("gameLevel", selectValue) 
})