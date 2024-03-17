document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    let currentPlayer = "X"; //nu yerda 3 kisilik qsa boladi lekin unch yaxsimas
    let gameOver = false;
    let computerPlayer = "O"; // Kompyuter uchun o'yna o'zgaruvchisi; shu yerda kompyuter yoki player qilish uchun var

    cells.forEach(cell => {
        cell.addEventListener("click", function () {
            if (!gameOver && !cell.textContent) {
                cell.textContent = currentPlayer;
                if (checkWin()) {
                    alert(`Tabriklaymiz! ${currentPlayer} yutdi!`);
                    gameOver = true;
                } else if (checkDraw()) {
                    alert("O'yin o'zgacha tugadi. Hech kim yutqazmadi!");
                    gameOver = true;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    if (currentPlayer === computerPlayer) { // Check if it's the computer's turn
                        setTimeout(computerMove, 500); // Computer's move after a delay
                    }
                }
            }
        });
    });

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6] // diagonal
        ];

        return winConditions.some(condition =>
            cells[condition[0]].textContent && cells[condition[0]].textContent === cells[condition[1]].textContent && cells[condition[1]].textContent === cells[condition[2]].textContent
        );
    }

    function checkDraw() {
        return Array.from(cells).every(cell => cell.textContent !== "");
    }

    function computerMove() {
        if (!gameOver) {
            const emptyCells = Array.from(cells).filter(cell => !cell.textContent);
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const selectedCell = emptyCells[randomIndex];
            
            if (selectedCell) {
                selectedCell.textContent = currentPlayer;
                if (checkWin()) {
                    alert(`Tabriklaymiz! ${currentPlayer} yutdi!`);
                    gameOver = true;
                } else if (checkDraw()) {
                    alert("O'yin o'zgacha tugadi. Hech kim yutqazmadi!");
                    gameOver = true;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        }
    }
});
