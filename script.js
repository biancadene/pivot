const state = {
  time: null,
  mood: null,
  distance: null,
  currentResults: [],
  currentDetail: null
};

const findBtn = document.getElementById("findBtn");
const regenerateBtn = document.getElementById("regenerateBtn");
const resultsList = document.getElementById("resultsList");
const resultsMeta = document.getElementById("resultsMeta");

const screens = {
  home: document.getElementById("homeScreen"),
  results: document.getElementById("resultsScreen"),
  detail: document.getElementById("detailScreen")
};

const places = [
  {
    id: 1,
    title: "Hidden Garden Café + Walk",
    subtitle: "A quiet coffee stop near a scenic riverside path.",
    why: "This option is close, easy, and low-pressure. It gives you a small reset without taking over your day.",
    moods: ["Relax", "Coffee", "Nature"],
    times: ["1 hr", "2 hrs"],
    distances: ["5 min", "15 min"],
    tags: ["quick reset", "scenic", "local favorite"],
    duration: "1–1.5 hrs",
    away: "8 min away",
    detailMood: "relaxed",
    notes: [
      "Best for solo travelers, couples, or a quiet family stop",
      "Low to moderate budget",
      "Best in the morning or late afternoon"
    ],
    plan: [
      {
        title: "Start with coffee",
        text: "Pick up a drink and take a few minutes to settle before heading out."
      },
      {
        title: "Take the riverside path",
        text: "A short scenic walk that feels peaceful without requiring much time."
      },
      {
        title: "End with a small treat",
        text: "Stop by a nearby bakery or market before heading back."
      }
    ],
    image:
      "linear-gradient(135deg, rgba(22,63,58,0.22), rgba(169,183,172,0.15)), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80')"
  },
  {
    id: 2,
    title: "Old Town Street Loop",
    subtitle: "Local shops, a snack stop, and a walkable historic area.",
    why: "This is a strong choice when you want something memorable without overplanning or going too far.",
    moods: ["Explore", "Local"],
    times: ["2 hrs", "Half day"],
    distances: ["15 min", "30 min"],
    tags: ["walkable", "memorable", "local"],
    duration: "2 hrs",
    away: "12 min away",
    detailMood: "exploratory",
    notes: [
      "Good for curious travelers and casual browsing",
      "Low to moderate budget",
      "Works especially well mid-morning"
    ],
    plan: [
      {
        title: "Start at the main street",
        text: "Take in the historic area and browse one or two standout local shops."
      },
      {
        title: "Pause for a snack",
        text: "Choose one simple food stop rather than trying to see everything."
      },
      {
        title: "Finish with a slow wander",
        text: "Use the last stretch to people-watch or take photos before heading back."
      }
    ],
    image:
      "linear-gradient(135deg, rgba(22,63,58,0.18), rgba(199,123,97,0.14)), url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80')"
  },
  {
    id: 3,
    title: "Neighborhood Market Stop",
    subtitle: "Quick bites, people-watching, and a more local feel.",
    why: "Good when you want something casual, easy, and less tourist-heavy.",
    moods: ["Eat", "Local", "Explore"],
    times: ["30 min", "1 hr", "2 hrs"],
    distances: ["5 min", "15 min"],
    tags: ["easy stop", "casual", "food"],
    duration: "45–60 min",
    away: "10 min away",
    detailMood: "casual",
    notes: [
      "Great for families or low-pressure exploring",
      "Budget-friendly",
      "Best when you want flexibility"
    ],
    plan: [
      {
        title: "Grab one small bite",
        text: "Pick a local stall or market snack instead of committing to a full meal."
      },
      {
        title: "Walk one full loop",
        text: "Browse slowly and notice what feels interesting rather than rushing."
      },
      {
        title: "Choose one final stop",
        text: "End with a drink, dessert, or quick local purchase."
      }
    ],
    image:
      "linear-gradient(135deg, rgba(22,63,58,0.18), rgba(169,183,172,0.13)), url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80')"
  },
  {
    id: 4,
    title: "Pocket Park + Viewpoint",
    subtitle: "A short outdoor reset with a scenic payoff.",
    why: "Ideal when you want fresh air and a change of scenery without committing to a big outing.",
    moods: ["Nature", "Relax"],
    times: ["30 min", "1 hr"],
    distances: ["5 min", "15 min", "30 min"],
    tags: ["outdoor", "easy", "view"],
    duration: "30–50 min",
    away: "14 min away",
    detailMood: "calm",
    notes: [
      "Best for solo travelers, couples, or energetic kids",
      "Low budget",
      "Best close to sunset or on a clear day"
    ],
    plan: [
      {
        title: "Walk to the viewpoint",
        text: "Keep it simple and go straight to the best scenic point first."
      },
      {
        title: "Take a short reset break",
        text: "Sit for a few minutes and enjoy the view without overcomplicating it."
      },
      {
        title: "Head back through the park",
        text: "Take the gentler path back for a little extra movement."
      }
    ],
    image:
      "linear-gradient(135deg, rgba(22,63,58,0.18), rgba(169,183,172,0.14)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80')"
  },
  {
    id: 5,
    title: "Easy Family Stopover",
    subtitle: "One simple kid-friendly outing with room to breathe.",
    why: "This keeps the plan manageable while still making the extra time feel special.",
    moods: ["Kid-friendly", "Relax", "Explore"],
    times: ["1 hr", "2 hrs"],
    distances: ["5 min", "15 min"],
    tags: ["kid-friendly", "low stress", "flexible"],
    duration: "1–1.5 hrs",
    away: "9 min away",
    detailMood: "family-friendly",
    notes: [
      "Best for families with younger children",
      "Low to moderate budget",
      "Good when energy levels are mixed"
    ],
    plan: [
      {
        title: "Start with one easy activity",
        text: "Choose a stop where no one has to follow a strict schedule."
      },
      {
        title: "Build in snack time",
        text: "Adding a short food break helps the outing feel smoother."
      },
      {
        title: "Leave while it still feels easy",
        text: "End on a good note instead of stretching the time too long."
      }
    ],
    image:
      "linear-gradient(135deg, rgba(22,63,58,0.18), rgba(199,123,97,0.1)), url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80')"
  }
];

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });
  screens[screenName].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateFindButton() {
  findBtn.disabled = !(state.time && state.mood && state.distance);
}

