const cells = document.querySelectorAll('.cell')
const restartBtn = document.getElementById('reset')
const title = document.getElementById('title')

const players = {
    x: 'X',
    o: 'O',
}
let currentPlayer = ''
let isGameRunning = false
let boardState = Array(9).fill('')
const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
]

function initializeGame() {
    cells.forEach((cell) => {
        cell.addEventListener('click', clickCell)
    })
    restartBtn.addEventListener('click', restartGame)
}

function startGame() {
    cells.forEach((cell) => {
        cell.style.backgroundColor = '#456c81'
    })
    boardState.fill('')
    isGameRunning = true
    cells.forEach((cell) => (cell.textContent = ''))
    currentPlayer = players.x
    title.innerHTML = `
    <h2 class="">
        TIC TAC TOE in <span>JS</span>
    </h2> `
}

function clickCell() {
    if (!isGameRunning) {
        return
    }
    if (this.textContent) {
        return
    }
    this.textContent = currentPlayer
    const cellIndex = this.dataset.cellIndex
    boardState[cellIndex] = currentPlayer
    if (checkGameOver()) {
        return finishGame()
    }
    currentPlayer = currentPlayer === players.x ? players.o : players.x
    title.textContent = ` ${currentPlayer} will step`
}

function checkLine(line) {
    const [a, b, c] = line

    const cellA = boardState[a]
    const cellB = boardState[b]
    const cellC = boardState[c]

    if ([cellA, cellB, cellC].includes('')) {
        return false
    }
    return cellA === cellB && cellB === cellC
}

function checkGameOver() {
    for (const line of winLines) {
        if (checkLine(line)) {
            line.forEach((elementIndex) => {
                const cellElement = cells[elementIndex]
                cellElement.style.backgroundColor = '#90EE90'
            })
            title.textContent = `${currentPlayer} win!`
            return true
        }
    }
    if (!boardState.includes('')) {
        title.textContent = 'Draw!'
        return true
    }
}

function finishGame() {
    isGameRunning = false
}

function restartGame() {
    finishGame()
    startGame()
}

window.addEventListener('load', () => {
    initializeGame()
    startGame()
})
