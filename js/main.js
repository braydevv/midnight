// Midnight - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initThemeSystem();
  initSidebar();
  initSnowEffect();
  initRainEffect();
  initSpaceEffect();
  
  // Initialize page-specific functionality based on current page
  const currentPage = getCurrentPage();
  initPageFunctionality(currentPage);
});

// Get current page from URL or default to home
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html', '');
  return page || 'index';
}

// Initialize theme system
function initThemeSystem() {
  // Get saved theme from localStorage or use default
  const savedTheme = localStorage.getItem('midnight-theme') || 'default';
  setTheme(savedTheme);
  
  // Add event listeners to theme options if they exist
  const themeOptions = document.querySelectorAll('.theme-option');
  if (themeOptions) {
    themeOptions.forEach(option => {
      option.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        setTheme(theme);
        
        // Update active class
        themeOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
}

// Set theme by adding appropriate class to body
function setTheme(theme) {
  // Remove all theme classes
  document.body.classList.remove('theme-pink', 'theme-blue', 'theme-green', 'theme-tan', 'theme-mystery');
  
  // Add selected theme class if not default
  if (theme !== 'default') {
    document.body.classList.add(`theme-${theme}`);
  }
  
  // Save to localStorage
  localStorage.setItem('midnight-theme', theme);
  
  // Special handling for mystery theme
  if (theme === 'mystery') {
    // Enable snow for Christmas theme
    localStorage.setItem('midnight-snow-enabled', 'true');
    // Reinitialize snow effect
    initSnowEffect();
  }
}

// Initialize sidebar functionality
function initSidebar() {
  // Mobile sidebar toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }
  
  // Set active nav link based on current page
  const currentPage = getCurrentPage();
  const activeLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
  
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // Initialize popup functionality
  initPopups();
}

// Initialize popup functionality
function initPopups() {
  const footerButtons = document.querySelectorAll('.footer-button');
  const popupOverlay = document.getElementById('popup-overlay');
  const popupCloseButtons = document.querySelectorAll('.popup-close');
  
  // Open popup when footer button is clicked
  footerButtons.forEach(button => {
    button.addEventListener('click', function() {
      const popupId = this.getAttribute('data-popup');
      const popup = document.getElementById(`${popupId}-popup`);
      
      if (popup) {
        openPopup(popup);
      }
    });
  });
  
  // Close popup when close button is clicked
  popupCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
      closeAllPopups();
    });
  });
  
  // Close popup when overlay is clicked
  if (popupOverlay) {
    popupOverlay.addEventListener('click', function() {
      closeAllPopups();
    });
  }
  
  // Close popup when escape key is pressed
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  });
}

// Open popup
function openPopup(popup) {
  const overlay = document.getElementById('popup-overlay');
  
  // Close any existing popups
  closeAllPopups();
  
  // Show overlay and popup
  overlay.classList.add('active');
  popup.classList.add('active');
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

// Close all popups
function closeAllPopups() {
  const overlay = document.getElementById('popup-overlay');
  const popups = document.querySelectorAll('.popup');
  
  overlay.classList.remove('active');
  popups.forEach(popup => {
    popup.classList.remove('active');
  });
  
  // Restore body scroll
  document.body.style.overflow = '';
}

// Initialize particle effects
function initSnowEffect() {
  // Check if snow is enabled in settings
  const snowEnabled = localStorage.getItem('midnight-snow-enabled') !== 'false';
  if (!snowEnabled) return;
  
  const snowflakesCount = 50; // Number of snowflakes
  const container = document.body;
  
  // Create snowflakes
  for (let i = 0; i < snowflakesCount; i++) {
    createSnowflake(container);
  }
  
  // Continuously create new snowflakes
  setInterval(() => {
    if (localStorage.getItem('midnight-snow-enabled') !== 'false') {
      createSnowflake(container);
    }
  }, 2000); // Create new snowflake every 2 seconds
}

// Initialize rain effect
function initRainEffect() {
  const rainEnabled = localStorage.getItem('midnight-rain-enabled') === 'true';
  if (!rainEnabled) return;
  
  const container = document.body;
  
  // Create rain drops
  for (let i = 0; i < 100; i++) {
    createRainDrop(container);
  }
  
  // Continuously create new rain drops
  setInterval(() => {
    if (localStorage.getItem('midnight-rain-enabled') === 'true') {
      createRainDrop(container);
    }
  }, 100); // Create new rain drop every 100ms
}

// Initialize space particles
function initSpaceEffect() {
  const spaceEnabled = localStorage.getItem('midnight-space-enabled') === 'true';
  if (!spaceEnabled) return;
  
  const container = document.body;
  
  // Create space particles
  for (let i = 0; i < 30; i++) {
    createSpaceParticle(container);
  }
  
  // Continuously create new space particles
  setInterval(() => {
    if (localStorage.getItem('midnight-space-enabled') === 'true') {
      createSpaceParticle(container);
    }
  }, 3000); // Create new space particle every 3 seconds
}

// Create individual snowflake
function createSnowflake(container) {
  let snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  
  // Random size between 2px and 5px
  const size = Math.random() * 3 + 2;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  
  // Start from top of screen
  snowflake.style.left = `${Math.random() * 100}vw`;
  snowflake.style.top = '-10px';
  
  // Random opacity
  snowflake.style.opacity = Math.random() * 0.7 + 0.3;
  
  // Add to container
  container.appendChild(snowflake);
  
  // Animate snowflake
  animateSnowflake(snowflake);
}

// Animate individual snowflake
function animateSnowflake(snowflake) {
  // Random duration between 8 and 15 seconds
  const duration = Math.random() * 7 + 8;
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
      // Remove snowflake when it reaches bottom
      snowflake.remove();
      return;
    }
    
    // Calculate new position
    const newTop = startingTop + (progress * 110); // Move down past viewport
    const newLeft = startingLeft + (Math.sin(progress * 5) * horizontalMovement); // Slight horizontal movement
    
    // Apply new position
    snowflake.style.top = `${newTop}vh`;
    snowflake.style.left = `${newLeft}vw`;
    
    // Continue animation
    requestAnimationFrame(moveSnowflake);
  }
  
  requestAnimationFrame(moveSnowflake);
}

