const GameBoard = (function() {
    const GameBoard = {
        // row 1 
        R1C1: 0,
        R1C2: 0,
        R1C3: 0,
        // row 2
        R2C1: 0,
        R2C2: 0,
        R2C3: 0,
        // row 3
        R3C1: 0,
        R3C2: 0,
        R3C3: 0
    };

    const BoardAlgo = {
        // row 1 
        R1C1: 4,
        R1C2: 9,
        R1C3: 2,
        // row 2
        R2C1: 3,
        R2C2: 5,
        R2C3: 7,
        // row 3
        R3C1: 8,
        R3C2: 1,
        R3C3: 6
    }

    // playerArr initialize
    let player1Arr = [];
    let player2Arr = [];
    let player1Score = 0;
    let player2Score = 0;
    let gameOver = false;


    // find player input and change the GameBoard
    // add player input into their respective array for win checking
    function addPlayerInput(playerInput, playerArr, grid, playerText) {
        if (GameBoard[playerInput] === 0) {
            GameBoard[playerInput] = 1;

            // can only click when gameboard is not filled
            const textDiv = document.createElement("div");
            textDiv.classList.add("text-div");
            textDiv.textContent = playerText;
            grid.appendChild(textDiv);
        }
        
        playerArr.push(BoardAlgo[playerInput]);
    }

    // show score
    const player1Div = document.querySelector(".player-1-section");
    const scorePlayer1 = player1Div.querySelector(".score");
    const player2Div = document.querySelector(".player-2-section");
    const scorePlayer2 = player2Div.querySelector(".score");
    function showScore(scorePlayer) {
        scorePlayer.textContent = player1Score;
    }

    // find player input and change the GameBoard
    function checkInput(playerInput) {
        // take turn check input until there is a win
        const player1Text = "X";
        const player2Text = "O"
        if (! gameOver) {
            if (Player1.turn) {
                addPlayerInput(playerInput, player1Arr, grid, player1Text);

                // set it to player two turn
                Player2.turn = true;
                Player1.turn = false;

                if (checkWin(player1Arr)) {
                    console.log("Player 1 win");
                    player1Score += 1;
                    // add then show again
                    showScore(scorePlayer1);
                    gameOver = true;
                }

            }  else if (Player2.turn) {
                addPlayerInput(playerInput, player2Arr, grid, player2Text);

                // set it to player 1 turn
                Player2.turn = false;
                Player1.turn = true;

                if (checkWin(player2Arr)) {
                    console.log("Player 2 win");
                    gameOver = true;
                    player2Score += 1;
                    showScore(scorePlayer2);
                }
            }

            if (player1Arr.length === 5 && player2Arr.length === 4) {
                console.log("Draw");
                gameOver = true;
            }
        }
    }

    // check win: Two Pointers Technique
    // check any three input = 15 then win
    function checkWin(playerArr) {
        console.log(playerArr);
        // let n = player arr lengt
        let n = playerArr.length
        if (n >= 3) {
            // first element
            for (let i = 0; i < n - 2; i++) {
                // second element
                for (let j = i + 1; j < n - 1; j++) {
                    // look for third number
                    for (let k = j + 1; k < n; k++) {
                        if (playerArr[i] + playerArr[j] + playerArr[k] === 15) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    // reset game
    function resetGame() {
        player1Arr = [];
        player2Arr = [];

        Object.keys(GameBoard).forEach(key => {
            GameBoard[key] = 0;   
        });
        gameOver = false;
    }

    return {checkInput};
})();

// player 1 and player 2
const Player1 = (function() {
    function turn() {
        return true;
    }

    return {turn};
})();
const Player2 = (function() {
    function turn() {
        return false;
    }

    return {turn};
})();

// click on grid and return the id and checkInput
// change score

// DOM logic

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("grid")) {
        grid = e.target;
        GameBoard.checkInput(e.target.id, grid);
    }
});
