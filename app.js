let state = {
  mood: "Relax"
};

const loading = document.getElementById("loading");
const loaderSub = document.getElementById("loaderSub");
const main = document.getElementById("main");
const results = document.getElementById("results");
const context = document.getElementById("context");

/* -----------------------
   FAKE "INTELLIGENCE LAYER"
   (this is what makes it feel magical)
------------------------*/

const DATA = [
  {
    name: "Hidden Café with Warm Light",
    type: "Relax",
    reason: "Feels calm, slow, and unhurried — perfect reset energy."
  },
  {
    name: "Waterfront Walk at Golden Hour",
    type: "Explore",
    reason: "Open space + movement = mental clarity right now."
  },
  {
    name: "Local Food Spot Everyone Misses",
    type: "Eat",
    reason: "Simple, satisfying, no decision fatigue needed."
  },
  {
    name: "Quiet Neighborhood Park Bench",
    type: "Relax",
    reason: "Low stimulation space to reset your mind."
  },
  {
    name: "Small Street Market Loop",
    type: "Explore",
    reason: "Light discovery without commitment or planning."
  }
];

/* -----------------------
   SAFE START (NO BREAKS)
------------------------*/

setTimeout(() => {
  loaderSub.innerText = "Finding calm options nearby…";

  setTimeout(() => {
    loading.style.display = "none";
    main.classList.remove("hidden");

    render();
  }, 900);
}, 800);

/* -----------------------
   RENDER MAGIC
------------------------*/

function render() {
  context.innerText = `✨ tuned to: ${state.mood}`;

  const filtered = DATA
    .filter(p => p.type === state.mood);

  const fallback = filtered.length ? filtered : DATA;

  results.innerHTML = fallback.map(item => `
    <div class="card">
      <div class="magic">best match for you</div>
      <div class="card-title">${item.name}</div>
      <div class="card-reason">${item.reason}</div>
    </div>
  `).join("");
}

/* -----------------------
   MOOD SWITCH
------------------------*/

function setMood(m) {
  state.mood = m;
  render();
}
