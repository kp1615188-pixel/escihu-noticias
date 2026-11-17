const today = new Date();
document.getElementById("today").textContent = today.toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).toUpperCase();
document.getElementById("year").textContent = today.getFullYear();

const filterButtons = document.querySelectorAll(".filter");
const cards = [...document.querySelectorAll(".news-card")];
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
let currentFilter = "Todas";

function updateNews(){
  const term = searchInput.value.toLocaleLowerCase("es");
  let visible = 0;
  cards.forEach(card=>{
    const category = card.dataset.category;
    const content = (card.dataset.search + " " + card.innerText).toLocaleLowerCase("es");
    const matchesFilter = currentFilter === "Todas" || category === currentFilter;
    const matchesSearch = content.includes(term);
    card.hidden = !(matchesFilter && matchesSearch);
    if(!card.hidden) visible++;
  });
  noResults.hidden = visible !== 0;
}
filterButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    filterButtons.forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    updateNews();
  });
});
searchInput.addEventListener("input",updateNews);
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>nav.classList.remove("open")));
