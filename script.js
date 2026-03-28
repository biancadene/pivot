const state = {
  time: null,
  mood: null,
  distance: null
};

const findBtn = document.getElementById("findBtn");

function setupGroup(id, key) {
  const buttons = document.querySelectorAll(`#${id} .pill`);

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      state[key] = btn.dataset.value;
      updateButton();
    });
  });
}

function updateButton() {
  findBtn.disabled = !(state.time && state.mood && state.distance);
}

setupGroup("timeGroup", "time");
setupGroup("moodGroup", "mood");
setupGroup("distanceGroup", "distance");

findBtn.addEventListener("click", () => {
  showScreen("resultsScreen");
  renderResults();
});

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("backToHome").onclick = () => showScreen("homeScreen");
document.getElementById("backToResults").onclick = () => showScreen("resultsScreen");

const mockResults = [
  {
    title: "Coffee + Walk",
    why: "Perfect short reset nearby"
  },
  {
    title: "Local Street",
    why: "Explore something memorable"
  }
];

function renderResults() {
  const container = document.getElementById("resultsList");

  container.innerHTML = mockResults.map((item, i) => `
    <div class="card">
      <h3>${item.title}</h3>
      <p>${item.why}</p>
      <button onclick="openDetail(${i})">View plan</button>
    </div>
  `).join("");
}

function openDetail(index) {
  const item = mockResults[index];

  document.getElementById("detailTitle").textContent = item.title;
  document.getElementById("detailWhy").textContent = item.why;

  showScreen("detailScreen");
}
