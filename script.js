
const playerFactory = (player, marker) => {
    return {player, marker};
}

const playerOne = playerFactory("player One", "X");
const playerTwo = playerFactory("player Two", "O");


const gameBoardObject = (() => {
    let gameBoard = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];

   return {
    gameBoard
   };

})();


const gameLogic = (() => {
    
   let winCons = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [2,4,6],
    [0,4,8],

   ];

   let xArray = [];
   let oArray = [];

   return {
    winCons,
    xArray,
    oArray,
   };

})();


const gameBoardDisplay = (() => {

    const divContainer = document.querySelector(".div-container");

    playerTurn = 0;

    for (let i = 0; i < (gameBoardObject.gameBoard).length; i++) {
        const tile = document.createElement("div");
        tile.id = `_${i}`;
        tile.classList = "tiles";
        divContainer.appendChild(tile);
        index = i;
        tile.addEventListener("click", (e) => {
            index = i;
            playerTurn++;
            checkConditions(e, index);

        });
    }

    return {
        playerTurn
    }

})();


function winnerCheck() {

    let result = false;

    for (let i = 0; i < gameLogic.winCons.length; i++) {
        if (gameLogic.winCons[i].every(x => gameLogic.xArray.includes(x))) {
            result = true;
            setTimeout(xWinFunc, 200);
            break;
        } else if (gameLogic.winCons[i].every(o => gameLogic.oArray.includes(o))) {
            result = true;
            setTimeout(oWinFunc, 200);
            break;
        }
    }

    return result

}

function checkForTie() {
    if (gameLogic.xArray.length === 5 && winnerCheck() === false) {
        tieFunc();
    }
}


function checkConditions(e, index) {

    let currentTurn = playerTurn;

    let introText = document.querySelector(".intro-text");
    introText.style.display = "none";

    if (gameBoardObject.gameBoard[index] == playerOne.marker && winnerCheck() === false || gameBoardObject.gameBoard[index] == playerTwo.marker && winnerCheck() === false) {
        alert("already placed");
        playerTurn = playerTurn - 1;
    } else if (winnerCheck() === false) {
        playRound(e, index, currentTurn);
    } else if (winnerCheck() === true) {
        console.log("you've already won, please stop trying to play");
    }
}

function playRound(e, index, currentTurn) {

    let placeMarkerX = document.createElement("p");
    placeMarkerX.classList = "marker";
    placeMarkerX.innerText = "X";
    placeMarkerX.style.color = "#f4a923";

    let placeMarkerO = document.createElement("p");
    placeMarkerO.classList = "marker";
    placeMarkerO.innerText = "O";
    placeMarkerO.style.color = "#f14b4e";

    if (currentTurn % 2 == 0) {
        gameBoardObject.gameBoard.splice(index, 0, playerTwo.marker);
        gameBoardObject.gameBoard.splice((index + 1), 1);
        (document.getElementById(e.target.id)).appendChild(placeMarkerO);
        gameLogic.oArray.push(index);
        winnerCheck();
        checkForTie();
    } else {
        gameBoardObject.gameBoard.splice(index, 0, playerOne.marker);
        gameBoardObject.gameBoard.splice((index + 1), 1);
        (document.getElementById(e.target.id)).appendChild(placeMarkerX);
        gameLogic.xArray.push(index);
        winnerCheck();
        checkForTie();
    }

}

function resetGame() {

    playerTurn = 0;

    gameBoardObject.gameBoard = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];

    gameLogic.xArray = [];
    gameLogic.oArray = [];

    let introText = document.querySelector(".intro-text");
    introText.style.display = "block";

    let winningAnnX = document.querySelector(".x-toggle");
    winningAnnX.style.display = "none";

    let winningAnnO = document.querySelector(".o-toggle");
    winningAnnO.style.display = "none";

    let tieAnn = document.querySelector(".tie-toggle");
    tieAnn.style.display = "none";

    Array.from(document.getElementsByClassName("marker")).forEach(element => {
        element.innerText = "";
    });
}

function xWinFunc() {
    let winningAnnX = document.querySelector(".x-toggle");
            winningAnnX.style.display = "block";
            let playAgainButtonX = document.querySelector(".play-again-x");
            playAgainButtonX.addEventListener("click", (e) => {
                resetGame();
            });
}

function oWinFunc() {
    let winningAnnO = document.querySelector(".o-toggle");
            winningAnnO.style.display = "block";
            let playAgainButtonO = document.querySelector(".play-again-o");
            playAgainButtonO.addEventListener("click", (e) => {
                resetGame();
            });
}

function tieFunc() {
    let tileAnn = document.querySelector(".tie-toggle");
        tileAnn.style.display = "block";
        let playAgainTie = document.querySelector(".play-again-tie");
        playAgainTie.addEventListener("click", (e) => {
            resetGame();
        });
}

