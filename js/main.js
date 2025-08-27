const backToTopBtn = document.getElementById('backToTop')
const bottomArrow = document.getElementById('bottomArrow')
const navbar = document.getElementById('navbar')
const themeToggleButton = document.getElementById('theme-toggle')
const themeIcon = document.getElementById('theme-icon')
const htmlElement = document.documentElement
const bodyElement = document.body

let currentTheme = 'dark' // Global variable to track theme state

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove('opacity-0', 'pointer-events-none')
  } else {
    backToTopBtn.classList.add('opacity-0', 'pointer-events-none')
  }
})

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    bottomArrow.classList.add('opacity-0')
  } else {
    bottomArrow.classList.remove('opacity-0')
  }
})

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Navbar Scroll Effect
function updateNavbarBackground() {
  if (window.scrollY > 100) {
    navbar.classList.add('md:backdrop-blur-md', 'md:p-12', 'md:rounded-3xl', 'md:transition-all', 'md:duration-500')
    navbar.classList.remove('md:bg-stone-900/70', 'md:bg-violet-100/70')

    if (currentTheme === 'dark') {
      navbar.classList.add('md:bg-stone-900/70')
    } else {
      navbar.classList.add('md:bg-violet-100/70')
    }
  } else {
    navbar.classList.remove('md:backdrop-blur-md', 'md:bg-stone-900/70', 'md:bg-violet-100/70', 'md:p-12', 'md:rounded-3xl')
  }
}

window.addEventListener('scroll', updateNavbarBackground)

function setTheme(theme) {
  currentTheme = theme // Update global theme state

  if (theme === 'dark') {
    htmlElement.classList.add('dark')
    bodyElement.classList.remove('animated-gradient-light')
    bodyElement.classList.add('animated-gradient')
    themeIcon.classList.remove('fa-moon', 'pl-2')
    themeIcon.classList.add('fa-sun', 'text-yellow-600', 'hover:text-yellow-500')
    themeIcon.classList.remove('text-gray-800')
  } else {
    htmlElement.classList.remove('dark')
    bodyElement.classList.remove('animated-gradient')
    bodyElement.classList.add('animated-gradient-light')
    themeIcon.classList.remove('fa-sun', 'text-yellow-600', 'hover:text-yellow-500')
    themeIcon.classList.add('fa-moon', 'text-gray-800', 'hover:text-gray-400', 'pl-2')
  }

  localStorage.setItem('theme', theme)
  updateNavbarBackground() // Update navbar immediately after theme switch
}

// Initialize theme on load
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
setTheme(savedTheme)

// Theme Toggle Button Click
themeToggleButton.addEventListener('click', () => {
  const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark'
  themeIcon.classList.add('rotate-180')
  setTheme(newTheme)
  setTimeout(() => {
    themeIcon.classList.remove('rotate-180')
  }, 500)
})

document.querySelectorAll('.project-card').forEach(card => {
  const previewPopUp = card.querySelector('.preview-popup')

  // Show popup when hovering card
  card.addEventListener('mouseenter', () => {
    previewPopUp.classList.remove('pointer-events-none', 'opacity-0', 'scale-95')
    previewPopUp.classList.add('opacity-100', 'scale-100')
  })

  // Hide popup when leaving both card AND popup
  let timeout
  const hidePopup = () => {
    timeout = setTimeout(() => {
      previewPopUp.classList.add('pointer-events-none', 'opacity-0', 'scale-95')
      previewPopUp.classList.remove('opacity-100', 'scale-100')
    }, 100) // Small delay to allow cursor movement
  }

  card.addEventListener('mouseleave', hidePopup)
  previewPopUp.addEventListener('mouseleave', hidePopup)

  // Cancel hide if we enter the popup
  previewPopUp.addEventListener('mouseenter', () => {
    clearTimeout(timeout)
  })
})

document.querySelectorAll(".project-card").forEach(card => {
  const popup = card.querySelector(".preview-popup")

  card.addEventListener("mouseenter", () => {
    if (!popup) return // skip if no popup

    const rect = card.getBoundingClientRect()
    const popupHeight = popup.offsetHeight || 300 // fallback if hidden
    const spaceAbove = rect.top
    const spaceBelow = window.innerHeight - rect.bottom

    if (spaceBelow >= popupHeight) {
      // Enough space below -> show below
      popup.classList.remove("bottom-full", "mb-4")
      popup.classList.add("top-full", "mt-4")
    } else if (spaceAbove >= popupHeight) {
      // Enough space above -> show above
      popup.classList.remove("top-full", "mt-4")
      popup.classList.add("bottom-full", "mb-4")
    } else {
      // Not enough space either way -> pick side with more space
      if (spaceBelow >= spaceAbove) {
        popup.classList.remove("bottom-full", "mb-4")
        popup.classList.add("top-full", "mt-4")
      } else {
        popup.classList.remove("top-full", "mt-4")
        popup.classList.add("bottom-full", "mb-4")
      }
    }
  })
})

function openLightbox(src) {
  document.getElementById("lightbox-img").src = src
  document.getElementById("lightbox").classList.remove("hidden")
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden")
}

