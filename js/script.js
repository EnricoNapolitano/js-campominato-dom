//* FUNCTIONS
const cellGenerator = (number) => {
    const cell = document.createElement('div');
    cell.append(number);
    cell.classList.add('cell');
    return cell;
}
  
const getRandomNumber = (min, max, notValidNumber) => {
    do {
      randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min;
    } while (notValidNumber.includes(randomNumber));
    return randomNumber;
}
  
const generateBombsArray = () => {
    const bombsArray = [];
    for (let i = 0; i < 16; i++) {
      const random = getRandomNumber(1, 100, bombsArray);
      bombsArray.push(random);
    }
    return bombsArray;
}
  
//* MAIN FUNCTION
const startGame = () => {
    // difficulty level: getting level element and setting cols & rows
    const level = levelElement.value;
    let cols = 10;
    let rows = 10;
    switch(level){
        case 'medium':
            cols = rows = 9;
            break;
        case 'hard':
            cols = rows = 7;
    }
    // Setting custom property correct value
    const rootElement = document.querySelector(':root');
    rootElement.style.setProperty('--cells-x-row', cols);
    const totalCells = cols * rows;
    console.log(totalCells);

    score = 0; // starting score each time is clicked on play
    targetElement.innerHTML = ''; // needed to remove message by clicking play again
    gridElement.innerHTML = ''; // needed to remove colored cells by pressing button again
    const bombsArray = generateBombsArray();
    console.log(bombsArray); // console log to see where the bombs are
    let gameOver = false; // flag needed to stop the game when it's the case
    for (let i = 1; i <= totalCells; i++) {
      const cell = cellGenerator(i);
      cell.addEventListener('click', function () {
        if (gameOver) {
          return;
        }
        if (cell.classList.contains('clicked')) {
          return; // if cell contains class 'clicked' function stops so there won't be incremental score
        }
        if (bombsArray.includes(parseInt(cell.textContent))) {
            cell.classList.add('bomb');
            message = `hai preso una bomba, hai perso :( <br> hai totalizzato ${score} punti`;
            gameOver = true;
        } else {
            cell.classList.add('clicked');
            score++;
            message = `hai guadagnato ${score} punti!`;
            if (cols = 10 && score === 84) {
                message = `complimenti hai vinto :) <br> hai totalizzato tutti i punti a disposizione: ${score} punti!`;
                gameOver = true;
            } else if (cols = 9 && score === 65) {
                message = `complimenti hai vinto :) <br> hai totalizzato tutti i punti a disposizione: ${score} punti!`;
                gameOver = true;
            } else if (cols = 7 && score === 33){
                message = `complimenti hai vinto :) <br> hai totalizzato tutti i punti a disposizione: ${score} punti!`;
                gameOver = true;
          }
        }
        targetElement.innerHTML = message;
      });
      gridElement.appendChild(cell); // rendering cells on page
    }
}
  
//* DOM'S ELEMENTS
const gridElement = document.getElementById('grid');
const playButtonElement = document.getElementById('play-button');
const h2Element = document.querySelector('h2');
const targetElement = document.getElementById('target');
const levelElement = document.getElementById('level');
  
//* OTHERS KIND OF VARIABLES
let score = 0;
let message;
  
//* PLAY BUTTON EVENT
playButtonElement.addEventListener('click', function () {
    h2Element.classList.add('d-none'); // remove Call To Action
    playButtonElement.innerText = 'Play Again';
    startGame();
});