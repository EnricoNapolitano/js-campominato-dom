/*
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco.
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti
(ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio,
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.

MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
*/

//* FUNCTIONS
const cellGenerator = (number) => {
    const cell = document.createElement('div');
    cell.append(number);
    cell.classList.add('cell');
    return cell;
}

const userScore = () => {
    return score++;
}

const getRandomNumber = (min, max, notValidNumber) => {
    do {
        randomNumber += Math.floor(Math.random()*(max + 1 - min)) + min;
    } while (notValidNumber.includes(randomNumber))
    return randomNumber;
}


//* DOM'S ELEMENTS
const gridElement = document.getElementById('grid');
const playButtonElement = document.getElementById('play-button');
const h2Element = document.querySelector('h2');

// const max = 100;
// const min = 1;
let score = 0; // variable to count user score
let isClicked = true;
let randomNumber = ''; 
const extractedNumber = [];


//* PLAY BUTTON EVENT
playButtonElement.addEventListener('click', function(){
    
    const removeCTA = h2Element.classList.add('d-none'); // remove Call To Action

    gridElement.innerHTML = ''; // needed to remove colored cells by pressing button again

    for (let i=1; i <= 100; i++){

        const cell = cellGenerator(i); // create the cells

        cell.addEventListener('click', function(){ // coloring cells by click
            cell.classList.add('clicked');
            const message = `hai cliccato la casella n° ${i}`
            console.log(message);
            
            userScore(); // incremental function
            console.log(score);
        })
        
        gridElement.appendChild(cell); // rendering cells on page

    }

    for (let i = 0; i < 16; i++){
        getRandomNumber(1,100,extractedNumber);
    }
    console.log(randomNumber);
})




