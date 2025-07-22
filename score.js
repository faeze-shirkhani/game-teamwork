const API_URL = "https://687a55e7abb83744b7ec6d2e.mockapi.io/players";
const tbodyTag = document.querySelector("#scoreTableBody");
const tableTag = document.querySelector("#scoreTable");
const buttonTag = document.querySelector("#toggleButton");

let tableVisible = false;
let showLowest = false;

async function fetchPlayers() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
}
function renderPlayers(players) {
  tbodyTag.innerHTML = "";
  players.forEach((player) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.score}</td>
    `;
    tbodyTag.appendChild(row);
  });
}
async function updateTable() {
  const players = await fetchPlayers();
  const sorted = [...players].sort((a, b) =>
    showLowest ? a.score - b.score : b.score - a.score
  );
  renderPlayers(sorted.slice(0, 10));
  buttonTag.textContent = showLowest
    ? "Show Highest Scores"
    : "Show Lowest Scores";
}
buttonTag.addEventListener("click", () => {
  showLowest = !showLowest;

  if (!tableVisible) {
    tableTag.classList.remove("d-none");
    tableVisible = true;
  }

  updateTable();
});
