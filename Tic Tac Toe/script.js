const gridContainer = document.querySelector(".grid-container");
const currentText = document.querySelector(".gameText");
const resetButton = document.querySelector(".resetGame");
const winningSequences = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

let currentMove = 0;
const xSymbolFile = "./images/xSymbol.png";
const zeroSymbolFile = "./images/zeroSymbol.png";

function resetGame(){
    for(let i = 1; i <= 9; i++){
        const button = document.getElementById(`button${i}`);
        button.setAttribute("class", "empty");
        button.style.backgroundImage = "";
        currentMove = 0;
        currentText.textContent = "X to move";
    }
    gridContainer.style.pointerEvents = "auto";
}

function gameHasEnded(){
    let found = false;
    let winner = 0;
    let canBeDraw = true;
    for(sequence of winningSequences){
        let isWinning = true;
        const buttons = [];
        for(number of sequence){
            buttons.push(document.getElementById(`button${number}`));
        }
        const buttonsClasses = [];
        for(button of buttons){
            buttonsClasses.push(button.getAttribute("class"));
        }
        if(buttonsClasses.indexOf("empty")!=-1)
            canBeDraw = false;
        // Checks if all buttons in the winning sequence have been chosen by the same player
        for(let i = 1; i < buttonsClasses.length; i++){
            if((buttonsClasses[i] != buttonsClasses[i-1]) || buttonsClasses[i] == "empty"){
                isWinning = false;
                break;
            }
        }
        if(isWinning){
            found = true;
            if(buttonsClasses[0] == "x")
                winner = 0;
            else winner = 1;
            break;
        }
    }
    if(found)
        return winner;
    else if(canBeDraw)
        return 2;
    else 
    return -1;
}

function makeMove(button){
    // Displays whose turn it is
    const imageFile = (currentMove == 0) ? xSymbolFile:zeroSymbolFile;
    // Apply the correct image to the button
    button.style.backgroundImage = `url(${imageFile})`;
    button.style.backgroundSize = "100% 100%";
    button.setAttribute("class", (currentMove == 0) ? "x":"zero")
    // Check if the game has ended
    let gameStatus = gameHasEnded();
    if(gameStatus == 2){
        currentText.textContent = `Game has ended, draw!`;
        gridContainer.style.pointerEvents = "none";
    }
    else if(gameStatus!=-1){
        currentText.textContent = `Game has ended, ${(gameStatus == 0) ? "X" : "0"} won!`;
        gridContainer.style.pointerEvents = "none";
    } else{
    // Go to the next move
    currentMove ^= 1;
    currentText.textContent = `${(currentMove == 0) ? "X":"0"} to move`;
    }
}

// Creates all the buttons in the grid
for(let i = 1; i <= 9; i++){
    const btn = document.createElement("button");
    btn.setAttribute("id", `button${i}`);
    btn.setAttribute("class", "empty");
    btn.addEventListener("click", () => {makeMove(btn)});
    gridContainer.appendChild(btn);
}

// Reset the game when the reset button is pressed
resetButton.addEventListener("click", resetGame);