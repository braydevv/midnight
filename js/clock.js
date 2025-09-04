// Midnight - Clock Component

// Initialize clock when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create clock if it doesn't exist
  createClockIfNeeded();
  
  // Initialize clock
  initClock();
});

// Create clock HTML structure if it doesn't exist
function createClockIfNeeded() {
  const clockContainer = document.querySelector('.clock-container');
  if (!clockContainer) return;
  
  // Check if clock already exists
  if (clockContainer.querySelector('.clock')) return;
  
  // Create clock structure
  const clockHTML = `
    <div class="clock">
      <!-- Hours -->
      <div class="clock-digit" data-value="0">
        <div class="clock-flip">
          <div class="clock-flip-front">0</div>
          <div class="clock-flip-back">0</div>
        </div>
      </div>
      <div class="clock-digit" data-value="0">
        <div class="clock-flip">
          <div class="clock-flip-front">0</div>
          <div class="clock-flip-back">0</div>
        </div>
      </div>
      
      <!-- Separator -->
      <div class="clock-separator">:</div>
      
      <!-- Minutes -->
      <div class="clock-digit" data-value="0">
        <div class="clock-flip">
          <div class="clock-flip-front">0</div>
          <div class="clock-flip-back">0</div>
        </div>
      </div>
      <div class="clock-digit" data-value="0">
        <div class="clock-flip">
          <div class="clock-flip-front">0</div>
          <div class="clock-flip-back">0</div>
        </div>
      </div>
      
      <!-- Separator -->
      <div class="clock-separator">:</div>
      
      <!-- Seconds -->
      <div class="clock-digit" data-value="0">
        <div class="clock-flip">
          <div class="clock-flip-front">0</div>
          <div class="clock-flip-back">0</div>
        </div>
      </div>
      <div class="clock-digit" data-value="0">
        <div class="clock-flip">
          <div class="clock-flip-front">0</div>
          <div class="clock-flip-back">0</div>
        </div>
      </div>
    </div>
    <div class="date"></div>
  `;
  
  // Add clock to container
  clockContainer.innerHTML = clockHTML;
}

// Initialize clock with flip animation
function initClock() {
  const clockElement = document.querySelector('.clock');
  if (!clockElement) return;
  
  // Initial clock setup
  updateClock();
  
  // Update clock every second
  setInterval(updateClock, 1000);
  
  // Update date
  updateDate();
}

// Update clock display with flip animation
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const clockDigits = document.querySelectorAll('.clock-digit');
  
  if (clockDigits.length === 6) { // 6 digits (HH:MM:SS)
    updateDigit(clockDigits[0], hours[0]);
    updateDigit(clockDigits[1], hours[1]);
    updateDigit(clockDigits[2], minutes[0]);
    updateDigit(clockDigits[3], minutes[1]);
    updateDigit(clockDigits[4], seconds[0]);
    updateDigit(clockDigits[5], seconds[1]);
  }
}

// Update individual digit with flip animation
function updateDigit(digitElement, newValue) {
  const currentValue = digitElement.getAttribute('data-value');
  
  // Only animate if value has changed
  if (currentValue !== newValue) {
    const flipElement = digitElement.querySelector('.clock-flip');
    
    // Set new back face value before flipping
    const backFace = flipElement.querySelector('.clock-flip-back');
    backFace.textContent = newValue;
    
    // Trigger flip animation
    flipElement.classList.add('flipped');
    
    // After animation completes
    setTimeout(() => {
      // Update front face and reset flip
      const frontFace = flipElement.querySelector('.clock-flip-front');
      frontFace.textContent = newValue;
      flipElement.classList.remove('flipped');
      
      // Update stored value
      digitElement.setAttribute('data-value', newValue);
    }, 500); // Match the CSS transition duration
  }
}

// Update date display
function updateDate() {
  const dateElement = document.querySelector('.date');
  if (!dateElement) return;
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = new Date().toLocaleDateString(undefined, options);
}
