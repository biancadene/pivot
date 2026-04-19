let state = {
  location: null,
  weather: null,
  places: [],
  mood: "Relax"
};

const loading = document.getElementById("loading");
const loaderSub = document.getElementById("loaderSub");
const main = document.getElementById("main");
const results = document.getElementById("results");
const context = document.getElementById("context");

// -------------------
// SAFE START (NO FREEZE EVER)
// -------------------
navigator.geolocation.getCurrentPosition(
  async (pos) => {
    try {
      state.location = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      loaderSub.innerText = "Finding nearby options…";

      await fakeWeather();
      await loadPlaces();

    } catch (err) {
      console.log("Fallback mode active", err);
    }

    finishLoading();
  },

  () => {
    // if user blocks location
    state.location = { lat: 0, lng: 0 };
    loaderSub.innerText = "Using default location…";

    fakeWeather();
    loadPlaces();

    finishLoading();
  }
);

// -------------------
// SAFE FALLBACK WEATHER
// -------------------
async function fakeWeather() {
  state.weather = {
    temp: 78,
    condition: "clear"
  };
}

// -------------------
// SAFE PLACES (NO API)
// -------------------
async function loadPlaces() {
  state.places = [
    { name: "Local Café with Quiet Corner", type: "eat" },
    { name: "Waterfront Walking Path", type: "explore" },
    { name: "Neighborhood Park Bench Spot", type: "relax" },
    { name: "Small Local Market", type: "eat" }
  ];
}

// -------------------
// FINISH LOADING (IMPORTANT FIX)
// -------------------
function finishLoading() {
  setTimeout(() => {
    loading.style.display = "none";
    main.classList.remove("hidden");
    render();
  }, 600);
}

// -------------------
// SIMPLE INTELLIGENCE
// -------------------
function score(place) {
  let s = 0;

  if (state.mood === "Relax" && place.type === "relax") s += 3;
  if (state.mood === "Eat" && place.type === "eat") s += 3;
  if (state.mood === "Explore" && place.type === "explore") s += 3;

  return s;
}

function why(place) {
  if (state.mood === "Relax") return "A calm reset nearby.";
  if (state.mood === "Eat") return "Good local food option right now.";
  if (state.mood === "Explore") return "Feels worth stepping out for.";
  return "Good nearby option.";
}

// -------------------
// RENDER
// -------------------
function render() {
  context.innerText = `📍 Ready • Mood: ${state.mood}`;

  const ranked = state.places
    .map(p => ({ ...p, score: score(p) }))
    .sort((a,b) => b.score - a.score)
    .slice(0, 3);

  results.innerHTML = ranked.map(p => `
    <div class="card">
      <div class="card-title">${p.name}</div>
      <div class="card-reason">${why(p)}</div>
    </div>
  `).join("");
}

// -------------------
// MOOD SWITCH
// -------------------
function setMood(m) {
  state.mood = m;
  render();
}
