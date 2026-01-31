/*
  Project: Model Train Hobbyist
  Main JavaScript File
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggler ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const body = document.body;

    // Check for saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = 'light';
            if (body.getAttribute('data-theme') !== 'dark') {
                body.setAttribute('data-theme', 'dark');
                theme = 'dark';
            } else {
                body.removeAttribute('data-theme');
                theme = 'light';
            }
            localStorage.setItem('theme', theme);
            updateThemeIcon(theme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }
    }

    // --- Active Link Highlighting ---
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add("active");
        }
    }

    // --- Sticky Header Shadow on Scroll ---
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-sm');
        } else {
            header.classList.remove('shadow-sm');
        }
    });

    // --- Back to Top Button ---
    const backToTopBtn = document.createElement('div');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Simple entrance animations for cards ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card-custom, .hero-content, .section-title').forEach(el => {
        el.style.opacity = '0'; // Initial state
        observer.observe(el);
    });

    // --- Dynamic Blog System ---
    const blogPosts = [
        {
            id: 1,
            title: "The Digital Revolution: Mastering DCC Control",
            category: "Tech Deep Dive",
            author: "James Smith",
            date: "Oct 28, 2025",
            heroImage: "assets/images/blog_dcc_tech.png",
            content: `
                <p class="lead mb-4">The digital revolution in model railroading has been ongoing for decades, but 2026 marks a turning point. Gone are the days of complex block wiring and toggle switches for every siding.</p>
                <p>Digital Command Control (DCC) sends power and signals through the rails constantly. The "magic" happens in the decoder installed inside the locomotive. It listens for its specific address and ignores instructions meant for other trains. This allows you to run multiple engines on the same track independently.</p>
                <h3 class="mt-4 mb-3">Plug-and-Play is Finally Real</h3>
                <p>Early DCC installations required soldering irons and a degree in electrical engineering. Today's "Next18" and "PluX22" interfaces mean you can snap a decoder in like a SIM card. We tested the latest batches from major manufacturers and found 100% compatibility.</p>
                <p>If you are still hesitating to make the switch, now is the time. The initial investment is higher, but the operational freedom is priceless. You can consist (mesh) engines together, control sound effects, and even operate switches from a handheld throttle.</p>
            `
        },
        {
            id: 2,
            title: "Hand-Laid Track: Worth The Pain?",
            category: "Layout Design",
            author: "Sarah Jenkins",
            date: "Oct 24, 2025",
            heroImage: "assets/images/gallery_masterpiece.png",
            content: `
                 <p class="lead mb-4">There is a certain romance to spiking your own rail. It creates a flow and organic look that commercial flex track simply cannot replicate.</p>
                 <p>However, it is not for the faint of heart. Hand-laying track requires patience, precision, and good eyesight. We spent a month building a complex junction using code 70 rail and wooden ties stained by hand.</p>
                 <h3 class="mt-4 mb-3">The Aesthetic Payoff</h3>
                 <p>The results are undeniable. The track profile looks scale-correct. The ties vary naturally in color. But functionally? It's harder to get perfect electrical continuity.</p>
                 <div class="alert alert-info border-0 shadow-sm"><i class="bi bi-info-circle-fill me-2"></i> <strong>Pro Tip:</strong> Use a layout jig to ensure your turnout frogs are perfectly aligned before spiking.</div>
                 <p><strong>Verdict:</strong> Do it for a showcase diorama, but stick to high-quality flex track for hidden staging yards or mainlines where reliability is king.</p>
            `
        },
        {
            id: 3,
            title: "Class A4 Pacific: A Legend Reborn",
            category: "Locomotive Review",
            author: "John Smith",
            date: "Oct 20, 2025",
            heroImage: "assets/images/train_steam_engine.png",
            content: `
                <p class="lead mb-4">The Mallard is perhaps the most famous steam locomotive in history. This new die-cast model does it justice in ways we haven't seen before.</p>
                <p>Weighing in at over 600 grams, the traction is phenomenal. It pulled 15 heavy-weight coaches up a 2% grade without slipping. The synchronized smoke unit chuffs in perfect time with the wheel rotation.</p>
                <h3 class="mt-4 mb-3">Sound and Fury</h3>
                <p>The onboard sound project was recorded from a preserved A4. The whistle has that haunting, multi-chime echo that sends shivers down a spine. At $450, it's an investment, but it's a centerpiece model.</p>
                <ul>
                    <li><strong>DCC Ready:</strong> Yes (21-pin)</li>
                    <li><strong>Sound:</strong> ESU Loksound 5</li>
                    <li><strong>Lights:</strong> LED directional</li>
                </ul>
            `
        },
        {
            id: 4,
            title: "Weathering 101: Rust & Grime",
            category: "Technique",
            author: "Mike Ross",
            date: "Oct 15, 2025",
            heroImage: "assets/images/train_freight_yard.png",
            content: `
                <p class="lead mb-4">A shiny plastic train looks like a toy. A dirty, rusty train looks real. Weathering is the single most effective way to improve your layout.</p>
                <p>Start with weathering powders. They are forgiving—if you mess up, you can wash them off. Focus on the trucks (wheels) and couplers, which get the dirtiest.</p>
                <h3 class="mt-4 mb-3">The Oil Wash Technique</h3>
                <p>For highlighting panel lines, an oil wash is best. Mix a tiny dot of Burnt Umber oil paint with mineral spirits. Capillary action will draw the dark wash into the crevices, making the detail pop. Wipe away the excess with a Q-tip.</p>
            `
        },
        {
            id: 5,
            title: "Modeling Realistic Trees",
            category: "Scenery",
            author: "Emma Wood",
            date: "Oct 10, 2025",
            heroImage: "assets/images/train_forest_route.png",
            content: `
                <p class="lead mb-4">Bottle brush trees have their place, but foreground trees need to look organic. We show you how to use sagebrush armatures and static grass fibers to create stunning pines.</p>
                <p>The key is transparency. Real trees are not solid cones of green. You should be able to see through the branches. Use hairspray to fix the flocking in layers.</p>
                <p>Don't be afraid to mix colors. A forest has many shades of green, brown, and even yellow. Monochromatic trees look artificial.</p>
            `
        }
    ];

    if (window.location.protocol.startsWith('http') || window.location.protocol.startsWith('file')) {
        // Simple check to run logic if we are on the details page
        // A more robust check might split the pathname, but this works for most URL structures
        if (window.location.href.includes('blog-details.html')) {
            const params = new URLSearchParams(window.location.search);
            const id = parseInt(params.get('id')); // Get ID from URL

            const post = blogPosts.find(p => p.id === id);

            const contentContainer = document.getElementById('post-content-container');

            if (post) {
                // Populate Content
                document.getElementById('post-title').innerText = post.title;
                document.getElementById('post-category').innerText = post.category;
                document.getElementById('post-meta').innerText = `By ${post.author} • ${post.date}`;

                // Hero Background
                const heroSection = document.getElementById('post-hero');
                heroSection.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${post.heroImage}') center/cover`;

                // Content Body
                document.getElementById('post-body').innerHTML = post.content;

                // Featured Image inside content (reuse hero or generic)
                const featImg = document.getElementById('post-feat-img');
                if (featImg) featImg.src = post.heroImage;

                // Update Breadcrumb
                const bcTitle = document.getElementById('breadcrumb-title');
                if (bcTitle) bcTitle.innerText = post.title.substring(0, 30) + '...';

                // Update Page Title
                document.title = `${post.title} - Model Train Hobbyist`;

            } else {
                if (contentContainer) {
                    contentContainer.innerHTML = `
                        <div class="text-center py-5">
                            <i class="bi bi-exclamation-circle display-1 text-muted mb-4"></i>
                            <h2 class="mb-3">Article Not Found</h2>
                            <p class="lead text-muted mb-4">The article you are looking for does not exist or has been moved.</p>
                            <a href="blog.html" class="btn btn-primary-custom rounded-pill">Back to Blog</a>
                        </div>
                    `;
                    // Hide Header info if not found
                    if (document.getElementById('post-hero')) document.getElementById('post-hero').style.display = 'none';
                }
            }
        }
    }

});
