 js/script.js
 document.addEventListener('DOMContentLoaded', function() {
    // Carregar Pokémons em Destaque
    const featuredPokemon = [
        {
            id: 25,
            name: "Pikachu",
            types: ["Elétrico"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        },
        {
            id: 6,
            name: "Charizard",
            types: ["Fogo", "Voador"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
        },
        {
            id: 1,
            name: "Bulbasaur",
            types: ["Grama", "Venenoso"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        },
        {
            id: 7,
            name: "Squirtle",
            types: ["Água"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
        },
        {
            id: 150,
            name: "Mewtwo",
            types: ["Psíquico"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
        },
        {
            id: 94,
            name: "Gengar",
            types: ["Fantasma", "Venenoso"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
        }
    ];

    const pokemonGrid = document.querySelector('.pokemon-grid');
    
    featuredPokemon.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.tabIndex = 0;
        pokemonCard.setAttribute('role', 'article');
        pokemonCard.setAttribute('aria-label', `${pokemon.name} - Tipo ${pokemon.types.join(' e ')}`);
        
        pokemonCard.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name} - Pokémon do tipo ${pokemon.types.join(' e ')}">
            <div class="info">
                <h3>${pokemon.name}</h3>
                <p>Tipo: ${pokemon.types.join(', ')}</p>
                <p>Nº: ${pokemon.id.toString().padStart(3, '0')}</p>
            </div>
        `;
        
        pokemonGrid.appendChild(pokemonCard);
    });

    // Funções de Acessibilidade
    // Alto contraste
    const contrasteBtn = document.getElementById('contrast-btn');
    contrasteBtn.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    });
    
    // Modo escuro
    const darkBtn = document.getElementById('dark-btn');
    darkBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Tamanho da fonte
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    
    fontIncrease.addEventListener('click', function() {
        changeFontSize(1);
    });
    
    fontDecrease.addEventListener('click', function() {
        changeFontSize(-1);
    });
    
    function changeFontSize(direction) {
        const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
        const newSize = currentSize + (direction * 2);
        document.body.style.fontSize = newSize + 'px';
        localStorage.setItem('fontSize', newSize);
    }
    
    // Leitor de página
    const readPageBtn = document.getElementById('read-page');
    readPageBtn.addEventListener('click', function() {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = document.querySelector('main').textContent;
            speech.lang = 'pt-BR';
            speech.rate = 1;
            speech.pitch = 1;
            window.speechSynthesis.speak(speech);
        } else {
            alert('Seu navegador não suporta leitura de texto. Tente usar Chrome ou Edge.');
        }
    });
    
    // Verificar preferências salvas
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    if (localStorage.getItem('fontSize')) {
        document.body.style.fontSize = localStorage.getItem('fontSize') + 'px';
    }
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Focar no conteúdo principal após pular navegação
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main-content');
    
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
    });
});