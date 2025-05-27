const heroes = {
  // Tanks
  "D.Va": "Tank", "Orisa": "Tank", "Mauga": "Tank", "Winston": "Tank", "Sigma": "Tank",
  "Reinhardt": "Tank", "Roadhog": "Tank", "Zarya": "Tank", "Ramattra": "Tank", "Junker Queen": "Tank",

  // DPS
  "Soldier: 76": "DPS", "Cassidy": "DPS", "Echo": "DPS", "Genji": "DPS", "Hanzo": "DPS",
  "Junkrat": "DPS", "Mei": "DPS", "Pharah": "DPS", "Reaper": "DPS", "Sombra": "DPS",
  "Symmetra": "DPS", "Torbjörn": "DPS", "Tracer": "DPS", "Widowmaker": "DPS", "Bastion": "DPS",
  "Freja": "DPS",

  // Supports
  "Mercy": "Support", "Ana": "Support", "Kiriko": "Support", "Moira": "Support", "Lucio": "Support",
  "Zenyatta": "Support", "Baptiste": "Support", "Illari": "Support", "Lifeweaver": "Support", "Brigitte": "Support"
};

const synergyRules = [
  {
    condition: team => team.includes("Mercy") && team.includes("Echo"),
    best: "Kiriko",
    reason: "Kiriko can teleport to Echo, cleanse status effects, and support Mercy.",
    runnerUp: "Baptiste",
    avoid: ["Moira", "Zenyatta"]
  },
  {
    condition: team => team.includes("Mauga") && team.includes("Mercy"),
    best: "Ana",
    reason: "Ana pairs well with Mauga's brawling and Mercy’s spot healing.",
    runnerUp: "Kiriko",
    avoid: ["Moira", "Lucio"]
  },
  {
    condition: team => team.includes("Orisa") && team.includes("Freja"),
    best: "Baptiste",
    reason: "Baptiste provides range healing and fits well with a midrange poke comp.",
    runnerUp: "Kiriko",
    avoid: ["Lucio", "Moira"]
  },
  {
    condition: team => team.includes("Widowmaker") && team.includes("Mercy"),
    best: "Zenyatta",
    reason: "Zenyatta helps support a double-poke comp and adds pressure to enemy tanks.",
    runnerUp: "Baptiste",
    avoid: ["Moira", "Lucio"]
  },
  {
    condition: team => team.includes("D.Va") && team.includes("Sombra"),
    best: "Lucio",
    reason: "Lucio supports dive comps by enabling D.Va and Sombra to engage quickly.",
    runnerUp: "Kiriko",
    avoid: ["Zenyatta", "Baptiste"]
  },
  {
    condition: team => team.includes("Reaper") && team.includes("Junker Queen"),
    best: "Moira",
    reason: "Moira thrives in brawl comps with high sustain and close combat.",
    runnerUp: "Lucio",
    avoid: ["Zenyatta", "Ana"]
  }
];

function displayRecommendation(bestPick, why, runnerUp, avoid) {
  document.getElementById("output").innerHTML = `
    <h2 class="text-xl font-semibold mb-2">🦾 Best Pick: <span class="text-green-400">${bestPick}</span></h2>
    <p class="mb-2">💡 <strong>Why:</strong> ${why}</p>
    <p class="mb-2">📍 <strong>Runner-Up:</strong> ${runnerUp}</p>
    <p class="text-red-400">⚠️ <strong>Avoid:</strong> ${avoid.join(", ")}</p>
  `;
}

function recommendHero() {
  const selections = [
    document.getElementById("hero1").value,
    document.getElementById("hero2").value,
    document.getElementById("hero3").value,
    document.getElementById("hero4").value
  ];

  // Check synergy-based rules first
  for (const rule of synergyRules) {
    if (rule.condition(selections)) {
      return displayRecommendation(rule.best, rule.reason, rule.runnerUp, rule.avoid);
    }
  }

  // Fallback to role-based logic
  const roleCounts = { Tank: 0, DPS: 0, Support: 0 };
  selections.forEach(hero => {
    const role = heroes[hero];
    if (role) roleCounts[role]++;
  });

  let bestPick = "", why = "", runnerUp = "", avoid = [];

  if (roleCounts.Tank === 0) {
    bestPick = "Orisa";
    runnerUp = "Mauga";
    why = "Your team lacks a tank. Orisa brings stability, Mauga brings aggression.";
    avoid = ["Echo", "Widowmaker"];
  } else if (roleCounts.Support < 2) {
    bestPick = "Kiriko";
    runnerUp = "Ana";
    why = "You need another support. Kiriko adds mobility and cleanse; Ana brings strong healing and utility.";
    avoid = ["Zenyatta", "Moira"];
  } else if (roleCounts.DPS < 2) {
    bestPick = "Reaper";
    runnerUp = "Soldier: 76";
    why = "Your team needs more damage. Reaper brawls up close; Soldier supports from range.";
    avoid = ["Lifeweaver", "Lucio"];
  } else {
    bestPick = "Baptiste";
    runnerUp = "Zarya";
    why = "Team is already balanced. Baptiste adds survivability; Zarya adds frontline strength.";
    avoid = ["Sombra", "Mei"];
  }

  displayRecommendation(bestPick, why, runnerUp, avoid);
}

// Populate dropdowns on page load
window.onload = () => {
  const selects = [
    document.getElementById("hero1"),
    document.getElementById("hero2"),
    document.getElementById("hero3"),
    document.getElementById("hero4")
  ];
  const heroNames = Object.keys(heroes);
  selects.forEach(select => {
    heroNames.forEach(hero => {
      const option = document.createElement("option");
      option.value = hero;
      option.textContent = hero;
      select.appendChild(option);
    });
  });
};
