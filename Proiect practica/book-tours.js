// 🔹 PRICE CONFIG
const BASE_PRICE_NORMAL = 120;   // €/rider/day
const BASE_PRICE_PREMIUM = 180;  // €/rider/day

const EXTRA_GEAR_PER_RIDER_PER_DAY = 20;
const EXTRA_PHOTO_PER_TOUR = 50;
const EXTRA_TRANSFER_PER_GROUP = 40;

function formatDate(value) {
  if (!value) return "–";
  const d = new Date(value);
  if (isNaN(d)) return "–";
  return d.toLocaleDateString();
}

function updateSummaryAndPrice() {
  const date = document.getElementById("tour-date").value;
  const duration = parseInt(document.getElementById("duration").value) || 1;
  const riders = parseInt(document.getElementById("riders").value) || 1;
  const packageType = document.querySelector('input[name="package"]:checked').value;
  const difficulty = document.getElementById("difficulty").value;
  const bike = document.getElementById("bike").value;

  const extraGear = document.getElementById("extra-gear").checked;
  const extraPhoto = document.getElementById("extra-photo").checked;
  const extraTransfer = document.getElementById("extra-transfer").checked;

  // 🔸 Update summary text
  document.getElementById("summary-date").textContent = formatDate(date);
  document.getElementById("summary-duration").textContent = duration + (duration === 1 ? " day" : " days");
  document.getElementById("summary-riders").textContent = riders;
  document.getElementById("summary-package").textContent = packageType === "normal" ? "Normal" : "Premium";
  document.getElementById("summary-difficulty").textContent = difficulty;
  document.getElementById("summary-bike").textContent = bike;

  const extrasList = [];
  if (extraGear) extrasList.push("Gear rental");
  if (extraPhoto) extrasList.push("Photo & video");
  if (extraTransfer) extrasList.push("Airport transfer");
  document.getElementById("summary-extras").textContent = extrasList.length ? extrasList.join(", ") : "None";

  // 🔸 Price calculation
  const basePerRider = packageType === "normal" ? BASE_PRICE_NORMAL : BASE_PRICE_PREMIUM;
  let total = basePerRider * riders * duration;

  if (extraGear) {
    total += EXTRA_GEAR_PER_RIDER_PER_DAY * riders * duration;
  }
  if (extraPhoto) {
    total += EXTRA_PHOTO_PER_TOUR;
  }
  if (extraTransfer) {
    total += EXTRA_TRANSFER_PER_GROUP;
  }

  document.getElementById("summary-price").textContent = total + " €";
}

document.addEventListener("DOMContentLoaded", () => {
  // Event listeners pentru toate câmpurile relevante
  [
    "tour-date",
    "duration",
    "riders",
    "difficulty",
    "bike",
    "extra-gear",
    "extra-photo",
    "extra-transfer"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", updateSummaryAndPrice);
  });

  document.querySelectorAll('input[name="package"]').forEach(radio => {
    radio.addEventListener("change", updateSummaryAndPrice);
  });

  // Prima calculare
  updateSummaryAndPrice();

  // Handle submit
  const form = document.getElementById("booking-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
      alert("Please fill in at least your name and email.");
      return;
    }

    alert("Thank you, " + name + "! Your booking request has been sent.\nWe will contact you at " + email + " soon.");
    form.reset();
    updateSummaryAndPrice();
  });
});
// ⭐ HERO SLIDESHOW – Works like on index page
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-book");

  // BAGĂ IMAGINILE TALE AICI (folderul exact!)
  const heroImages = [
    "schimb1.jpg",
    "schimb2.jpeg",
    "schimb3.jpg"
  ];

  let currentIndex = 0;

  // AFIȘEAZĂ PRIMA IMEDIAT
  hero.style.backgroundImage = `url("${heroImages[0]}")`;

  // SCHIMBĂ IMAGINILE LA FIECARE 3 SECUNDE
  setInterval(() => {
    currentIndex = (currentIndex + 1) % heroImages.length;
    hero.style.backgroundImage = `url("${heroImages[currentIndex]}")`;
  }, 3000);
});
