const btn = document.getElementById("theme-btn");

btn.addEventListener("click", function () {
    document.body.classList.toggle("night");

    if (document.body.classList.contains("night")) {
        btn.textContent = "🌸 Day";
    } else {
        btn.textContent = "🌙 Night";
    }
});
const words = ["full-stack web apps.", "real-time chat apps.", "AI-powered features.", "clean React interfaces."]; let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typed = document.getElementById("typed");

function type() {
    const word = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typed.textContent = word.slice(0, charIndex);

    let delay = deleting ? 40 : 90;

    if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1500;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
    }

    setTimeout(type, delay);
}

type();
const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll("section").forEach(function (s) {
    s.classList.add("fade");
    observer.observe(s);
});