const backToTopBtn = document.getElementById('backToTop')
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
        themeIcon.classList.add('fa-moon', 'text-gray-800', 'hover:text-gray-400')
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