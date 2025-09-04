// Midnight - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initThemeSystem();
  initSidebar();
  initSnowEffect();
  
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
  document.body.classList.remove('theme-pink', 'theme-blue', 'theme-green', 'theme-tan');
  
  // Add selected theme class if not default
  if (theme !== 'default') {
    document.body.classList.add(`theme-${theme}`);
  }
  
  // Save to localStorage
  localStorage.setItem('midnight-theme', theme);
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
}

// Initialize snow effect
function initSnowEffect() {
  const snowflakesCount = 50; // Number of snowflakes
  const container = document.body;
  
  // Create snowflakes
  for (let i = 0; i < snowflakesCount; i++) {
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

// Initialize clock with flip animation
function initClock() {
  const clockElement = document.querySelector('.clock');
  if (!clockElement) return;
  
  // Initial clock setup
  updateClock();
  
  // Update clock every second
  setInterval(updateClock, 1000);
  
  // Update date
  const dateElement = document.querySelector('.date');
  if (dateElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString(undefined, options);
  }
}

// Update clock display with flip animation
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const timeString = `${hours}:${minutes}:${seconds}`;
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
  
  // Sample games data
  const games = [
    {
      title: 'cosmic adventure',
      description: 'explore the universe in this exciting space adventure game.',
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'pixel warriors',
      description: 'battle in retro-style arenas with unique pixel characters.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'speed racer',
      description: 'race against time in this high-speed driving simulator.',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'puzzle master',
      description: 'test your brain with challenging puzzles and riddles.',
      image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'zombie survival',
      description: 'survive the apocalypse in this thrilling action game.',
      image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'treasure hunter',
      description: 'find hidden treasures in ancient temples and ruins.',
      image: 'https://images.unsplash.com/photo-1523867574998-1a336b6ded04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
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
        <button class="game-card-button">play</button>
      </div>
    `;
    
    gamesContainer.appendChild(gameElement);
  });
}

// Initialize search functionality
function initSearchFunctionality(searchSelector, itemSelector) {
  const searchInput = document.querySelector(searchSelector);
  if (!searchInput) return;
  
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
  loadMovies();
  initSearchFunctionality('.movies-search', '.movie-card');
}

// Load movies data
function loadMovies() {
  const moviesContainer = document.querySelector('.movies-grid');
  if (!moviesContainer) return;
  
  // Sample movies data
  const movies = [
    {
      title: 'space odyssey',
      description: 'a journey through the cosmos and beyond.',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'midnight chase',
      description: 'a thrilling action movie with unexpected twists.',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'lost in time',
      description: 'a time travel adventure that will keep you on the edge of your seat.',
      image: 'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'the last frontier',
      description: 'explore the unknown in this sci-fi epic.',
      image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  // Clear container
  moviesContainer.innerHTML = '';
  
  // Add movies to container
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('card', 'movie-card');
    movieElement.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" class="movie-card-image">
      <div class="game-card-content">
        <h3 class="game-card-title">${movie.title}</h3>
        <p class="game-card-description">${movie.description}</p>
        <button class="game-card-button">watch</button>
      </div>
    `;
    
    moviesContainer.appendChild(movieElement);
  });
}

// Music page initialization
function initMusicPage() {
  loadMusic();
  initSearchFunctionality('.music-search', '.music-card');
}

// Load music data
function loadMusic() {
  const musicContainer = document.querySelector('.music-grid');
  if (!musicContainer) return;
  
  // Sample music data
  const music = [
    {
      title: 'electronic dreams',
      artist: 'synthwave collective',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'midnight vibes',
      artist: 'chill beats',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'urban rhythm',
      artist: 'city sounds',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'acoustic journey',
      artist: 'string quartet',
      image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  // Clear container
  musicContainer.innerHTML = '';
  
  // Add music to container
  music.forEach(track => {
    const musicElement = document.createElement('div');
    musicElement.classList.add('card', 'music-card');
    musicElement.innerHTML = `
      <img src="${track.image}" alt="${track.title}" class="music-card-image">
      <div class="game-card-content">
        <h3 class="game-card-title">${track.title}</h3>
        <p class="game-card-description">${track.artist}</p>
        <button class="game-card-button">play</button>
      </div>
    `;
    
    musicContainer.appendChild(musicElement);
  });
}

// AI page initialization
function initAIPage() {
  const aiInput = document.querySelector('.ai-input');
  const aiSend = document.querySelector('.ai-send');
  const aiMessages = document.querySelector('.ai-messages');
  
  if (!aiInput || !aiSend || !aiMessages) return;
  
  // Add welcome message
  addAIMessage('hello! i\'m your midnight assistant. how can i help you today?');
  
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
  function sendMessage() {
    const message = aiInput.value.trim();
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    aiInput.value = '';
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const responses = [
        'i\'m here to help you navigate midnight. what would you like to know?',
        'that\'s an interesting question! let me think about that.',
        'you can explore games, movies, and more using the sidebar navigation.',
        'try checking out the featured games on the homepage!',
        'is there anything specific you\'d like to know about midnight?'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addAIMessage(randomResponse);
    }, 1000);
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
}
