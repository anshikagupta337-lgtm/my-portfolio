const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
const mouse = { x: null, y: null };
let particles = [];

function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.min(110, Math.floor((canvas.width * canvas.height) / 14000));
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
        });
    }
}

window.addEventListener("resize", setup);
window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const night = document.body.classList.contains("night");
    const dotColor = night ? "255, 182, 213" : "255, 143, 177";
    const lineColor = night ? "200, 170, 255" : "183, 156, 255";

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + dotColor + ", 0.9)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dist = Math.hypot(p.x - q.x, p.y - q.y);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = "rgba(" + lineColor + ", " + (1 - dist / 120) * 0.5 + ")";
                ctx.stroke();
            }
        }

        if (mouse.x !== null) {
            const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
            if (d < 160) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = "rgba(255, 122, 198, " + (1 - d / 160) * 0.7 + ")";
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

setup();
animate();