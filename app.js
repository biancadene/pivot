let state = { mood: "Relax" };

const DATA = [
  {
    name: "Hidden Café with Calm Light",
    type: "Relax",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    reason: "A slow, quiet reset space that clears your mind."
  },
  {
    name: "Waterfront Walk",
    type: "Explore",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    reason: "Open air movement to reset your energy."
  },
  {
    name: "Local Food Spot",
    type: "Eat",
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
    reason: "Simple, satisfying, no decision fatigue."
  }
];

const hero = document.getElementById("hero");
const secondary = document.getElementById("secondary");
const context = document.getElementById("context");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

render();

function render() {
  const filtered = DATA.filter(d => d.type === state.mood);
  const list = filtered.length ? filtered : DATA;

  const [top, ...rest] = list;

  // HERO
  hero.innerHTML = `
    <div class="hero-card" style="background-image:url('${top.image}')" onclick="openModal('${top.name}', '${top.reason}')">
      <div class="overlay"></div>
      <div class="hero-label">Best for you right now</div>
      <h3>${top.name}</h3>
      <p>${top.reason}</p>
    </div>
  `;

  // SECONDARY
  secondary.innerHTML = rest.map(item => `
    <div class="card" onclick="openModal('${item.name}', '${item.reason}')">
      <strong>${item.name}</strong>
      <div style="font-size:12px;color:gray">${item.reason}</div>
    </div>
  `).join("");

  context.innerText = `✨ tuned to: ${state.mood}`;
}

function setMood(m) {
  state.mood = m;
  render();
}

function openModal(name, reason) {
  modal.classList.remove("hidden");
  modalBody.innerHTML = `
    <h2>${name}</h2>
    <p>${reason}</p>
  `;
}

function closeModal() {
  modal.classList.add("hidden");
}
