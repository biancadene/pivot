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
// LOCATION
// -------------------
navigator.geolocation.getCurrentPosition(async (pos) => {
  state.location = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  };

  loaderSub.innerText = "Checking weather + surroundings";

  await loadWeather();
  await loadPlaces();

  loading.style.display = "none";
  main.classList.remove("hidden");

  render();
});

// -------------------
// WEATHER
// -------------------
async function loadWeather() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${state.location.lat}&lon=${state.location.lng}&appid=${CONFIG.OPENWEATHER_KEY}&units=imperial`
  );

  const data = await res.json();

  state.weather = {
    temp: data.main.temp,
    condition: data.weather[0].main.toLowerCase()
  };
}

// -------------------
// PLACES
// -------------------
async function loadPlaces() {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${state.location.lat},${state.location.lng}&radius=3000&key=${CONFIG.PLACES_KEY}`
  );

  const data = await res.json();

  state.places = data.results.slice(0, 10);
}

// -------------------
// INTELLIGENCE
// -------------------
function score(place) {
  let s = 0;

  if (state.mood === "Relax" && place.types?.includes("park")) s += 3;
  if (state.mood === "Eat" && place.types?.includes("restaurant")) s += 3;

  if (state.weather?.condition?.includes("clear") && place.types?.includes("park")) s += 2;

  return s;
}

function why(place) {
  if (state.mood === "Relax") return "Feels calm and low effort right now.";
  if (state.weather?.condition?.includes("clear")) return "Weather is perfect for this.";
  return "A good nearby option.";
}

// -------------------
// RENDER
// -------------------
function render() {
  context.innerText =
    `🌤 ${Math.round(state.weather.temp)}° • ${state.weather.condition}`;

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
// MOOD
// -------------------
function setMood(m) {
  state.mood = m;
  render();
}
