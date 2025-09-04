// Midnight - Snow Effect

// Initialize snow effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSnowEffect();
});

// Initialize snow effect
function initSnowEffect() {
  const snowflakesCount = 50; // Number of snowflakes
  const container = document.body;
  
  // Create snowflakes
  for (let i = 0; i < snowflakesCount; i++) {
    createSnowflake(container);
  }
}

// Create a single snowflake
function createSnowflake(container) {
  let snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  
  // Random size between 2px and 5px
  const size = Math.random() * 3 + 2;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  
  // Random starting position
  snowflake.style.left = `${Math.random() * 100}vw`;
  snowflake.style.top = `${Math.random() * 100}vh`;
  
  // Random opacity
  snowflake.style.opacity = Math.random() * 0.7 + 0.3;
  
  // Add to container
  container.appendChild(snowflake);
  
  // Animate snowflake
  animateSnowflake(snowflake);
}

// Animate individual snowflake
function animateSnowflake(snowflake) {
  // Random duration between 10 and 30 seconds
  const duration = Math.random() * 20 + 10;
  // Random horizontal movement
  const horizontalMovement = Math.random() * 10 - 5; // -5 to 5
  
  // Initial position
  const startingLeft = parseFloat(snowflake.style.left);
  const startingTop = parseFloat(snowflake.style.top);
  
  // Animation timestamp and start time
  let start = null;
  
  function moveSnowflake(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / (duration * 1000);
    
    if (progress >= 1) {
      // Reset snowflake to top when it reaches bottom
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.top = '-10px';
      animateSnowflake(snowflake);
      return;
    }
    
    // Calculate new position
    const newTop = startingTop + (progress * 100); // Move down
    const newLeft = startingLeft + (Math.sin(progress * 5) * horizontalMovement); // Slight horizontal movement
    
    // Apply new position
    snowflake.style.top = `${newTop}vh`;
    snowflake.style.left = `${newLeft}vw`;
    
    // Continue animation
    requestAnimationFrame(moveSnowflake);
  }
  
  requestAnimationFrame(moveSnowflake);
}