// Create individual rain drop
function createRainDrop(container) {
  let rainDrop = document.createElement('div');
  rainDrop.classList.add('rain-drop');
  
  // Random size and speed
  const width = Math.random() * 2 + 1;
  const height = Math.random() * 20 + 10;
  const speed = Math.random() * 3 + 2;
  
  rainDrop.style.width = `${width}px`;
  rainDrop.style.height = `${height}px`;
  rainDrop.style.left = `${Math.random() * 100}vw`;
  rainDrop.style.top = '-20px';
  rainDrop.style.background = 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.6))';
  rainDrop.style.position = 'fixed';
  rainDrop.style.pointerEvents = 'none';
  rainDrop.style.zIndex = '9999';
  
  container.appendChild(rainDrop);
  animateRainDrop(rainDrop, speed);
}

// Animate individual rain drop
function animateRainDrop(rainDrop, speed) {
  const duration = (100 + Math.random() * 50) / speed; // Duration based on speed
  const startTime = Date.now();
  
  function moveRainDrop() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / (duration * 1000);
    
    if (progress >= 1) {
      rainDrop.remove();
      return;
    }
    
    const newTop = -20 + (progress * 120); // Move down past viewport
    rainDrop.style.top = `${newTop}vh`;
    
    requestAnimationFrame(moveRainDrop);
  }
  
  requestAnimationFrame(moveRainDrop);
}

