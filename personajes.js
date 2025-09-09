document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('characters-gallery');

    // Dark Mode Toggle Logic
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }

    // Toggle dark mode on switch change
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Prevenimos la ejecución en páginas que no tienen el contenedor de la galería
    if (!gallery) {
        return;
    }

    const API_URL = 'https://rickandmortyapi.com/api/character';

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue satisfactoria');
            }
            return response.json();
        })
        .then(data => {
            const characters = data.results;
            gallery.innerHTML = ''; // Limpiar el contenedor por si acaso

            characters.forEach(character => {
                const card = document.createElement('div');
                card.classList.add('character-card');

                // Añadir clase según el estado del personaje
                if (character.status === 'Alive') {
                    card.classList.add('status-alive');
                } else if (character.status === 'Dead') {
                    card.classList.add('status-dead');
                } else {
                    card.classList.add('status-unknown');
                }

                card.innerHTML = `
                    <img src="${character.image}" alt="Imagen de ${character.name}">
                    <div class="card-info">
                        <h2>${character.name}</h2>
                        <p><strong>Estado:</strong> ${character.status}</p>
                        <p><strong>Especie:</strong> ${character.species}</p>
                    </div>
                `;
                gallery.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al obtener los personajes:', error);
            gallery.innerHTML = '<p style="text-align: center; color: red;">No se pudieron cargar los personajes. Inténtalo de nuevo más tarde.</p>';
        });
});