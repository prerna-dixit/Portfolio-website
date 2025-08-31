// Enhanced Portfolio JavaScript with Dreamy Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize NProgress
    NProgress.start();
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('toggleTheme');
    const body = document.body;
    const themeLabel = document.querySelector('.theme-toggle label');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeToggle.checked = true;
        themeLabel.textContent = '☀️';
    }
    
    themeToggle.addEventListener('change', function() {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        themeLabel.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Add sparkle effect on theme change
        createSparkleExplosion(themeToggle);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add sparkle effect on navigation click
                createSparkleEffect(this);
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations if it's the skills section
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe all fade-slide elements
    document.querySelectorAll('.fade-slide').forEach(el => {
        observer.observe(el);
    });

    // Enhanced skill bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar span');
        
        skillBars.forEach((bar, index) => {
            const percentage = bar.getAttribute('data-percentage') || '80';
            
            setTimeout(() => {
                bar.style.setProperty('--skill-width', percentage + '%');
                bar.style.width = percentage + '%';
                
                // Add sparkle effect during animation
                createSparkleEffect(bar.parentElement);
            }, index * 200);
        });
    }

    // Create sparkle effect on elements
    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        const sparkle = document.createElement('div');
        
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #fff 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: sparkle 1s forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // Create sparkle explosion effect
    function createSparkleExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50;
            
            sparkle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #fff 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleExplosion 0.8s forwards;
                --end-x: ${Math.cos(angle) * distance}px;
                --end-y: ${Math.sin(angle) * distance}px;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }
    }

    // Back to top functionality
    const backTopBtn = document.getElementById('backTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backTopBtn.style.display = 'block';
        } else {
            backTopBtn.style.display = 'none';
        }
        
        // Parallax effect for header
        const scrolled = window.scrollY;
        const header = document.querySelector('header');
        if (header && scrolled < window.innerHeight) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    backTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        createSparkleExplosion(this);
    });

    // Enhanced contact form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            formMessage.textContent = 'Message sent successfully! ✨';
            formMessage.style.color = 'var(--pastel-green)';
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Create celebration sparkles
            createSparkleExplosion(submitBtn);
            
            // Clear message after 3 seconds
            setTimeout(() => {
                formMessage.textContent = '';
            }, 3000);
        }, 1000);
    });

    // Add hover sparkle effects to sparkle-hover elements
    document.querySelectorAll('.sparkle-hover').forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (Math.random() > 0.7) { // Random sparkle chance
                createSparkleEffect(this);
            }
        });
    });

    // Dynamic floating sparkles
    function createFloatingSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'dynamic-sparkle';
        
        sparkle.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: floatUp ${5 + Math.random() * 3}s linear forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 8000);
    }

    // Create floating sparkles periodically
    setInterval(createFloatingSparkle, 2000);

    // Add CSS for dynamic sparkles
    const dynamicSparkleCSS = `
        @keyframes floatUp {
            0% { 
                transform: translateY(0) rotate(0deg); 
                opacity: 0; 
            }
            10% { 
                opacity: 1; 
            }
            90% { 
                opacity: 1; 
            }
            100% { 
                transform: translateY(-${window.innerHeight + 100}px) rotate(360deg); 
                opacity: 0; 
            }
        }
        
        @keyframes sparkleExplosion {
            0% { 
                transform: translate(0, 0) scale(1); 
                opacity: 1; 
            }
            100% { 
                transform: translate(var(--end-x), var(--end-y)) scale(0); 
                opacity: 0; 
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = dynamicSparkleCSS;
    document.head.appendChild(style);

    // Glitter text effect enhancement
    document.querySelectorAll('.glitter').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });

    // Add typing effect to tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            tagline.textContent += text[i];
            i++;
            
            if (i >= text.length) {
                clearInterval(typeTimer);
                // Add final sparkle effect
                setTimeout(() => {
                    createSparkleEffect(tagline);
                }, 500);
            }
        }, 100);
    }

    // Enhanced card hover effects
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Create trailing sparkles
            if (Math.random() > 0.5) {
                setTimeout(() => createSparkleEffect(this), 100);
                setTimeout(() => createSparkleEffect(this), 300);
            }
        });
    });

    // Random background sparkles
    function addRandomBackgroundSparkle() {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            width: 2px;
            height: 2px;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: twinkle 2s ease-in-out;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    // Add random sparkles every few seconds
    setInterval(addRandomBackgroundSparkle, 3000);

    // Add CSS for twinkle animation
    const twinkleCSS = `
        @keyframes twinkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
        }
    `;
    
    const twinkleStyle = document.createElement('style');
    twinkleStyle.textContent = twinkleCSS;
    document.head.appendChild(twinkleStyle);

    // Page load complete
    window.addEventListener('load', function() {
        NProgress.done();
        
        // Add welcome sparkle explosion
        setTimeout(() => {
            const header = document.querySelector('header h1');
            if (header) {
                createSparkleExplosion(header);
            }
        }, 1000);
    });

    // Add cursor trail effect (optional - can be commented out if too much)
    let mouseMoved = false;
    document.addEventListener('mousemove', function(e) {
        if (!mouseMoved) {
            mouseMoved = true;
            setTimeout(() => {
                mouseMoved = false;
            }, 50);
            
            if (Math.random() > 0.95) { // Very rare cursor sparkles
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    width: 3px;
                    height: 3px;
                    background: radial-gradient(circle, rgba(224, 187, 228, 0.8) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                    animation: fadeOut 1s forwards;
                `;
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        }
    });

    // Add CSS for fade out animation
    const fadeOutCSS = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
        }
    `;
    
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = fadeOutCSS;
    document.head.appendChild(fadeOutStyle);

    // Easter egg functionality
    document.querySelectorAll('.easter-egg').forEach(egg => {
        egg.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            const title = this.getAttribute('title');
            
            if (link && link !== '#') {
                // Create sparkle explosion before opening link
                createSparkleExplosion(this);
                
                // Add a small delay for the sparkle effect
                setTimeout(() => {
                    window.open(link, '_blank');
                }, 300);
            } else {
                // For placeholder links, show a cute message
                createSparkleExplosion(this);
                alert('Thanks for finding this easter egg! ' + title);
            }
        });
        
        // Add hover tooltip effect
        egg.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'easter-tooltip';
            tooltip.textContent = this.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                bottom: -40px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 255, 255, 0.9);
                color: var(--text-dark);
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                white-space: nowrap;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 100);
        });
        
        egg.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.easter-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    console.log('✨ Dreamy portfolio loaded successfully! ✨');
});