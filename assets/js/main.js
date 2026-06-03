document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light') body.classList.add('light');
    updateThemeIcons(savedTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            if (newTheme === 'light') {
                body.classList.add('light');
                document.documentElement.classList.add('light');
            } else {
                body.classList.remove('light');
                document.documentElement.classList.remove('light');
            }
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (theme === 'dark') {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile');
    const html = document.documentElement;
    
    const savedDir = localStorage.getItem('dir') || 'ltr';
    html.setAttribute('dir', savedDir);

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            html.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    // Scroll Animations (Fade-up)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const speed = 2000 / target; // Adjust speed based on target
                const updateCount = () => {
                    const increment = target / 100;
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
    // Active Link Highlight Logic
    const navLinks = document.querySelectorAll('.nav-link');
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '' || currentPath === '/') currentPath = 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Back to Top Logic
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Password Visibility Toggle
    const togglePassword = document.querySelectorAll('.toggle-password');
    togglePassword.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // ==========================================
    // Redesign Interactions
    // ==========================================

    // Telescope Simulator Logic
    const simulatorTabs = document.querySelectorAll('.telescope-sim-tab');
    const lensImg = document.getElementById('telescope-lens-img');
    const simTitle = document.getElementById('telescope-sim-title');
    const simDesc = document.getElementById('telescope-sim-desc');
    const simCoords = document.getElementById('telescope-sim-coords');

    const simulatedObjects = {
        moon: {
            title: "The Moon (Lunar Craters)",
            desc: "Observe the deep impact craters Tycho and Copernicus along the terminator line. The moon's textured surface is illuminated by sharp sunlight angles.",
            coords: "RA 12h 45m / DEC -04° 12'",
            img: "assets/images/stargazing_guide.png"
        },
        saturn: {
            title: "Saturn (The Ringed Giant)",
            desc: "Gaze at Saturn's spectacular ring system, separated by the dark Cassini Division. In clear conditions, you can spot its largest moon, Titan.",
            coords: "RA 18h 22m / DEC -22° 30'",
            img: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&q=80&w=600"
        },
        orion: {
            title: "The Great Orion Nebula (M42)",
            desc: "A stellar nursery located 1,344 light-years away in the constellation Orion. Wisps of hydrogen gas are lit up by a central cluster of newborn stars.",
            coords: "RA 05h 35m / DEC -05° 23'",
            img: "assets/images/hero_space.png"
        }
    };

    if (simulatorTabs.length > 0 && lensImg) {
        simulatorTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                simulatorTabs.forEach(t => {
                    t.classList.remove('active', 'bg-accent-purple', 'text-white');
                    t.classList.add('glass', 'text-slate-300');
                });
                tab.classList.add('active', 'bg-accent-purple', 'text-white');
                tab.classList.remove('glass', 'text-slate-300');

                const objKey = tab.getAttribute('data-object');
                const data = simulatedObjects[objKey];
                if (data) {
                    lensImg.style.opacity = '0';
                    setTimeout(() => {
                        lensImg.src = data.img;
                        lensImg.style.opacity = '1';
                    }, 200);

                    simTitle.innerText = data.title;
                    simDesc.innerText = data.desc;
                    simCoords.innerText = data.coords;
                }
            });
        });
    }

    // Catalog Filter Logic
    const filterButtons = document.querySelectorAll('.catalog-filter-btn');
    const showCards = document.querySelectorAll('.catalog-show-card');

    if (filterButtons.length > 0 && showCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => {
                    b.classList.remove('active', 'bg-accent-purple', 'text-white');
                    b.classList.add('glass', 'text-slate-300');
                });
                btn.classList.add('active', 'bg-accent-purple', 'text-white');
                btn.classList.remove('glass', 'text-slate-300');

                const category = btn.getAttribute('data-filter');
                showCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Stargazing Tonight Widget Logic
    const moonPhaseElem = document.getElementById('moon-phase-name');
    const moonShadow = document.getElementById('moon-shadow');
    if (moonPhaseElem && moonShadow) {
        const date = new Date();
        const lp = 2551443;
        const new_moon = new Date(1970, 0, 7, 20, 35, 0);
        const phase = ((date.getTime() - new_moon.getTime()) / 1000) % lp;
        const age = phase / (24 * 3600);
        
        let phaseName = "";
        
        if (age < 1.84566) { phaseName = "New Moon"; }
        else if (age < 5.53699) { phaseName = "Waxing Crescent"; }
        else if (age < 9.22831) { phaseName = "First Quarter"; }
        else if (age < 12.91964) { phaseName = "Waxing Gibbous"; }
        else if (age < 16.61096) { phaseName = "Full Moon"; }
        else if (age < 20.30228) { phaseName = "Waning Gibbous"; }
        else if (age < 23.99361) { phaseName = "Third Quarter"; }
        else if (age < 27.68493) { phaseName = "Waning Crescent"; }
        else { phaseName = "New Moon"; }
        
        moonPhaseElem.innerText = phaseName;
        
        // Style shadow width and position based on phase age
        moonShadow.style.left = '0';
        if (phaseName === "Full Moon") {
            moonShadow.style.width = '0%';
        } else if (phaseName === "New Moon") {
            moonShadow.style.width = '100%';
            moonShadow.style.left = '0';
        } else if (phaseName.includes("Crescent")) {
            moonShadow.style.width = '70%';
            moonShadow.style.left = phaseName.includes("Waxing") ? '30%' : '-30%';
        } else if (phaseName.includes("Quarter")) {
            moonShadow.style.width = '50%';
            moonShadow.style.left = phaseName.includes("First") ? '50%' : '-50%';
        } else if (phaseName.includes("Gibbous")) {
            moonShadow.style.width = '20%';
            moonShadow.style.left = phaseName.includes("Waxing") ? '80%' : '-80%';
        }
    }

    // Stat Ring Animation on Scroll
    const statRings = document.querySelectorAll('.stat-ring');
    if (statRings.length > 0) {
        const ringObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetPercent = entry.target.getAttribute('data-percent');
                    entry.target.style.setProperty('--percentage', `${targetPercent}%`);
                    
                    const drawConic = (percent) => {
                        const activeColor = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#6d5ef3';
                        const isLight = document.body.classList.contains('light');
                        const trackColor = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
                        entry.target.style.backgroundImage = `conic-gradient(${activeColor} ${percent}%, ${trackColor} ${percent}%)`;
                    };
                    
                    let currentPercent = 0;
                    const animInterval = setInterval(() => {
                        if (currentPercent < targetPercent) {
                            currentPercent += 2;
                            if (currentPercent > targetPercent) currentPercent = targetPercent;
                            drawConic(currentPercent);
                        } else {
                            clearInterval(animInterval);
                        }
                    }, 15);
                    
                    ringObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        statRings.forEach(ring => ringObserver.observe(ring));
    }
});
