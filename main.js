document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContainer = document.getElementById('main-container');

    const transitionOverlay = document.getElementById('transition-overlay');

    setTimeout(() => {
        if (transitionOverlay) {
            transitionOverlay.classList.add('visible');
        }
        setTimeout(() => {
            if (splashScreen) {
                splashScreen.style.display = 'none';
            }
            if (mainContainer) {
                mainContainer.classList.remove('hidden');
            }
        }, 500); // Coincide con la duración de la transición en CSS
    }, 9200); // 5.5 segundos

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        if(darkModeToggle) darkModeToggle.checked = true;
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        if(darkModeToggle) darkModeToggle.checked = false;
    };

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    if(darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }

    // Cursor change on click
    document.body.addEventListener('mousedown', () => {
        console.log('Mouse down: Changing cursor to puntero.png');
        document.body.style.cursor = "url('../img/puntero.png'), auto";
    });

    document.body.addEventListener('mouseup', () => {
        console.log('Mouse up: Changing cursor to puntero1.png');
        document.body.style.cursor = "url('../img/puntero1.png'), auto";
    });
});