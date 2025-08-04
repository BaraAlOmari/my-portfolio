const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('backdrop-blur-md', 'bg-stone-900/70', 'p-12', 'rounded-3xl', 'transition-all', 'duration-500');
    } else {
        navbar.classList.remove('backdrop-blur-md', 'bg-stone-900/70', 'p-12', 'rounded-3xl');
    }
});