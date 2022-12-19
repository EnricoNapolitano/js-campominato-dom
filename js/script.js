//* FUNCTIONS
const cellGenerator = (number) => {
    const cell = document.createElement('div');
    cell.append(number);
    cell.classList.add('cell');
    return cell;
}
const userScore = () => score++;
const getRandomNumber = (min, max, notValidNumber) => {
    do {
        randomNumber = Math.floor(Math.random()*(max + 1 - min)) + min;
    } while (notValidNumber.includes(randomNumber))
    return randomNumber;
}



//* DOM'S ELEMENTS
const gridElement = document.getElementById('grid');
const playButtonElement = document.getElementById('play-button');
const h2Element = document.querySelector('h2');
const targetElement = document.getElementById('target');
//* OTHERS KIND OF VARIABLES
let score = 0; // variable to count user score
let message;



//* PLAY BUTTON EVENT
playButtonElement.addEventListener('click', function(){

    const removeCTA = h2Element.classList.add('d-none'); // remove Call To Action
    score = 0; // starting point each time is clicked on play
    targetElement.innerHTML = ''; // needed to remove message by clicking play again
    gridElement.innerHTML = ''; // needed to remove colored cells by pressing button again
    const bombsArray = []; //as name said: vecotr with bombs position

    //* 'BOMBS' GENERATOR
    for (let i = 0; i < 16; i++){
        const random = getRandomNumber(1,100,bombsArray);
        bombsArray.push(random);
    }
    console.log(bombsArray); // console log to see where the bombs are


    //* GRID'S CELLS
    let gameOver = false; // flag needed to stop the game
    for (let i=1; i <= 100; i++){

        const cell = cellGenerator(i); // create the cells

        cell.addEventListener('click', function(){ // coloring cells by click
            if (gameOver) {
                return;
            }

            if (cell.classList.contains('clicked')) {
                return; // if cell contains class 'clicked' function gets stopped so there won't be incremental score
            }
            
            if (bombsArray.includes(parseInt(cell.textContent))) {
                cell.classList.add('bomb');
                message = `hai preso una bomba, hai perso :( <br> hai totalizzato ${score} punti`;
                targetElement.innerText = message;
                gameOver = true;
              } else {
                cell.classList.add('clicked');
                userScore(); // incremental function
                message = `hai guadagnato ${score} punti!`
                    if (score === 84) {
                        message = `complimenti hai vinto, hai totalizzato tutti gli ${score} punti a disposizione!`
                        targetElement.innerHTML = message;
                        gameOver = true;
                    }
            }
            targetElement.innerHTML = message;
        })
        
        gridElement.appendChild(cell); // rendering cells on page
    }
})




