// ✅ ENDUROM — BOOK TOURS 

// =========================
// 🔹 PRICE CONFIG
// =========================
const BASE_PRICE_NORMAL = 120;   // €/rider/day
const BASE_PRICE_PREMIUM = 180;  // €/rider/day

const EXTRA_GEAR_PER_RIDER_PER_DAY = 20;
const EXTRA_PHOTO_PER_TOUR = 50;
const EXTRA_TRANSFER_PER_GROUP = 40;

// ✅ Accommodation: +300€ / rider / night 
const HOTEL_PRICE_PER_RIDER_PER_NIGHT = 100;

// =========================
// 🔹 HELPERS
// =========================
function formatDate(value) {
  if (!value) return "–";
  const d = new Date(value);
  if (isNaN(d)) return "–";
  return d.toLocaleDateString();
}

function $(id) {
  return document.getElementById(id);
}

// =========================
// 🔹 MAIN: UPDATE SUMMARY + PRICE
// =========================
function updateSummaryAndPrice() {
  // --- Read inputs
  const dateEl = $("tour-date");
  const durationEl = $("duration");
  const ridersEl = $("riders");
  const difficultyEl = $("difficulty");
  const bikeEl = $("bike");

  const date = dateEl ? dateEl.value : "";
  const duration = durationEl ? parseInt(durationEl.value, 10) || 1 : 1;
  const riders = ridersEl ? parseInt(ridersEl.value, 10) || 1 : 1;
  const difficulty = difficultyEl ? difficultyEl.value : "Beginner";
  const bike = bikeEl ? bikeEl.value : "–";

  const packageRadio = document.querySelector('input[name="package"]:checked');
  const packageType = packageRadio ? packageRadio.value : "normal";

  const extraGear = $("extra-gear") ? $("extra-gear").checked : false;
  const extraPhoto = $("extra-photo") ? $("extra-photo").checked : false;
  const extraTransfer = $("extra-transfer") ? $("extra-transfer").checked : false;

  // ✅ Hotel select (IMPORTANT)
  // MUST be: <select id="hotel"> ... </select>
  const hotelEl = $("hotel");
  const hotelValue = hotelEl ? hotelEl.value : "none";
  const hotelText = hotelEl
    ? (hotelEl.options[hotelEl.selectedIndex]?.textContent || "None")
    : "None";

  // --- Update summary text
  if ($("summary-date")) $("summary-date").textContent = formatDate(date);
  if ($("summary-duration")) $("summary-duration").textContent = duration + (duration === 1 ? " day" : " days");
  if ($("summary-riders")) $("summary-riders").textContent = riders;
  if ($("summary-package")) $("summary-package").textContent = packageType === "normal" ? "Normal" : "Premium";
  if ($("summary-difficulty")) $("summary-difficulty").textContent = difficulty;
  if ($("summary-bike")) $("summary-bike").textContent = bike;

  const extrasList = [];
  if (extraGear) extrasList.push("Gear rental");
  if (extraPhoto) extrasList.push("Photo & video");
  if (extraTransfer) extrasList.push("Airport transfer");
  if ($("summary-extras")) $("summary-extras").textContent = extrasList.length ? extrasList.join(", ") : "None";

  // ✅ Hotel summary
  if ($("summary-hotel")) {
    $("summary-hotel").textContent = (hotelValue && hotelValue !== "none") ? hotelText : "None";
  }

  // --- Price calculation
  const basePerRider = packageType === "normal" ? BASE_PRICE_NORMAL : BASE_PRICE_PREMIUM;
  let total = basePerRider * riders * duration;

  // Extras
  if (extraGear) total += EXTRA_GEAR_PER_RIDER_PER_DAY * riders * duration;
  if (extraPhoto) total += EXTRA_PHOTO_PER_TOUR;
  if (extraTransfer) total += EXTRA_TRANSFER_PER_GROUP;

  // ✅ Accommodation
  // We'll add 100€ per rider per night. Nights = duration (simple).
  const nights = duration;
  if (hotelValue && hotelValue !== "none") {
    total += HOTEL_PRICE_PER_RIDER_PER_NIGHT * riders * nights;
  }

  if ($("summary-price")) $("summary-price").textContent = total + " €";
}

// =========================
// 🔹 INIT EVENTS
// =========================
document.addEventListener("DOMContentLoaded", () => {
  // 1) Update price on changes
  const idsToWatch = [
    "tour-date",
    "duration",
    "riders",
    "difficulty",
    "bike",
    "extra-gear",
    "extra-photo",
    "extra-transfer",
    "hotel" // ✅ IMPORTANT
  ];

  idsToWatch.forEach(id => {
    const el = $(id);
    if (el) el.addEventListener("change", updateSummaryAndPrice);
  });

  document.querySelectorAll('input[name="package"]').forEach(radio => {
    radio.addEventListener("change", updateSummaryAndPrice);
  });

  // First update
  updateSummaryAndPrice();

  // 2) Submit handler
  const form = $("booking-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = $("name") ? $("name").value.trim() : "";
      const email = $("email") ? $("email").value.trim() : "";

      if (!name || !email) {
        alert("Please fill in at least your name and email.");
        return;
      }

      alert(
        "Thank you, " + name + "! Your booking request has been sent.\n" +
        "We will contact you at " + email + " soon."
      );

      form.reset();
      updateSummaryAndPrice();
    });
  }

  // 3) HERO SLIDESHOW (Book Tours Page) — like index
  const hero = document.querySelector(".hero-book");
  if (hero) {
    // IMPORTANT: pune imaginile astea exact cum se numesc la tine in folder
    const images = [
      "images/hero1.jpg",
      "images/hero2.jpg",
      "images/hero3.jpg"
    ];

    let index = 0;

    // set first image immediately (no grey)
    hero.style.backgroundImage = `url("${images[0]}")`;

    setInterval(() => {
      index = (index + 1) % images.length;
      hero.style.backgroundImage = `url("${images[index]}")`;
    }, 3500);
  }
});