function setupSelectableGroup(groupId, stateKey) {
  const buttons = document.querySelectorAll(`#${groupId} .pill`);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      state[stateKey] = button.dataset.value;
      updateFindButton();
    });
  });
}

function setSelection(groupId, value, stateKey) {
  const buttons = document.querySelectorAll(`#${groupId} .pill`);

  buttons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.value === value);
  });

  state[stateKey] = value;
  updateFindButton();
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getFilteredResults() {
  return places.filter((place) => {
    return (
      place.times.includes(state.time) &&
      place.moods.includes(state.mood) &&
      place.distances.includes(state.distance)
    );
  });
}

function renderResults() {
  const filtered = getFilteredResults();
  const shuffled = shuffleArray(filtered);

  state.currentResults = shuffled;
  resultsMeta.textContent = `${state.time} • ${state.mood} • ${state.distance} away`;

  if (shuffled.length === 0) {
    resultsList.innerHTML = `
      <article class="card">
        <div class="empty-state">
          <h3>No exact matches yet</h3>
          <p>Try a different mood or a longer distance to see more options.</p>
        </div>
      </article>
    `;
    return;
  }

  resultsList.innerHTML = shuffled
    .map((place) => {
      return `
        <article class="card">
          <div class="card-image" style="background: ${place.image};"></div>
          <div class="card-body">
            <div class="tag-row">
              ${place.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <h3>${place.title}</h3>
            <p>${place.subtitle}</p>

            <div class="why-box">
              <strong>Why this fits</strong>
              <p>${place.why}</p>
            </div>

            <div class="card-meta">
              <span>${place.duration}</span>
              <span>•</span>
              <span>${place.away}</span>
            </div>

            <button class="primary-btn view-plan-btn" data-id="${place.id}">
              View plan
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".view-plan-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const placeId = Number(button.dataset.id);
      const selected = places.find((place) => place.id === placeId);

      if (selected) {
        renderDetail(selected);
        showScreen("detail");
      }
    });
  });
}

function renderDetail(place) {
  state.currentDetail = place;

  document.getElementById("detailImage").style.background = place.image;
  document.getElementById("detailTitle").textContent = place.title;
  document.getElementById("detailSubtitle").textContent = place.subtitle;
  document.getElementById("detailMeta").textContent =
    `${place.duration} • ${place.away} • ${place.detailMood}`;

  document.getElementById("detailWhy").textContent = place.why;

  document.getElementById("detailTags").innerHTML = place.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  document.getElementById("detailPlan").innerHTML = place.plan
    .map((step, index) => {
      return `
        <div class="timeline-step">
          <div class="step-num">${index + 1}</div>
          <div>
            <div class="step-title">${step.title}</div>
            <p>${step.text}</p>
          </div>
        </div>
      `;
    })
    .join("");

  document.getElementById("detailNotes").innerHTML = place.notes
    .map((note) => `<li>${note}</li>`)
    .join("");
}

setupSelectableGroup("timeGroup", "time");
setupSelectableGroup("moodGroup", "mood");
setupSelectableGroup("distanceGroup", "distance");

document.querySelectorAll(".quick-option").forEach((button) => {
  button.addEventListener("click", () => {
    setSelection("timeGroup", button.dataset.time, "time");
    setSelection("moodGroup", button.dataset.mood, "mood");
    setSelection("distanceGroup", button.dataset.distance, "distance");
  });
});

findBtn.addEventListener("click", () => {
  renderResults();
  showScreen("results");
});

regenerateBtn.addEventListener("click", () => {
  renderResults();
});

document.getElementById("backToHome").addEventListener("click", () => {
  showScreen("home");
});

document.getElementById("backToResults").addEventListener("click", () => {
  showScreen("results");
});

document.getElementById("seeOtherOptions").addEventListener("click", () => {
  showScreen("results");
});
