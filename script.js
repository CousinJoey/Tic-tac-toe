

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

   let xArray = []
   let oArray = []

   return {
    winCons,
    xArray,
    oArray,
   };

})();

function winnerCheck() {

    let result = false;

    for (let i = 0; i < gameLogic.winCons.length; i++) {
        if (gameLogic.winCons[i].every(x => gameLogic.xArray.includes(x))) {
            result = true;
            let winningAnnX = document.querySelector(".x-toggle");
            winningAnnX.style.display = "block";
            let playAgainButtonX = document.querySelector(".play-again-x");
            playAgainButtonX.addEventListener("click", (e) => {
                testFunc3();
            })
            break;
        } else if (gameLogic.winCons[i].every(o => gameLogic.oArray.includes(o))) {
            result = true;
            let winningAnnO = document.querySelector(".o-toggle");
            winningAnnO.style.display = "block";
            let playAgainButtonO = document.querySelector(".play-again-o");
            playAgainButtonO.addEventListener("click", (e) => {
                testFunc3();
            })
            break;
        } else {
            let tileAnn = document.querySelector(".tie-toggle");
            tileAnn.style.display = "block";
            let playAgainTie = document.querySelector(".play-again-tie");
            playAgainTie.addEventListener("click", (e) => {
                testFunc3();
            })
            break;
        }
    }

    return result

}

    


const displayController = (() => {


})();

const gameBoardDisplay = (() => {

    const divContainer = document.querySelector(".div-container")

    playerTurn = 0;

    for (let i = 0; i < (gameBoardObject.gameBoard).length; i++) {
        const tile = document.createElement("div");
        tile.id = `_${i}`
        tile.classList = "tiles"
        divContainer.appendChild(tile)
        index = i
        tile.addEventListener("click", (e) => {
            index = i
            playerTurn++;
            testFunc(e, index)

        })
    }

    return {
        playerTurn
    }

})();


const playerFactory = (player, marker) => {
    return {player, marker};
}

const playerOne = playerFactory("player One", "X")
const playerTwo = playerFactory("player Two", "O")

function testFunc(e, index) {

    let currentTurn = playerTurn


    let placedMarker = document.createElement("p");
    placedMarker.innerText = "X";

    let variable = winnerCheck();

    if (gameBoardObject.gameBoard[index] == playerOne.marker || gameBoardObject.gameBoard[index] == playerTwo.marker) {
        alert("already placed")
        playerTurn = playerTurn - 1;
    } else if (variable === false) {
        testFunc2(e, index, currentTurn);
    } else if (variable === true) {
        console.log("you've already won, please stop trying to play")
    }

    
}

function testFunc2(e, index, currentTurn) {

    console.log(currentTurn);

    let placeMarkerX = document.createElement("p");
    placeMarkerX.classList = "marker"
    placeMarkerX.innerText = "X";

    let placeMarkerO = document.createElement("p");
    placeMarkerO.classList = "marker"
    placeMarkerO.innerText = "O";

    if (currentTurn % 2 == 0) {
        gameBoardObject.gameBoard.splice(index, 0, playerTwo.marker);
        gameBoardObject.gameBoard.splice((index + 1), 1);
        (document.getElementById(e.target.id)).appendChild(placeMarkerO);
        gameLogic.oArray.push(index);
        winnerCheck();
    } else {
        gameBoardObject.gameBoard.splice(index, 0, playerOne.marker);
        gameBoardObject.gameBoard.splice((index + 1), 1);
        (document.getElementById(e.target.id)).appendChild(placeMarkerX);
        gameLogic.xArray.push(index);
        winnerCheck();
    }

    /*
    gameBoardObject.gameBoard.splice(index, 0, playerOne.marker);
    gameBoardObject.gameBoard.splice((index + 1), 1);
    (document.getElementById(e.target.id)).appendChild(placedMarker);
    gameLogic.xArray.push(index);
    winnerCheck();
    */

}

function testFunc3() {

    playerTurn = 0;

    gameBoardObject.gameBoard = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];

    gameLogic.xArray = []
    gameLogic.oArray = []

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
