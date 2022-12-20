

const gameBoardObject = (() => {
    let gameBoard = [
        "", "", "",
        "", "", "",
        "", "", "",
    ]

    return {gameBoard}

})

const displayController = (() => {
    const tiles = document.querySelectorAll(".rows");

    tiles.forEach(tile => {
        tile.addEventListener("click", (e) => {
            testFunc(e)
        })
    })
    
})

const playerFactory = (player, marker) => {
    return {player, marker};
}

const playerOne = playerFactory("player One", "X")
const playerTwo = playerFactory("player Two", "O")

displayController();

function testFunc(e) {

    const selectedTile = document.querySelector(`#${e.target.id}`)

    const placedMarker = document.createElement("p")
    placedMarker.textContent = playerOne.marker

    selectedTile.appendChild(placedMarker)
}