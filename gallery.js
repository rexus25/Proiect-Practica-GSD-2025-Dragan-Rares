// 🔹 FILTERS
const filterBtns = document.querySelectorAll(".g-filter");
const cards = document.querySelectorAll(".g-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const cat = card.dataset.category;
      card.style.display = (filter === "all" || cat === filter) ? "block" : "none";
    });
  });
});

// 🔹 LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    lbImg.src = img.src;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox(){
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
}

lbClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
