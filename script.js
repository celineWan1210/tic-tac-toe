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
    function addPlayerInput(playerInput, playerArr) {
        if (GameBoard[playerInput] === 0) {
            GameBoard[playerInput] = 1;
        }
        
        playerArr.push(BoardAlgo[playerInput]);
    }

    // find player input and change the GameBoard
    function checkInput(playerInput) {
        // take turn check input until there is a win
        let gameOverContext = 0;
        if (! gameOver) {
            if (Player1.turn) {
                addPlayerInput(playerInput, player1Arr);

                // set it to player two turn
                Player2.turn = true;
                Player1.turn = false;

                if (checkWin(player1Arr)) {
                    // 1 -> player 1 wins
                    gameOverContext = 1;
                    player1Score += 1;
                    gameOver = true;

                }

            }  else if (Player2.turn) {
                addPlayerInput(playerInput, player2Arr);

                // set it to player 1 turn
                Player2.turn = false;
                Player1.turn = true;

                if (checkWin(player2Arr)) {
                    // 2 -> player 2 wins
                    gameOverContext = 2
                    gameOver = true;
                    player2Score += 1;
                }
            }

            if (player1Arr.length === 5 && player2Arr.length === 4) {
                // 3 -> draw
                gameOverContext = 3;
                gameOver = true;
            }
        }

        return [Player1.turn, Player2.turn, GameBoard[playerInput], gameOver, gameOverContext, player1Score, player2Score];
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
const DOMLogic = (function() {
    function showInput(grid, text) {
        const textDiv = document.createElement("div");
        grid.classList.add("text-div");
        textDiv.textContent = text;
        grid.appendChild(textDiv);
    }

    const player1Div = document.querySelector(".player-1-section");
    const scorePlayer1 = player1Div.querySelector(".score");
    const player2Div = document.querySelector(".player-2-section");
    const scorePlayer2 = player2Div.querySelector(".score");
    function showResult(playerScore, scoreDiv) {
        scoreDiv.textContent = playerScore;
    }


    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("grid")) {
            // current grid 
            grid = e.target;

            // check status
            const result = GameBoard.checkInput(e.target.id);
            const player1Turn = result[0];
            const player2Turn = result[1]
            let clickable = result[2];
            const gameOver = result[3];
            const gameOverContext = result[4];
            const player1Score = result[5];
            const player2Score = result[6];

            if (! player1Turn && clickable === 1) {
                showInput(grid, "X")
                clickable = 0;
            } else if (!player2Turn && clickable === 1) {
                showInput(grid, "O")
                clickable = 0;
            }

            showResult(player1Score, scorePlayer1);
            showResult(player2Score, scorePlayer2);
            console.log(player1Turn);
            console.log(clickable);
        }
    });
})();

