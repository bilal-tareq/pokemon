async function getPokemon() {
  const input = document.getElementById("searchbar").value.toLowerCase().trim();
  if (!input) {
    alert("Please enter a Pokémon name or ID");
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert("Pokémon not found!");
      return;
    }

    const data = await response.json();

    // عناصر الكارد
    const card = document.querySelector(".card");
    const num = card.querySelector(".num");
    const img = card.querySelector(".sprite");
    const name = card.querySelector(".name");
    const typesDiv = card.querySelector(".types");
    const speciesSpan = document.getElementById("pokeSpecies");
    const heightSpan = document.getElementById("pokeHeight");
    const weightSpan = document.getElementById("pokeWeight");

    // تحديث البيانات
    num.textContent = `#${data.id.toString().padStart(3, "0")}`;
    img.src = data.sprites.other["official-artwork"].front_default;
    img.alt = data.name;
    name.textContent = data.name.toUpperCase();
    speciesSpan.textContent = data.species.name;
    heightSpan.textContent = data.height / 10; // المتر
    weightSpan.textContent = data.weight / 10; // الكيلو جرام

    // عرض الأنواع
    typesDiv.innerHTML = "";
    data.types.forEach(t => {
      const span = document.createElement("span");
      span.textContent = t.type.name;
      span.classList.add("type");
      if (t.type.name === "poison") {
        span.style.background = "purple";
        span.style.color = "white";
        span.style.padding = "2px 6px";
        span.style.borderRadius = "6px";
      } else {
        span.style.background = "#a355caff";
        span.style.padding = "2px 6px";
        span.style.borderRadius = "6px";
      }
      typesDiv.appendChild(span);
    });

  } catch (error) {
    alert("Error fetching data!");
    console.error(error);
  }
}

// ربط الزرار بالـ function
document.getElementById("searchbtn").addEventListener("click", getPokemon);

// كمان لو المستخدم ضغط Enter
document.getElementById("searchbar").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getPokemon();
  }
});