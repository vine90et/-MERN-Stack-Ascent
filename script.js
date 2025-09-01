const body = document.querySelector('body');
const button = document.querySelector('.button');

button.addEventListener('click', ()=>{
    body.classList.toggle("dark");
    const isDark = body.classList.contains('dark');
    button.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    button.style.invert = "100%"
})