// Create individual space particle
function createSpaceParticle(container) {
  let particle = document.createElement('div');
  particle.classList.add('space-particle');
  
  // Random size and position
  const size = Math.random() * 3 + 1;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${x}vw`;
  particle.style.top = `${y}vh`;
  particle.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)';
  particle.style.position = 'fixed';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '9998';
  particle.style.borderRadius = '50%';
  
  container.appendChild(particle);
  animateSpaceParticle(particle);
}

// Animate individual space particle
function animateSpaceParticle(particle) {
  const duration = Math.random() * 10 + 5; // 5-15 seconds
  const startTime = Date.now();
  const startX = parseFloat(particle.style.left);
  const startY = parseFloat(particle.style.top);
  
  function moveParticle() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / (duration * 1000);
    
    if (progress >= 1) {
      particle.remove();
      return;
    }
    
    // Slow drift movement
    const newX = startX + Math.sin(progress * Math.PI) * 10;
    const newY = startY + Math.cos(progress * Math.PI) * 5;
    const opacity = 0.8 - (progress * 0.8);
    
    particle.style.left = `${newX}vw`;
    particle.style.top = `${newY}vh`;
    particle.style.opacity = opacity;
    
    requestAnimationFrame(moveParticle);
  }
  
  requestAnimationFrame(moveParticle);
}

// Initialize page-specific functionality
function initPageFunctionality(page) {
  switch(page) {
    case 'index':
      initHomepage();
      break;
    case 'dashboard':
      initDashboard();
      break;
    case 'games':
      initGamesPage();
      break;
    case 'browse':
      initBrowserPage();
      break;
    case 'movies':
      initMoviesPage();
      break;
    case 'music':
      initMusicPage();
      break;
    case 'ai':
      initAIPage();
      break;
    case 'settings':
      initSettingsPage();
      break;
  }
}

// Homepage initialization
function initHomepage() {
  initClock();
  loadAnnouncements();
  loadFeaturedGames();
}

// Initialize clock with fade animation
function initClock() {
  const clockElement = document.querySelector('.clock');
  if (!clockElement) return;
  
  // Check if mystery theme is active
  const currentTheme = localStorage.getItem('midnight-theme');
  
  if (currentTheme === 'mystery') {
    initChristmasCountdown();
  } else {
    // Regular clock
    updateClock();
    setInterval(updateClock, 1000);
  }
  
  // Update date
  const dateElement = document.querySelector('.date');
  if (dateElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString(undefined, options);
  }
}

// Initialize Christmas countdown
function initChristmasCountdown() {
  const clockElement = document.querySelector('.clock');
  if (!clockElement) return;
  
  // Replace clock content with countdown
  clockElement.innerHTML = `
    <div class="christmas-countdown">
      <div class="countdown-title">days until christmas</div>
      <div class="countdown-days" id="countdown-days">0</div>
      <div class="countdown-time" id="countdown-time">00:00:00</div>
    </div>
  `;
  
  // Update countdown
  updateChristmasCountdown();
  setInterval(updateChristmasCountdown, 1000);
}

// Update Christmas countdown
function updateChristmasCountdown() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const christmas = new Date(currentYear, 11, 25); // December 25
  
  // If Christmas has passed this year, get next year's Christmas
  if (now > christmas) {
    christmas.setFullYear(currentYear + 1);
  }
  
  const timeDiff = christmas - now;
  
  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    const daysElement = document.getElementById('countdown-days');
    const timeElement = document.getElementById('countdown-time');
    
    if (daysElement) {
      daysElement.textContent = days;
    }
    
    if (timeElement) {
      timeElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  } else {
    // Christmas is here!
    const daysElement = document.getElementById('countdown-days');
    const timeElement = document.getElementById('countdown-time');
    
    if (daysElement) {
      daysElement.textContent = '0';
    }
    
    if (timeElement) {
      timeElement.textContent = 'merry christmas!';
    }
  }
}

// Update clock display with fade animation
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Convert to 12-hour format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const hoursStr = String(hours).padStart(2, '0');
  
  const clockDigits = document.querySelectorAll('.clock-digit');
  
  if (clockDigits.length === 6) { // 6 digits (HH:MM:SS)
    updateDigit(clockDigits[0], hoursStr[0]);
    updateDigit(clockDigits[1], hoursStr[1]);
    updateDigit(clockDigits[2], minutes[0]);
    updateDigit(clockDigits[3], minutes[1]);
    updateDigit(clockDigits[4], seconds[0]);
    updateDigit(clockDigits[5], seconds[1]);
  }
}

// Update individual digit with fade animation
function updateDigit(digitElement, newValue) {
  const currentValue = digitElement.getAttribute('data-value');
  
  // Only animate if value has changed
  if (currentValue !== newValue) {
    const flipElement = digitElement.querySelector('.clock-flip');
    
    // Set new value
    const frontFace = flipElement.querySelector('.clock-flip-front');
    frontFace.textContent = newValue;
    
    // Trigger fade animation
    flipElement.classList.add('fade-in');
    
    // After animation completes
    setTimeout(() => {
      flipElement.classList.remove('fade-in');
      
      // Update stored value
      digitElement.setAttribute('data-value', newValue);
    }, 300); // Match the CSS transition duration
  }
}

// Load announcements from API or static data
function loadAnnouncements() {
  const announcementsContainer = document.querySelector('.announcements-list');
  if (!announcementsContainer) return;
  
  // Sample announcements data (in a real app, this would come from an API)
  const announcements = [
    {
      date: '2025-09-01',
      title: 'welcome to midnight',
      content: 'the ultimate unblocked hub is now live! enjoy games, movies, and more.'
    },
    {
      date: '2025-09-02',
      title: 'new games added',
      content: 'check out the latest additions to our games collection.'
    },
    {
      date: '2025-09-03',
      title: 'coming soon: vm feature',
      content: 'we\'re working on a virtual machine feature. stay tuned!'
    }
  ];
  
  // Clear container
  announcementsContainer.innerHTML = '';
  
  // Add announcements to container
  announcements.forEach(announcement => {
    const date = new Date(announcement.date);
    const formattedDate = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    
    const announcementElement = document.createElement('div');
    announcementElement.classList.add('announcement-item');
    announcementElement.innerHTML = `
      <div class="announcement-date">${formattedDate}</div>
      <div class="announcement-title">${announcement.title}</div>
      <div class="announcement-content">${announcement.content}</div>
    `;
    
    announcementsContainer.appendChild(announcementElement);
  });
}

// Load featured games
function loadFeaturedGames() {
  const featuredGamesContainer = document.querySelector('.featured-games-list');
  if (!featuredGamesContainer) return;
  
  // Sample featured games data
  const featuredGames = [
    {
      title: 'cosmic adventure',
      description: 'explore the universe in this exciting space adventure game.',
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'pixel warriors',
      description: 'battle in retro-style arenas with unique pixel characters.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  // Clear container
  featuredGamesContainer.innerHTML = '';
  
  // Add featured games to container
  featuredGames.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.classList.add('featured-game');
    gameElement.innerHTML = `
      <img src="${game.image}" alt="${game.title}" class="featured-game-image">
      <div class="featured-game-info">
        <h3 class="featured-game-title">${game.title}</h3>
        <p class="featured-game-description">${game.description}</p>
        <button class="game-card-button">play now</button>
      </div>
    `;
    
    featuredGamesContainer.appendChild(gameElement);
  });
}

// Dashboard initialization
function initDashboard() {
  // Dashboard functionality would go here
  console.log('Dashboard initialized');
}

// Games page initialization
function initGamesPage() {
  loadGames();
  initSearchFunctionality('.games-search', '.game-card');
}

// Load games data
function loadGames() {
  const gamesContainer = document.querySelector('.games-grid');
  if (!gamesContainer) return;
  
  // Use external games data
  const games = GAMES_DATA;
  
  // Clear container
  gamesContainer.innerHTML = '';
  
  // Add games to container
  games.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.classList.add('card', 'game-card');
    gameElement.innerHTML = `
      <img src="${game.image}" alt="${game.title}" class="game-card-image">
      <div class="game-card-content">
        <h3 class="game-card-title">${game.title}</h3>
        <p class="game-card-description">${game.description}</p>
        <button class="game-card-button" data-game-url="${game.url}">play</button>
      </div>
    `;
    
    gamesContainer.appendChild(gameElement);
  });
  
  // Add click handlers for game buttons
  gamesContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('game-card-button')) {
      const gameUrl = e.target.getAttribute('data-game-url');
      if (gameUrl) {
        window.open(gameUrl, '_blank');
      }
    }
  });
}

// Initialize search functionality
function initSearchFunctionality(searchSelector, itemSelector) {
  const searchInput = document.querySelector(searchSelector);
  if (!searchInput) return;
  
  if (searchSelector === '.movies-search') {
    // Special handling for movie search with TMDB API
    let searchTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const searchTerm = this.value.trim();
      
      if (searchTerm.length >= 2) {
        searchTimeout = setTimeout(() => {
          searchMovies(searchTerm);
        }, 500); // Debounce search
      } else if (searchTerm.length === 0) {
        // Show popular movies when search is empty
        loadMoviesFromTMDB();
      }
    });
  } else {
    // Regular search for other pages
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const items = document.querySelectorAll(itemSelector);
      
      items.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

// Search movies using TMDB API
async function searchMovies(query) {
  const moviesContainer = document.querySelector('.movies-grid');
  if (!moviesContainer) return;
  
  try {
    // Show loading state
    moviesContainer.innerHTML = '<div class="loading-message">searching movies...</div>';
    
    // Search movies
    const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      displayMovies(data.results);
    } else {
      moviesContainer.innerHTML = '<div class="no-results">no movies found for your search.</div>';
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    moviesContainer.innerHTML = '<div class="error-message">failed to search movies. please try again later.</div>';
  }
}

// Browser page initialization
function initBrowserPage() {
  initBrowserTabs();
  initBrowserNavigation();
}

// Initialize browser tabs
function initBrowserTabs() {
  const tabsContainer = document.querySelector('.browser-tabs');
  const newTabButton = document.querySelector('.browser-new-tab');
  const browserContent = document.querySelector('.browser-content');
  
  if (!tabsContainer || !newTabButton || !browserContent) return;
  
  // Create initial tab if none exists
  if (tabsContainer.querySelectorAll('.browser-tab').length === 0) {
    createNewTab('New Tab', true);
  }
  
  // New tab button click
  newTabButton.addEventListener('click', () => {
    createNewTab('New Tab', true);
  });
  
  // Function to create a new tab
  function createNewTab(title, active = false) {
    // Deactivate all tabs first if this one will be active
    if (active) {
      tabsContainer.querySelectorAll('.browser-tab').forEach(tab => {
        tab.classList.remove('active');
      });
    }
    
    // Create new tab element
    const tab = document.createElement('div');
    tab.classList.add('browser-tab');
    if (active) tab.classList.add('active');
    
    tab.innerHTML = `
      <span class="browser-tab-title">${title}</span>
      <span class="browser-tab-close"><i class="fas fa-times"></i></span>
    `;
    
    // Add click event to activate tab
    tab.addEventListener('click', (e) => {
      if (!e.target.closest('.browser-tab-close')) {
        activateTab(tab);
      }
    });
    
    // Add close button event
    tab.querySelector('.browser-tab-close').addEventListener('click', () => {
      closeTab(tab);
    });
    
    // Add to tabs container before the new tab button
    tabsContainer.insertBefore(tab, newTabButton);
    
    // If active, create iframe for this tab
    if (active) {
      createIframeForTab(tab);
    }
    
    return tab;
  }
  
  // Function to activate a tab
  function activateTab(tab) {
    // Deactivate all tabs
    tabsContainer.querySelectorAll('.browser-tab').forEach(t => {
      t.classList.remove('active');
    });
    
    // Activate selected tab
    tab.classList.add('active');
    
    // Create iframe if it doesn't exist
    createIframeForTab(tab);
  }
  
  // Function to close a tab
  function closeTab(tab) {
    const isActive = tab.classList.contains('active');
    const nextTab = tab.nextElementSibling;
    const prevTab = tab.previousElementSibling;
    
    // Remove tab
    tab.remove();
    
    // If this was the active tab, activate another one
    if (isActive) {
      if (prevTab && prevTab.classList.contains('browser-tab')) {
        activateTab(prevTab);
      } else if (nextTab && nextTab.classList.contains('browser-tab')) {
        activateTab(nextTab);
      } else {
        // No tabs left, create a new one
        createNewTab('New Tab', true);
      }
    }
  }
  
  // Function to create iframe for a tab
  function createIframeForTab(tab) {
    // Clear browser content
    browserContent.innerHTML = '';
    
    // Create loading bar
    const loadingBar = document.createElement('div');
    loadingBar.classList.add('browser-loading');
    browserContent.appendChild(loadingBar);
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.classList.add('browser-iframe');
    iframe.src = 'about:blank'; // Default blank page
    browserContent.appendChild(iframe);
    
    // Update URL bar
    const urlBar = document.querySelector('.browser-url');
    if (urlBar) {
      urlBar.value = '';
    }
    
    // Remove loading bar after "loading" completes
    setTimeout(() => {
      loadingBar.remove();
    }, 2000);
  }
}

// Initialize browser navigation
function initBrowserNavigation() {
  const urlBar = document.querySelector('.browser-url');
  const backButton = document.querySelector('.browser-back');
  const forwardButton = document.querySelector('.browser-forward');
  const refreshButton = document.querySelector('.browser-refresh');
  
  if (!urlBar) return;
  
  // URL bar enter key
  urlBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      navigateToUrl(urlBar.value);
    }
  });
  
  // Back button
  if (backButton) {
    backButton.addEventListener('click', () => {
      const iframe = document.querySelector('.browser-iframe');
      if (iframe) {
        iframe.contentWindow.history.back();
      }
    });
  }
  
  // Forward button
  if (forwardButton) {
    forwardButton.addEventListener('click', () => {
      const iframe = document.querySelector('.browser-iframe');
      if (iframe) {
        iframe.contentWindow.history.forward();
      }
    });
  }
  
  // Refresh button
  if (refreshButton) {
    refreshButton.addEventListener('click', () => {
      const iframe = document.querySelector('.browser-iframe');
      if (iframe) {
        iframe.src = iframe.src;
      }
    });
  }
  
  // Function to navigate to URL
  function navigateToUrl(url) {
    // Add loading bar
    const browserContent = document.querySelector('.browser-content');
    const loadingBar = document.createElement('div');
    loadingBar.classList.add('browser-loading');
    browserContent.appendChild(loadingBar);
    
    // Get iframe
    const iframe = document.querySelector('.browser-iframe');
    if (!iframe) return;
    
    // Process URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Check if it's a URL or search term
      if (url.includes('.') && !url.includes(' ')) {
        url = 'https://' + url;
      } else {
        url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
      }
    }
    
    // Update iframe src
    iframe.src = url;
    
    // Update active tab title
    const activeTab = document.querySelector('.browser-tab.active');
    if (activeTab) {
      activeTab.querySelector('.browser-tab-title').textContent = 'Loading...';
      
      // Update title after page loads
      iframe.onload = () => {
        try {
          activeTab.querySelector('.browser-tab-title').textContent = iframe.contentDocument.title || url;
        } catch (e) {
          // Cross-origin issues
          activeTab.querySelector('.browser-tab-title').textContent = new URL(url).hostname;
        }
        
        // Remove loading bar
        loadingBar.remove();
      };
    }
  }
}

// Movies page initialization
function initMoviesPage() {
  loadMoviesFromTMDB();
  initSearchFunctionality('.movies-search', '.movie-card');
  initMovieModal();
}

// TMDB API configuration
const TMDB_API_KEY = 'ae44ac985c819a5af8acb1e6564645bf';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Load movies from TMDB API
async function loadMoviesFromTMDB() {
  const moviesContainer = document.querySelector('.movies-grid');
  if (!moviesContainer) return;
  
  try {
    // Show loading state
    moviesContainer.innerHTML = '<div class="loading-message">loading movies...</div>';
    
    // Fetch popular movies
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    
    if (data.results) {
      displayMovies(data.results);
    } else {
      throw new Error('Failed to fetch movies');
    }
  } catch (error) {
    console.error('Error loading movies:', error);
    moviesContainer.innerHTML = '<div class="error-message">failed to load movies. please try again later.</div>';
  }
}

// Display movies in the grid
function displayMovies(movies) {
  const moviesContainer = document.querySelector('.movies-grid');
  if (!moviesContainer) return;
  
  // Clear container
  moviesContainer.innerHTML = '';
  
  // Add movies to container
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('card', 'movie-card');
    movieElement.setAttribute('data-movie-id', movie.id);
    movieElement.style.cursor = 'pointer';
    
    const posterUrl = movie.poster_path 
      ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
      : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
    
    movieElement.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title}" class="movie-card-image">
      <div class="game-card-content">
        <h3 class="game-card-title">${movie.title}</h3>
        <p class="game-card-description">${movie.overview ? movie.overview.substring(0, 100) + '...' : 'no description available'}</p>
        <button class="game-card-button movie-detail-btn" data-movie-id="${movie.id}">view details</button>
      </div>
    `;
    
    // Add click handler to play movie directly
    movieElement.addEventListener('click', function(e) {
      if (!e.target.classList.contains('movie-detail-btn')) {
        playMovie(movie.id);
      }
    });
    
    moviesContainer.appendChild(movieElement);
  });
}