// Carousel functionality
function initCarousel() {
  const track = document.getElementById('carousel-track')
  const slides = Array.from(document.querySelectorAll('.carousel-slide'))
  const prevBtn = document.getElementById('carousel-prev')
  const nextBtn = document.getElementById('carousel-next')
  const dots = Array.from(document.querySelectorAll('.dot-indicator'))

  let currentIndex = 0

  // Calculate the width of a single slide based on its class
  function getSlideWidth() {
    const slide = document.querySelector('.carousel-slide')
    return slide.offsetWidth
  }

  // Update carousel position
  function updateCarousel() {
    const slideWidth = getSlideWidth()
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`
    updateDots()
  }

  // Move to specific slide
  function moveToSlide(index) {
    // Ensure index stays within bounds
    if (index < 0) {
      currentIndex = slides.length - 1
    } else if (index >= slides.length) {
      currentIndex = 0
    } else {
      currentIndex = index
    }
    updateCarousel()
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('bg-violet-500', 'dark:bg-violet-500', 'md:w-6', 'w-4')
        dot.classList.remove('bg-violet-400/50', 'dark:bg-violet-600/50', 'md:w-3', 'w-2')
      } else {
        dot.classList.remove('bg-violet-500', 'dark:bg-violet-500', 'md:w-6', 'w-4')
        dot.classList.add('bg-violet-400/50', 'dark:bg-violet-600/50', 'md:w-3', 'w-2')
      }
    })
  }

  // Next slide
  function nextSlide() {
    moveToSlide(currentIndex + 1)
  }

  // Previous slide
  function prevSlide() {
    moveToSlide(currentIndex - 1)
  }

  nextBtn.addEventListener('click', nextSlide)
  prevBtn.addEventListener('click', prevSlide)

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      moveToSlide(parseInt(dot.dataset.slide, 10))
    })
  })


  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide()
    } else if (e.key === 'ArrowLeft') {
      prevSlide()
    }
  })

  // Handle swipe on touch devices
  let touchStartX = 0
  let touchEndX = 0

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX
  }, { passive: true })

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  }, { passive: true })

  function handleSwipe() {
    const threshold = 50 // Minimum swipe distance
    if (touchEndX < touchStartX - threshold) {
      nextSlide() // Swipe left
    } else if (touchEndX > touchStartX + threshold) {
      prevSlide() // Swipe right
    }
  }

  // Initialize carousel
  updateCarousel()

  // Make responsive by recalculating on resize
  window.addEventListener('resize', () => {
    updateCarousel()
  })
}

function typeWriter() {
  const texts = [
    {
      element: document.getElementById('typewriter-hello'),
      text: 'Hello',
      colorSpan: '<span class="text-violet-700"> .</span>',
      delay: 500 // Start immediately
    },
    {
      element: document.getElementById('typewriter-name'),
      text: "I'm Bara'",
      delay: 2000 // Start after hello is done
    },
    {
      element: document.getElementById('typewriter-title'),
      text: 'Software Engineer ',
      delay: 4000 // Start after name is done
    }
  ]

  function typeText(textObj, index = 0) {
    const { element, text, colorSpan, delay } = textObj
    const textSpan = element.querySelector('.typewriter-text')
    const cursor = element.querySelector('.typewriter-cursor')

    if (index === 0) {
      // Show the element and start typing
      element.style.opacity = '1'
    }

    if (index < text.length) {
      textSpan.innerHTML = text.slice(0, index + 1)
      setTimeout(() => typeText(textObj, index + 1), 100) // Typing speed
    } else {
      // Add color span if it exists (for the dot in "Hello.")
      if (colorSpan) {
        textSpan.innerHTML = text + colorSpan
      }

      // Trigger line animation when "I'm Bara'" finishes
      if (textObj.text === "I'm Bara'") {
        setTimeout(() => {
          const animatedLine = document.getElementById('animated-line')
          animatedLine.classList.remove('w-0', 'ml-5')
          animatedLine.classList.add('w-65')
        }, 300) // Small delay before line animation starts
      }

      // For the last text ("Software Engineer"), keep cursor visible and blinking
      if (textObj === texts[texts.length - 1]) {
        cursor.classList.add('animate-blink')
      } else {
        // Hide cursor for other texts after a brief pause
        setTimeout(() => {
          cursor.classList.add('hidden')
        }, 500)
      }
    }
  }

  // Start each typewriter sequence with delays
  texts.forEach((textObj, i) => {
    setTimeout(() => {
      typeText(textObj)
    }, textObj.delay)
  })
}

// Chat Widget Functionality
class ChatWidget {
  constructor() {
    this.chatToggle = document.getElementById('chat-toggle')
    this.chatContainer = document.getElementById('chat-container')
    this.closeChat = document.getElementById('close-chat')
    this.chatInput = document.getElementById('chat-input')
    this.sendBtn = document.getElementById('send-btn')
    this.chatMessages = document.getElementById('chat-messages')
    this.notificationIndicator = document.getElementById("notification-indicator")
    this.notificationPopUp = document.getElementById("notification-pop-up")
    this.isOpen = false
    this.isLoading = false

    this.init()
  }

  init() {
    // Notification Pop-Up
    this.chatToggle.addEventListener('mouseenter', () => {
      this.showPopUp()
    })

    this.chatToggle.addEventListener('mouseleave', () => {
      this.hidePopUp()
    })

    // Toggle chat widget
    this.chatToggle.addEventListener('click', () => {
      this.toggleChat()
    })

    // Close chat
    this.closeChat.addEventListener('click', () => {
      this.closeWidget()
    })

    // Send message on button click
    this.sendBtn.addEventListener('click', () => {
      this.sendMessage()
    })

    // Send message on Enter key
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        this.sendMessage()
      }
    })

    //Interval for Notification Pop Up every 10s
    this.notificationPopUpInterval = setInterval(() => {
      if (!this.isOpen) {
        this.showPopUp()
        setTimeout(() => {
          this.hidePopUp()
        }, 3000)
      }
    }, 10000)


    // Add welcome message
    this.addMessage('Hello! I\'m Bara\' ☺️ Feel free to ask me anything about my background, skills, projects, or experience! 👋', 'bot')
  }

  showPopUp() {
    if (this.isOpen === false) {
      this.notificationPopUp.classList.remove('opacity-0')
    }
  }

  hidePopUp() {
    this.notificationPopUp.classList.add('opacity-0')
  }

  toggleChat() {
    this.isOpen = !this.isOpen
    if (this.isOpen) {
      this.chatContainer.classList.remove('hidden')
      this.notificationIndicator.classList.add('hidden')
      this.notificationPopUp.classList.add('opacity-0')
      this.chatInput.focus()
    } else {
      this.chatContainer.classList.add('hidden')
      this.notificationIndicator.classList.remove('hidden')
      this.notificationPopUp.classList.remove('opacity-0')
    }
  }

  closeWidget() {
    this.isOpen = false
    this.chatContainer.classList.add('hidden')
    this.notificationIndicator.classList.remove('hidden')
  }

  async sendMessage() {
    const message = this.chatInput.value.trim()

    // Validate message length
    if (message.length > 500) {
      this.addMessage('Message is too long. Please limit to 500 characters.', 'bot', true)
      return
    }
    
    if (!message || this.isLoading) return

    // Add user message to chat
    this.addMessage(message, 'user')
    this.chatInput.value = ''

    // Show loading state
    this.setLoading(true)

    try {
      // Send message to backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      })

      const data = await response.json()

      if (data.success) {
        this.addMessage(data.response, 'bot')
      } else {
        this.addMessage(data.error || 'Sorry, I encountered an error. Please try again.', 'bot', true)
      }
    } catch (error) {
      console.error('Chat error:', error)
      this.addMessage('Sorry, I\'m having trouble connecting. Please check your internet connection and try again.', 'bot', true)
    } finally {
      this.setLoading(false)
    }
  }

  addMessage(text, sender, isError = false) {
    const messageDiv = document.createElement('div')
    messageDiv.className = `mb-4 ${sender === 'user' ? 'text-right' : 'text-left'}`

    const messageContent = document.createElement('div')
    messageContent.className = `inline-block max-w-xs rounded-lg px-3 py-2 text-sm ${sender === 'user'
      ? 'bg-violet-500 text-white'
      : isError
        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 shadow-lg'
        : 'bg-gray-100 text-gray-800 dark:bg-stone-700 dark:text-stone-200 shadow-lg'
      }`

    // Parse Markdown and sanitize HTML
    const rawHtml = marked.parse(text);
    messageContent.innerHTML = DOMPurify.sanitize(rawHtml);

    messageDiv.appendChild(messageContent);

    // Add timestamp
    const timestamp = document.createElement('div')
    timestamp.className = `mt-1 text-xs ${sender === 'user' ? 'text-right' : 'text-left'
      } text-gray-500 dark:text-stone-400`
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    messageDiv.appendChild(timestamp)

    this.chatMessages.appendChild(messageDiv)
    this.scrollToBottom()
  }

  setLoading(loading) {
    this.isLoading = loading
    this.sendBtn.disabled = loading

    if (loading) {
      // Add typing indicator
      const typingDiv = document.createElement('div')
      typingDiv.id = 'typing-indicator'
      typingDiv.className = 'mb-4 text-left'
      typingDiv.innerHTML = `
        <div class="inline-block max-w-xs rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-stone-700">
          <div class="flex space-x-1">
            <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-stone-400" style="animation-delay: 0ms"></div>
            <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-stone-400" style="animation-delay: 150ms"></div>
            <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-stone-400" style="animation-delay: 300ms"></div>
          </div>
        </div>
      `
      this.chatMessages.appendChild(typingDiv)
      this.scrollToBottom()
    } else {
      // Remove typing indicator
      const typingIndicator = document.getElementById('typing-indicator')
      if (typingIndicator) {
        typingIndicator.remove()
      }
    }
  }

  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight
  }
}

// Initialize chat widget
let chatWidget

document.addEventListener('DOMContentLoaded', () => {
  initCarousel()
  typeWriter()
  chatWidget = new ChatWidget()
})