const canvas = document.getElementById('particles-canvas');
if (canvas) {
	const ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const particles = [];
	const particleCount = 80;

	class Particle {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.size = Math.random() * 2 + 1;
			this.speedX = Math.random() * 0.5 - 0.25;
			this.speedY = Math.random() * 0.5 - 0.25;
			const colorChoice = Math.random();
			if (colorChoice > 0.66) {
				this.color = 'rgba(212, 175, 55, 0.6)';
			} else if (colorChoice > 0.33) {
				this.color = 'rgba(196, 30, 58, 0.6)';
			} else {
				this.color = 'rgba(6, 182, 212, 0.6)';
			}
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;

			if (this.x > canvas.width) this.x = 0;
			if (this.x < 0) this.x = canvas.width;
			if (this.y > canvas.height) this.y = 0;
			if (this.y < 0) this.y = canvas.height;
		}

		draw() {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function init() {
		particles.length = 0;
		for (let i = 0; i < particleCount; i++) {
			particles.push(new Particle());
		}
	}

	function connectParticles() {
		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 120) {
					ctx.strokeStyle = 'rgba(212, 175, 55, ' + 0.15 * (1 - distance / 120) + ')';
					ctx.lineWidth = 0.5;
					ctx.beginPath();
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.stroke();
				}
			}
		}
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let particle of particles) {
			particle.update();
			particle.draw();
		}

		connectParticles();
		requestAnimationFrame(animate);
	}

	init();
	animate();

	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		init();
	});
}

const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length > 0) {
	fadeElements.forEach(el => {
		observer.observe(el);
	});
}

const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
	const counterObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const counter = entry.target;
				const target = parseInt(counter.getAttribute('data-target'));
				let count = 0;
				const increment = target / 50;

				const updateCount = () => {
					if (count < target) {
						count += increment;
						counter.textContent = Math.ceil(count);
						requestAnimationFrame(updateCount);
					} else {
						counter.textContent = target;
					}
				};

				updateCount();
				counterObserver.unobserve(counter);
			}
		});
	}, {
		threshold: 0.5
	});

	counters.forEach(counter => {
		counterObserver.observe(counter);
	});
}

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
	menuBtn.addEventListener('click', () => {
		navLinks.classList.toggle('active');
	});

	navLinks.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', () => {
			navLinks.classList.remove('active');
		});
	});
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
	contactForm.addEventListener('submit', (e) => {
		e.preventDefault();
		alert('感谢您的咨询！我们会尽快与您联系。');
	});
}

const nav = document.querySelector('nav');
if (nav) {
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			nav.style.background = 'linear-gradient(to bottom, rgba(10, 10, 15, 0.98), rgba(10, 10, 15, 0.92))';
		} else {
			nav.style.background = 'linear-gradient(to bottom, rgba(10, 10, 15, 0.95), rgba(10, 10, 15, 0.8))';
		}
	});
}

// 文字切换功能
const textItems = document.querySelectorAll('.text-item');
let currentIndex = 0;
const intervalTime = 4000; // 4秒切换一次

function switchText() {
	// 移除当前的active类
	textItems[currentIndex].classList.remove('active');

	// 更新索引
	currentIndex = (currentIndex + 1) % textItems.length;

	// 添加新的active类
	textItems[currentIndex].classList.add('active');
}

// 只有在有多个文字项时才启动切换
if (textItems.length > 1) {
	setInterval(switchText, intervalTime);
}