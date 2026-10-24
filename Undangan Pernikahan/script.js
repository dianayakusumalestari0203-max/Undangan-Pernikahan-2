
const weddingDate = new Date("2026-12-20T08:00:00+07:00").getTime();
function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;
  const values = {
    days: Math.max(
      0,
      Math.floor(distance / (1000 * 60 * 60 * 24))
    ),
    hours: Math.max(
      0,
      Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      )
    ),
    minutes: Math.max(
      0,
      Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
      )
    ),
    seconds: Math.max(
      0,
      Math.floor((distance % (1000 * 60)) / 1000)
    )
  };
  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = String(value).padStart(2, "0");
    }
  });
  if (distance <= 0) {
    const note = document.querySelector(".countdown-note");
    if (note) {
      note.textContent =
        "Hari bahagia kami telah tiba. Terima kasih telah menjadi bagian dari cerita kami.";
    }
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);
const rsvpForm = document.getElementById("rsvpForm");
const rsvpResult = document.getElementById("rsvpResult");
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}
rsvpForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = escapeHTML(
    document.getElementById("guestName").value.trim()
  )
  const attendance =
    document.getElementById("attendance").value;
  const message = escapeHTML(
    document.getElementById("guestMessage").value.trim()
  );
  if (!name || !attendance) return;
  rsvpResult.innerHTML =
    `<strong>Terima kasih, ${name}!</strong><br>` +
    `Konfirmasi Anda: ${attendance}.` +
    (
      message
        ? `<br><span class="d-block mt-2">“${message}”</span>`
        : ""
    );
  rsvpResult.classList.remove("d-none");
  rsvpResult.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("show", window.scrollY > 450);
});
backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
document.querySelectorAll("#mainNav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("mainNav");
    if (nav?.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});
(function () {
  const cover = document.getElementById("openingScreen");
  const openButton = document.getElementById("openInvitation");
  const guestLabel = document.getElementById("openingGuest");
  if (!cover) return;
  document.body.classList.add("invitation-locked");
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to");
  if (guestName && guestLabel) {
    guestLabel.textContent = guestName;
  }
  if (openButton) {
    openButton.addEventListener("click", function () {
      const music = document.getElementById("weddingMusic");
  if (music) {
    music.volume = 0.5;
    music.play().catch(function (error) {
      console.log("Musik belum dapat diputar:", error);
    });
  }
      cover.classList.add("is-closing");
      document.body.classList.remove("invitation-locked");
      setTimeout(function () {
        cover.remove();
      }, 700);
    });
  }
})();
async function copyGiftText(text, button) {
  const label = button.querySelector("span");
  const originalLabel = label.textContent;
  const feedback = document.querySelector(".gift-feedback");
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      const copied = document.execCommand("copy");
      temp.remove();
      if (!copied) {
        throw new Error("Gagal menyalin teks.");
      }
    }
    label.textContent = "Berhasil Disalin!";
    if (feedback) feedback.textContent = "Teks berhasil disalin.";
    setTimeout(() => {
      label.textContent = originalLabel;
      if (feedback) feedback.textContent = "";
    }, 2000);
  } catch (error) {
    if (feedback) {
      feedback.textContent =
        "Gagal menyalin. Silakan salin teks secara manual.";
    }
  }
}