// Initialize movie modal functionality
function initMovieModal() {
  const modal = document.getElementById('movie-modal');
  const closeBtn = document.querySelector('.movie-modal-close');
  
  // Close modal when close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMovieModal);
  }
  
  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeMovieModal();
      }
    });
  }
  
  // Close modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeMovieModal();
    }
  });
  
  // Handle movie detail button clicks
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('movie-detail-btn')) {
      const movieId = e.target.getAttribute('data-movie-id');
      if (movieId) {
        showMovieDetails(movieId);
      }
    }
  });
  
  // Handle watch now button clicks
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('movie-watch-button')) {
      const movieId = e.target.getAttribute('data-movie-id');
      if (movieId) {
        openMoviePlayer(movieId);
      }
    }
  });
  
  // Initialize movie player modal
  initMoviePlayerModal();
}

// Show movie details in modal
async function showMovieDetails(movieId) {
  const modal = document.getElementById('movie-modal');
  if (!modal) return;
  
  try {
    // Show loading state
    modal.classList.add('active');
    document.getElementById('movie-modal-title').textContent = 'loading...';
    
    // Fetch movie details
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`);
    const movie = await response.json();
    
    if (movie) {
      // Update modal content
      document.getElementById('movie-modal-title').textContent = movie.title;
      document.getElementById('movie-modal-overview').textContent = movie.overview || 'no overview available';
      document.getElementById('movie-modal-release-date').textContent = movie.release_date || 'unknown';
      document.getElementById('movie-modal-rating').textContent = movie.vote_average ? `${movie.vote_average}/10` : 'no rating';
      document.getElementById('movie-modal-genres').textContent = movie.genres ? movie.genres.map(g => g.name).join(', ') : 'unknown';
      document.getElementById('movie-modal-runtime').textContent = movie.runtime ? `${movie.runtime} minutes` : 'unknown';
      
      // Update poster
      const posterUrl = movie.poster_path 
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
      document.getElementById('movie-modal-poster').src = posterUrl;
      document.getElementById('movie-modal-poster').alt = movie.title;
      
      // Update watch button with movie ID
      const watchButton = document.getElementById('movie-watch-btn');
      if (watchButton) {
        watchButton.setAttribute('data-movie-id', movieId);
      }
    }
  } catch (error) {
    console.error('Error loading movie details:', error);
    document.getElementById('movie-modal-title').textContent = 'error loading movie details';
  }
}

// Close movie modal
function closeMovieModal() {
  const modal = document.getElementById('movie-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Music page initialization
function initMusicPage() {
  loadMusic();
  initSearchFunctionality('.music-search', '.music-card');
  initMusicPlayer();
  initFeaturedAlbum();
}

// YouTube API variables
let youtubePlayer = null;
let currentPlaylist = [];
let currentTrackIndex = 0;
let isPlaying = false;

// Load music data
function loadMusic() {
  const musicContainer = document.querySelector('.music-grid');
  if (!musicContainer) return;
  
  // Sample music data with YouTube video IDs
  const music = [
    {
      title: 'electronic dreams',
      artist: 'synthwave collective',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoId: 'dQw4w9WgXcQ' // Sample video ID
    },
    {
      title: 'midnight vibes',
      artist: 'chill beats',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'urban rhythm',
      artist: 'city sounds',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'acoustic journey',
      artist: 'string quartet',
      image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoId: 'dQw4w9WgXcQ'
    }
  ];
  
  // Set current playlist
  currentPlaylist = music;
  
  // Clear container
  musicContainer.innerHTML = '';
  
  // Add music to container
  music.forEach((track, index) => {
    const musicElement = document.createElement('div');
    musicElement.classList.add('card', 'music-card');
    musicElement.innerHTML = `
      <img src="${track.image}" alt="${track.title}" class="music-card-image">
      <div class="game-card-content">
        <h3 class="game-card-title">${track.title}</h3>
        <p class="game-card-description">${track.artist}</p>
        <button class="game-card-button music-play-btn" data-index="${index}">play</button>
      </div>
    `;
    
    musicContainer.appendChild(musicElement);
  });
}

// Initialize music player
function initMusicPlayer() {
  // Load YouTube API
  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  // Set up player controls
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const progressBar = document.querySelector('.progress-bar');
  
  if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', previousTrack);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextTrack);
  }
  
  if (volumeSlider) {
    volumeSlider.addEventListener('input', setVolume);
  }
  
  if (progressBar) {
    progressBar.addEventListener('click', seekTo);
  }
  
  // Handle music play button clicks
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('music-play-btn')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      playTrack(index);
    }
  });
}

// Initialize featured album
function initFeaturedAlbum() {
  const featuredAlbumPlay = document.querySelector('.featured-album-play');
  if (featuredAlbumPlay) {
    featuredAlbumPlay.addEventListener('click', function() {
      // Play the featured album (Sabrina Carpenter - Man's Best Friend)
      // This would typically load a playlist of songs from the album
      console.log('Playing featured album: Man\'s Best Friend by Sabrina Carpenter');
    });
  }
}

// YouTube API ready callback
window.onYouTubeIframeAPIReady = function() {
  youtubePlayer = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    playerVars: {
      'playsinline': 1,
      'controls': 0,
      'showinfo': 0,
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

// Player ready callback
function onPlayerReady(event) {
  console.log('YouTube player ready');
}

// Player state change callback
function onPlayerStateChange(event) {
  const playBtn = document.getElementById('play-btn');
  const playIcon = playBtn.querySelector('i');
  
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    playIcon.className = 'fas fa-pause';
  } else {
    isPlaying = false;
    playIcon.className = 'fas fa-play';
  }
}

// Play track
function playTrack(index) {
  if (!youtubePlayer || !currentPlaylist[index]) return;
  
  currentTrackIndex = index;
  const track = currentPlaylist[index];
  
  // Update player display
  document.getElementById('player-cover').src = track.image;
  document.getElementById('player-title').textContent = track.title;
  document.getElementById('player-artist').textContent = track.artist;
  
  // Load and play video
  youtubePlayer.loadVideoById(track.videoId);
  youtubePlayer.playVideo();
}

// Toggle play/pause
function togglePlay() {
  if (!youtubePlayer) return;
  
  if (isPlaying) {
    youtubePlayer.pauseVideo();
  } else {
    youtubePlayer.playVideo();
  }
}

// Previous track
function previousTrack() {
  if (currentTrackIndex > 0) {
    playTrack(currentTrackIndex - 1);
  } else {
    playTrack(currentPlaylist.length - 1);
  }
}

// Next track
function nextTrack() {
  if (currentTrackIndex < currentPlaylist.length - 1) {
    playTrack(currentTrackIndex + 1);
  } else {
    playTrack(0);
  }
}

// Set volume
function setVolume() {
  const volume = document.getElementById('volume-slider').value;
  if (youtubePlayer) {
    youtubePlayer.setVolume(volume);
  }
}

// Seek to position
function seekTo(event) {
  if (!youtubePlayer) return;
  
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = clickX / rect.width;
  
  const duration = youtubePlayer.getDuration();
  const newTime = duration * percentage;
  
  youtubePlayer.seekTo(newTime);
}

// AI page initialization
function initAIPage() {
  const aiInput = document.querySelector('.ai-input');
  const aiSend = document.querySelector('.ai-send');
  const aiMessages = document.querySelector('.ai-messages');
  
  if (!aiInput || !aiSend || !aiMessages) return;
  
  // Add welcome message from brayGPT
  addAIMessage('yo what\'s good! i\'m braygpt, your midnight ai homie. what you tryna do today?');
  
  // Send button click
  aiSend.addEventListener('click', sendMessage);
  
  // Enter key in input
  aiInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Function to send message
  async function sendMessage() {
    const message = aiInput.value.trim();
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    aiInput.value = '';
    
    // Show typing indicator
    const typingIndicator = addTypingIndicator();
    
    try {
      // Call Gemini API
      const response = await callGeminiAPI(message);
      removeTypingIndicator(typingIndicator);
      addAIMessage(response);
    } catch (error) {
      removeTypingIndicator(typingIndicator);
      addAIMessage('yo my bad, something went wrong. try again in a sec?');
      console.error('Gemini API error:', error);
    }
  }
  
  // Function to add user message
  function addUserMessage(text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('ai-message', 'user');
    messageElement.textContent = text;
    aiMessages.appendChild(messageElement);
    
    // Scroll to bottom
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }
  
  // Function to add AI message
  function addAIMessage(text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('ai-message', 'assistant');
    messageElement.textContent = text;
    aiMessages.appendChild(messageElement);
    
    // Scroll to bottom
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }
  
  // Function to add typing indicator
  function addTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('ai-message', 'assistant', 'typing');
    typingElement.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    aiMessages.appendChild(typingElement);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    return typingElement;
  }
  
  // Function to remove typing indicator
  function removeTypingIndicator(typingElement) {
    if (typingElement) {
      typingElement.remove();
    }
  }
}

// Call Gemini API
async function callGeminiAPI(message) {
  const GEMINI_API_KEY = 'AIzaSyCZR8bAh0hJ3Sax0CaPa6fokMzgTuBotOk';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  
  const prompt = `you are braygpt, a cool ai assistant for the midnight website. respond in a casual, lowercase, slang-filled way. be helpful but keep it real. user said: ${message}`;
  
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    return data.candidates[0].content.parts[0].text;
  } else {
    throw new Error('Invalid response from Gemini API');
  }
}

// Settings page initialization
function initSettingsPage() {
  // Theme options are already handled by initThemeSystem()
  
  // Get saved theme from localStorage
  const savedTheme = localStorage.getItem('midnight-theme') || 'default';
  
  // Set active class on current theme
  const themeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
  if (themeOption) {
    themeOption.classList.add('active');
  }
  
  // Initialize particle effect toggles
  initParticleToggles();
}

// Initialize particle effect toggles
function initParticleToggles() {
  // Snow toggle
  const snowToggle = document.getElementById('snow-toggle');
  if (snowToggle) {
    snowToggle.checked = localStorage.getItem('midnight-snow-enabled') !== 'false';
    snowToggle.addEventListener('change', function() {
      localStorage.setItem('midnight-snow-enabled', this.checked);
      if (this.checked) {
        initSnowEffect();
      } else {
        // Remove all snowflakes
        document.querySelectorAll('.snowflake').forEach(snowflake => snowflake.remove());
      }
    });
  }
  
  // Rain toggle
  const rainToggle = document.getElementById('rain-toggle');
  if (rainToggle) {
    rainToggle.checked = localStorage.getItem('midnight-rain-enabled') === 'true';
    rainToggle.addEventListener('change', function() {
      localStorage.setItem('midnight-rain-enabled', this.checked);
      if (this.checked) {
        initRainEffect();
      } else {
        // Remove all rain drops
        document.querySelectorAll('.rain-drop').forEach(drop => drop.remove());
      }
    });
  }
  
  // Space toggle
  const spaceToggle = document.getElementById('space-toggle');
  if (spaceToggle) {
    spaceToggle.checked = localStorage.getItem('midnight-space-enabled') === 'true';
    spaceToggle.addEventListener('change', function() {
      localStorage.setItem('midnight-space-enabled', this.checked);
      if (this.checked) {
        initSpaceEffect();
      } else {
        // Remove all space particles
        document.querySelectorAll('.space-particle').forEach(particle => particle.remove());
      }
    });
  }
}

// Initialize movie player modal
function initMoviePlayerModal() {
  const playerModal = document.getElementById('movie-player-modal');
  const closeBtn = document.getElementById('movie-player-close');
  const providerSelect = document.getElementById('movie-provider-select');
  
  // Close player modal when close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMoviePlayer);
  }
  
  // Close player modal when clicking overlay
  if (playerModal) {
    playerModal.addEventListener('click', function(e) {
      if (e.target === playerModal || e.target.classList.contains('movie-player-overlay')) {
        closeMoviePlayer();
      }
    });
  }
  
  // Close player modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && playerModal && playerModal.classList.contains('active')) {
      closeMoviePlayer();
    }
  });
  
  // Handle provider selection change
  if (providerSelect) {
    providerSelect.addEventListener('change', function() {
      const movieId = this.getAttribute('data-movie-id');
      if (movieId && this.value !== 'coming-soon') {
        updateMoviePlayer(movieId, this.value);
      }
    });
  }
}

// Play movie function (as requested)
function playMovie(tmdbId) {
  const playerModal = document.getElementById('movie-player-modal');
  const providerSelect = document.getElementById('movie-provider-select');
  
  if (!playerModal) return;
  
  // Set movie ID for provider selection
  if (providerSelect) {
    providerSelect.setAttribute('data-movie-id', tmdbId);
  }
  
  // Get movie title from the clicked movie card
  const movieCard = document.querySelector(`[data-movie-id="${tmdbId}"]`);
  const movieTitle = movieCard ? movieCard.querySelector('.game-card-title').textContent : 'Movie';
  document.getElementById('movie-player-title').textContent = movieTitle;
  
  // Show player modal
  playerModal.classList.add('active');
  document.body.classList.add('movie-player-active');
  
  // Load movie with default provider (embed.su)
  updateMoviePlayer(tmdbId, 'embed.su');
}

// Open movie player (for watch now button)
function openMoviePlayer(movieId) {
  playMovie(movieId);
}

// Update movie player with selected provider
function updateMoviePlayer(movieId, provider) {
  const iframe = document.getElementById('movie-player-iframe');
  if (!iframe) return;
  
  let embedUrl = '';
  
  switch (provider) {
    case 'embed.su':
      embedUrl = `https://embed.su/embed/movie/${movieId}`;
      break;
    case '2embed':
      embedUrl = `https://www.2embed.cc/embed/${movieId}`;
      break;
    case 'vidsrc':
      embedUrl = `https://vidsrc.to/embed/movie/${movieId}`;
      break;
    default:
      embedUrl = 'about:blank';
  }
  
  iframe.src = embedUrl;
}

// Close movie player
function closeMoviePlayer() {
  const playerModal = document.getElementById('movie-player-modal');
  const iframe = document.getElementById('movie-player-iframe');
  
  if (playerModal) {
    playerModal.classList.remove('active');
  }
  
  document.body.classList.remove('movie-player-active');
  
  // Stop video by clearing iframe src
  if (iframe) {
    iframe.src = 'about:blank';
  }
}
