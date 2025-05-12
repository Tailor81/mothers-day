// DOM Elements
const sections = document.querySelectorAll('.section');
const beginBtn = document.getElementById('beginBtn');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const storySections = document.querySelectorAll('.story-section');
const envelope = document.querySelector('.envelope');
const letterText = document.querySelector('.letter-text');

// Letter content
const letterContent = `Dear Mom,

From the moment I took my first steps, you've been there to catch me when I fall. Your love has been the constant in my life, a warm embrace that makes everything better.

I remember the bedtime stories you read, the way your voice would lull me to sleep. Those moments are precious treasures I carry in my heart.

Your guidance has shaped who I am today. The late-night talks, the words of wisdom, and the unconditional support you've given me have been my foundation.

You've taught me strength, compassion, and the importance of family. Your sacrifices and dedication have never gone unnoticed.

Thank you for being my biggest cheerleader, my confidant, and my best friend. Your love is the greatest gift I could ever ask for.

`;

// Navigation
let currentSection = 0;

function showSection(index) {
    sections.forEach(section => section.classList.remove('active'));
    sections[index].classList.add('active');
    currentSection = index;
}

// Music control
let isMusicPlaying = false;

// Function to handle music playback
async function handleMusicPlayback() {
    try {
        // Set volume to 50%
        bgMusic.volume = 0.5;
        
        // Try to play the music
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            await playPromise;
            isMusicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    } catch (error) {
        // If autoplay is blocked, show the music button
        console.log('Autoplay prevented:', error);
        musicToggle.style.display = 'block';
    }
}

// Attempt to play music when the page loads
document.addEventListener('DOMContentLoaded', handleMusicPlayback);

// Also try to play when the user interacts with the page
document.addEventListener('click', () => {
    if (!isMusicPlaying) {
        handleMusicPlayback();
    }
}, { once: true });

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Begin button click handler
beginBtn.addEventListener('click', () => {
    showSection(1);
    startStorybook();
    // Try to play music when user clicks begin
    if (!isMusicPlaying) {
        handleMusicPlayback();
    }
});

// Storybook animations
function startStorybook() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.dataset.section === 'now') {
                    setTimeout(() => {
                        showSection(2);
                        openEnvelope();
                    }, 5000);
                }
            }
        });
    }, { threshold: 0.5 });

    storySections.forEach(section => observer.observe(section));
}

// Envelope animation
function openEnvelope() {
    envelope.classList.add('open');
    setTimeout(startTypewriter, 1000);
}

// Typewriter effect
function startTypewriter() {
    let i = 0;
    const speed = 50;

    function type() {
        if (i < letterContent.length) {
            letterText.innerHTML += letterContent.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                showSection(3);
                startConfetti();
            }, 1000);
        }
    }

    type();
}

// Confetti animation
function startConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ffb6c1', '#e6e6fa', '#ff69b4', '#fff5f5'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -20 + 'px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiContainer.appendChild(confetti);
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style); 