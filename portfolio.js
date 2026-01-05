// Typing effect for job titles
function typeWriter(elementId, text, speed = 100) {
  const el = document.getElementById(elementId);
  let i = 0;

  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  typeWriter("job-titles", "Software QA Analyst / Project Coordinator / Application Support", 80);
});


// Smooth scroll for nav links
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Background animation
document.body.addEventListener("pointermove", (e) => {
  const { currentTarget: el, clientX: x, clientY: y } = e;
  const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
  el.style.setProperty("--posX", x - l - w / 2);
  el.style.setProperty("--posY", y - t - h / 2);
});

// Animate skill bars when visible
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

function animateSkillBars() {
  document.querySelectorAll(".skillbar").forEach(skillbar => {
    const bar = skillbar.querySelector(".skillbar-bar");
    const percent = skillbar.getAttribute("data-percent");
    if (isInViewport(skillbar) && bar.style.width === "") {
      bar.style.transition = "width 2s ease";
      bar.style.width = percent;
    }
  });
}

window.addEventListener("scroll", animateSkillBars);
window.addEventListener("load", animateSkillBars);

// Scroll arrow click (intro to about)
document.getElementById("moveDown")?.addEventListener("click", () => {
  document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
});



