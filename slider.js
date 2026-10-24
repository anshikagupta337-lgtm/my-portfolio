const track = document.querySelector(".track");

// 1. Chat aur log wali list ko duplicate karo, taaki scroll kabhi ruke nahi
document.querySelectorAll(".feed").forEach(function (feed) {
    Array.from(feed.children).forEach(function (item) {
        feed.appendChild(item.cloneNode(true));
    });
});

// 2. Cards ko 5 baar aur copy karo, taaki screen kabhi khali na dikhe
const originals = Array.from(track.children);
for (let i = 0; i < 5; i++) {
    originals.forEach(function (card) {
        const copy = card.cloneNode(true);
        copy.setAttribute("aria-hidden", "true");
        copy.querySelectorAll("a").forEach(function (a) {
            a.tabIndex = -1;
        });
        track.appendChild(copy);
    });
}

// 3. Ek set ki chaudai nikalo aur utna hi khiskao, phir loop
function setSlider() {
    const setWidth = track.scrollWidth / 6;
    track.style.setProperty("--shift", "-" + setWidth + "px");
    track.style.animationDuration = setWidth / 45 + "s";
}

setSlider();
window.addEventListener("resize", setSlider);