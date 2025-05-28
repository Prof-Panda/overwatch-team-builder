// Full list of Overwatch 2 heroes by role (as of 2025)
const heroes = [
  "Ana", "Ashe", "Baptiste", "Bastion", "Brigitte", "Cassidy", "D.Va",
  "Doomfist", "Echo", "Genji", "Hanzo", "Illari", "Junker Queen",
  "Junkrat", "Kiriko", "Lifeweaver", "Lucio", "Mauga", "Mei", "Mercy",
  "Moira", "Orisa", "Pharah", "Ramattra", "Reaper", "Reinhardt",
  "Roadhog", "Sigma", "Sojourn", "Soldier: 76", "Sombra", "Symmetra",
  "Torbjorn", "Tracer", "Venture", "Widowmaker", "Winston", "Wrecking Ball",
  "Zarya", "Zenyatta"
];

// Populate dropdowns
function populateDropdowns() {
  const dropdowns = [hero1, hero2, hero3, hero4];
  dropdowns.forEach(select => {
    heroes.forEach(hero => {
      const option = document.createElement("option");
      option.value = hero;
      option.text = hero;
      select.appendChild(option);
    });
  });
}

window.onload = populateDropdowns;

// Send selection to backend and get recommendation
async function getRecommendation() {
  const teammates = [
    document.getElementById("hero1").value,
    document.getElementById("hero2").value,
    document.getElementById("hero3").value,
    document.getElementById("hero4").value
  ];

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Getting recommendation...";

  try {
    const response = await fetch("https://overwatch-hero-select.onrender.com/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ teammates })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    resultDiv.innerHTML = `<pre>${data.recommendation}</pre>`;
  } catch (error) {
    console.error("API call failed:", error);
    resultDiv.innerHTML = "⚠️ Something went wrong. Please try again later.";
  }
}
