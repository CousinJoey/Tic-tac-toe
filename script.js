

const gameBoardObject = (() => {
    let gameBoard = [
        "", "", "",
        "", "", "",
        "", "", "",
    ]

   return {
    gameBoard
   };

})();


const displayController = (() => {
    
    
})();

const gameBoardDisplay = (() => {

    const divContainer = document.querySelector(".div-container")

    for (let i = 0; i < (gameBoardObject.gameBoard).length; i++) {
        const tile = document.createElement("div");
        tile.id = `_${i}`
        tile.classList = "rows"
        divContainer.appendChild(tile)
        tile.addEventListener("click", (e) => {
            index = i
            testFunc(e, index)
        })
    }

})();

const playerFactory = (player, marker) => {
    return {player, marker};
}

const playerOne = playerFactory("player One", "X")
const playerTwo = playerFactory("player Two", "O")

function testFunc(e, index) {
    let placedMarker = document.createElement("p");
    placedMarker.innerText = "X";
    console.log(index)
    console.log(gameBoardObject.gameBoard[index]);

    if (gameBoardObject.gameBoard[index] == playerOne.marker) {
        alert("already placed")
    } else {
        gameBoardObject.gameBoard.splice(index, 0, playerOne.marker);
        gameBoardObject.gameBoard.splice((index + 1), 1);
        (document.getElementById(e.target.id)).appendChild(placedMarker);
    }

    console.log(gameBoardObject.gameBoard);

}