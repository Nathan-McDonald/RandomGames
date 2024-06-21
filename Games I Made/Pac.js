document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const width = 20; // Width of the grid
    let currentPosition = 22; // Initial position of Pac-Man
    const totalDots = 150; // Number of dots to be placed
    let currentLevel = 1; // Track the current level
    let score = 0;

    // Maze layout as a 1D array representing the grid
    // 0: empty, 1: block
    const layout1 = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1,
        1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
        0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1,
        1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
        1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,
        1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    const layout2 = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

    let layout = layout1; // Start with level 1

      // Function to switch between levels
      function switchLevel() {
        if (currentLevel === 1 && score >= 100) {
            currentLevel = 2;
            layout = layout2;
            currentPosition = 22; // Reset Pac-Man's position for level 2
            grid.classList.add('layout2'); // Apply layout2 styles to the grid
            startGame();
        }
        // Add more levels as needed
    }

    // Create the game board
    function createBoard() {
        grid.innerHTML = ''; // Clear the grid

        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');
            if (layout[i] === 1) {
                square.classList.add('square', 'block');
            } else {
                square.classList.add('square');
            }
            grid.appendChild(square);
        }

        squares = Array.from(document.querySelectorAll('.square'));
    }

    // Draw Pac-Man
    function drawPacman() {
        squares[currentPosition].classList.add('pacman');
    }

    // Remove Pac-Man
    function undrawPacman() {
        squares[currentPosition].classList.remove('pacman');
    }

    // Move Pac-Man
    function movePacman(e) {
        undrawPacman();

        let newPosition = currentPosition; // Temporary variable to hold new position

      
    switch (e.key) {
        case 'ArrowUp':
            newPosition = currentPosition - width;
            break;
        case 'ArrowDown':
            newPosition = currentPosition + width;
            break;
        case 'ArrowLeft':
            newPosition = currentPosition - 1;
            if (currentPosition % width === 0) { // Pac-Man moves off the left edge
                newPosition = currentPosition + (width - 1);
            }
            break;
        case 'ArrowRight':
            newPosition = currentPosition + 1;
            if (newPosition % width === 0) { // Pac-Man moves off the right edge
                newPosition = currentPosition - (width - 1);
            }
            break;
    }

    // Check if newPosition is within bounds and not hitting a block
    if (newPosition >= 0 && newPosition < width * width && !squares[newPosition].classList.contains('block')) {
        currentPosition = newPosition;
    }


        drawPacman();
        eatDot();
        switchLevel(); // Check for level switch after each move
    }

    // Function to place dots randomly
    function placeDots() {
        // Clear any existing dots
        squares.forEach(square => square.classList.remove('dot'));

        // Randomly place new dots
        for (let i = 0; i < totalDots; i++) {
            let randomPosition;
            do {
                randomPosition = Math.floor(Math.random() * width * width);
            } while (squares[randomPosition].classList.contains('dot') || randomPosition === currentPosition || squares[randomPosition].classList.contains('block'));

            squares[randomPosition].classList.add('dot');
        }
    }

    // Function to handle eating dots
    function eatDot() {
        if (squares[currentPosition].classList.contains('dot')) {
            squares[currentPosition].classList.remove('dot');
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }

    document.addEventListener('keydown', movePacman);

    // Start the game
    function startGame() {
        createBoard();
        drawPacman();
        placeDots();
    }

    startGame();
});
