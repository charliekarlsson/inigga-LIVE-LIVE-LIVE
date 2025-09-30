// DOM Elements
const startScreen = document.getElementById('start-screen');
const mainContent = document.getElementById('main-content');
const continueBtn = document.getElementById('continue-btn');
const mainVideo = document.getElementById('main-video');
const startContent = document.getElementById('start-content');
const contactAddress = document.querySelector('.contact-address');
const navbar = document.querySelector('.navbar');
const backgroundAudio = document.getElementById('background-audio');
const volumeSlider = document.getElementById('volume-slider');

// State
let videoPlayed = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Hide main content initially
    mainContent.classList.add('hidden');
    
    // Initialize main video to show first frame
    initMainVideo();
    
    // Initialize audio controls
    initAudioControls();
    
    // Add smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Add navbar scroll effect
    initNavbarEffects();
    
    // Add intersection observer for animations
    initScrollAnimations();
});

// Initialize main video
function initMainVideo() {
    if (mainVideo) {
        // Load the video metadata to show first frame
        mainVideo.addEventListener('loadedmetadata', () => {
            mainVideo.currentTime = 0.1; // Show first frame
        });
        
        // Handle video load error
        mainVideo.addEventListener('error', () => {
            console.log('Main video failed to load');
            // Fallback to gradient background
            startScreen.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        });
        
        // Handle video end
        mainVideo.addEventListener('ended', showMainContent);
        
        mainVideo.load();
    }
}

// Continue button click handler
continueBtn.addEventListener('click', function() {
    if (!videoPlayed) {
        startVideoSequence();
    }
});

// Video sequence handler
function startVideoSequence() {
    videoPlayed = true;
    
    // Hide the start content (logo, title, button) immediately
    startContent.style.opacity = '0';
    startContent.style.pointerEvents = 'none';
    
    // Hide the contact address
    if (contactAddress) {
        contactAddress.style.opacity = '0';
    }
    
    // Start background music
    startBackgroundMusic();
    
    // Start playing the video from the beginning
    if (mainVideo) {
        mainVideo.currentTime = 0;
        mainVideo.play().catch(error => {
            console.log('Video autoplay failed:', error);
            // If autoplay fails, skip to main content after a delay
            setTimeout(showMainContent, 2000);
        });
    } else {
        // If no video, skip to main content
        setTimeout(showMainContent, 1000);
    }
}



// Show main content with fade effect
function showMainContent() {
    // Fade out start screen
    startScreen.style.transition = 'opacity 1.5s ease-out';
    startScreen.style.opacity = '0';
    
    setTimeout(() => {
        startScreen.classList.add('hidden');
        revealMainContent();
    }, 1500);
}

// Reveal main content
function revealMainContent() {
    mainContent.classList.remove('hidden');
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 1.5s ease-in';
    
    setTimeout(() => {
        mainContent.style.opacity = '1';
        // Trigger entrance animations
        animateContentEntrance();
    }, 100);
}

// Animate content entrance
function animateContentEntrance() {
    const hero = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    // Animate hero elements
    if (heroLogo) {
        heroLogo.style.transform = 'translateY(50px)';
        heroLogo.style.opacity = '0';
        heroLogo.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            heroLogo.style.transform = 'translateY(0)';
            heroLogo.style.opacity = '1';
        }, 200);
    }
    
    if (heroTitle) {
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.opacity = '0';
        heroTitle.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            heroTitle.style.transform = 'translateY(0)';
            heroTitle.style.opacity = '1';
        }, 400);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.transform = 'translateY(30px)';
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            heroSubtitle.style.transform = 'translateY(0)';
            heroSubtitle.style.opacity = '1';
        }, 600);
    }
    
    if (heroCta) {
        heroCta.style.transform = 'translateY(30px)';
        heroCta.style.opacity = '0';
        heroCta.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            heroCta.style.transform = 'translateY(0)';
            heroCta.style.opacity = '1';
        }, 800);
    }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize navbar effects
function initNavbarEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove background based on scroll position
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar based on scroll direction (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate feature cards with stagger
                if (entry.target.classList.contains('feature-grid')) {
                    const cards = entry.target.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(0)';
                            card.style.opacity = '1';
                        }, index * 200);
                    });
                }
                
                // Animate download cards
                if (entry.target.classList.contains('download-options')) {
                    const cards = entry.target.querySelectorAll('.download-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = card.classList.contains('featured') ? 'scale(1.05)' : 'translateY(0)';
                            card.style.opacity = '1';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-grid, .feature-showcase, .download-options, .stats');
    animateElements.forEach(el => {
        observer.observe(el);
        
        // Set initial state for animations
        if (el.classList.contains('feature-grid')) {
            const cards = el.querySelectorAll('.feature-card');
            cards.forEach(card => {
                card.style.transform = 'translateY(50px)';
                card.style.opacity = '0';
                card.style.transition = 'all 0.8s ease-out';
            });
        }
        
        if (el.classList.contains('download-options')) {
            const cards = el.querySelectorAll('.download-card');
            cards.forEach(card => {
                card.style.transform = 'translateY(50px)';
                card.style.opacity = '0';
                card.style.transition = 'all 0.8s ease-out';
            });
        }
    });
}

// Add parallax effect to hero section (optional)
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// Add typing effect to hero title (optional)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && videoPlayed) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            
            if (i > text.length) {
                clearInterval(typeTimer);
            }
        }, 100);
    }
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press Enter or Space to continue from start screen
    if ((e.key === 'Enter' || e.key === ' ') && !startScreen.classList.contains('hidden')) {
        e.preventDefault();
        continueBtn.click();
    }
    
    // Press Escape to skip video
    if (e.key === 'Escape' && !videoSection.classList.contains('hidden')) {
        showMainContent();
    }
});

// Add touch/swipe support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    // Swipe up to continue from start screen
    if (diff > swipeThreshold && !startScreen.classList.contains('hidden')) {
        continueBtn.click();
    }
}

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add smooth hover effects for interactive elements
function initHoverEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .continue-btn');
    const cards = document.querySelectorAll('.feature-card, .download-card');
    
    // Button hover effects
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Card hover effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('featured') ? 'scale(1.08) translateY(-5px)' : 'translateY(-10px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('featured') ? 'scale(1.05)' : 'translateY(0)';
        });
    });
}

// Initialize audio controls
function initAudioControls() {
    if (backgroundAudio && volumeSlider) {
        // Set initial volume
        backgroundAudio.volume = volumeSlider.value / 100;
        
        // Volume slider control
        volumeSlider.addEventListener('input', function() {
            backgroundAudio.volume = this.value / 100;
        });
        
        // Handle audio loading errors
        backgroundAudio.addEventListener('error', function() {
            console.log('Background audio failed to load');
        });
    }
}

// Start background music
function startBackgroundMusic() {
    if (backgroundAudio) {
        backgroundAudio.play().catch(error => {
            console.log('Background audio autoplay failed:', error);
            // Audio autoplay failed, but that's okay - user can control it with the slider
        });
    }
}

// Initialize all effects when main content is shown
function initAllEffects() {
    initLazyLoading();
    initHoverEffects();
    // Uncomment if you want parallax effect
    // initParallaxEffect();
}

// Call initAllEffects when main content is revealed
const originalRevealMainContent = revealMainContent;
revealMainContent = function() {
    originalRevealMainContent();
    setTimeout(initAllEffects, 1000);
};