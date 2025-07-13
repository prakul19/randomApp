// script.js

// Handle the click event on the box
const box = document.getElementById('clickBox');
const audio = document.getElementById('popSound');
box.addEventListener('click', function handleClick() {
    // Play pop sound
    audio.play();
    // Update box to show the "I love you" message
    box.innerText = "I love you Shreya❤️";
    box.style.backgroundColor = '#ffe4e1';
    box.style.transform = 'scale(1.1)';
    box.style.fontSize = '1.8rem';
    // Disable further clicks
    box.style.pointerEvents = 'none';
    // Create multiple animated hearts
    for (let i = 0; i < 5; i++) {
        createHeart();
    }
});

// Function to create and animate a heart
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    // Random slight offset so hearts don't all overlap exactly
    const xOffset = Math.random() * 100 - 50; // -50 to 50 px
    const yOffset = Math.random() * 50 - 25;  // -25 to 25 px
    heart.style.left = `calc(50% + ${xOffset}px)`;
    heart.style.top = `calc(50% + ${yOffset}px)`;
    document.body.appendChild(heart);
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 2000);
}
