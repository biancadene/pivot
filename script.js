const state = {
  time: null,
  mood: null,
  distance: null
};

const places = [
  {
    id: 1,
    title: "Hidden Café Walk",
    subtitle: "Quiet coffee + riverside reset",
    why: "Perfect for a calm, low-effort reset.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    moods: ["Relax", "Coffee"],
    times: ["1 hr", "2 hrs"],
    distances: ["5 min", "15 min"],
    plan: "Grab coffee → short walk → slow reset",
    notes: ["low stress", "best morning"]
  },
  {
    id: 2,
    title: "Waterfront Walk",
    subtitle: "Open space exploration",
    why: "Good for clearing your head.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    moods: ["Explore"],
    times: ["1 hr", "2 hrs"],
    distances: ["15 min"],
    plan: "Walk → pause → view point",
    notes: ["scenic", "easy"]
  }
];

/* SCREEN NAV */
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* INIT CHIPS */
function init() {
  setup("timeGroup", ["30 min","1 hr","2 hrs"]);
  setup("moodGroup", ["Relax","Explore","Coffee","Eat"]);
  setup("distanceGroup", ["5 min","15 min","30 min"]);
}

function setup(id, values) {
  const el = document.getElementById(id);
  el.innerHTML = values.map(v =>
    `<button class="chip" onclick="select('${id}','${v}',this)">${v}</button>`
  ).join("");
}

function select(group, value, el) {
  state[group.replace("Group","")] = value;

  document.querySelectorAll(`#${group} .chip`)
    .forEach(b => b.classList.remove("active"));

  el.classList.add("active");

  document.getElementById("findBtn").disabled =
    !(state.time && state.mood && state.distance);
}

/* FIND */
document.getElementById("findBtn").onclick = () => {
  renderResults();
  show("resultsScreen");
};

function renderResults() {
  const results = places.filter(p =>
    p.moods.includes(state.mood) &&
    p.times.includes(state.time) &&
    p.distances.includes(state.distance)
  );

  const list = results.length ? results : places;

  document.getElementById("resultsMeta").innerText =
    `${state.time} • ${state.mood} • ${state.distance}`;

  document.getElementById("resultsList").innerHTML =
    list.map(p => `
      <div class="result-card" onclick="openDetail(${p.id})">
        <div class="result-img" style="background-image:url('${p.image}')"></div>
        <div class="card">
          <strong>${p.title}</strong>
          <div style="font-size:13px;color:#666">${p.subtitle}</div>
        </div>
      </div>
    `).join("");
}

/* DETAIL */
function openDetail(id) {
  const p = places.find(x => x.id === id);

  document.getElementById("detailHero").style.backgroundImage =
    `url('${p.image}')`;

  document.getElementById("detailTitle").innerText = p.title;
  document.getElementById("detailSubtitle").innerText = p.subtitle;
  document.getElementById("detailWhy").innerText = p.why;
  document.getElementById("detailPlan").innerText = p.plan;

  show("detailScreen");
}

/* NAV */
document.getElementById("backHome").onclick = () => show("homeScreen");
document.getElementById("backResults").onclick = () => show("resultsScreen");

/* INIT */
init();
