const GameBoard = (function() {
    const GameBoard = {
        // row 1 
        R1C1: false,
        R1C2: false,
        R1C3: false,
        // row 2
        R2C1: false,
        R2C2: false,
        R2C3: false,
        // row 3
        R3C1: false,
        R3C2: false,
        R3C3: false
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
    let playerTurn = 1;


    // find player input and change the GameBoard
    // add player input into their respective array for win checking
    function addPlayerInput(playerInput, playerArr) {
        let validInput = false;
        if (! GameBoard[playerInput]) {
            validInput = true;
            GameBoard[playerInput] = true;
            playerArr.push(BoardAlgo[playerInput]);
        }
        return validInput;
    }

    // find player input and change the GameBoard
    function checkInput(playerInput) {
        // take turn check input until there is a win
        let gameOverContext = 0;
        let validInput = false;
        if (! gameOver) {
            if (playerTurn === 1) {
                validInput = addPlayerInput(playerInput, player1Arr);
                console.log(validInput);

                // set it to player two turn
                playerTurn = 2;

                if (checkWin(player1Arr)) {
                    // 1 -> player 1 wins
                    gameOverContext = 1;
                    player1Score += 1;
                    gameOver = true;

                }

            }  else if (playerTurn === 2) {
                validInput = addPlayerInput(playerInput, player2Arr);

                // set it to player 1 turn
                playerTurn = 1;

                if (checkWin(player2Arr)) {
                    // 2 -> player 2 wins
                    gameOverContext = 2;
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

        return [playerTurn, validInput, gameOver, gameOverContext, player1Score, player2Score];
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
        playerTurn = 1;

        Object.keys(GameBoard).forEach(key => {
            GameBoard[key] = false;   
        });
        gameOver = false;
    }

    return {checkInput, resetGame};
})();


// click on grid and return the id and checkInput
// change score

// DOM logic
const DOMLogic = (function() {
    function showInput(grid, text) {
        const textDiv = document.createElement("div");
        textDiv.classList.add("text-div");
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

    let player1Name = "";
    let player2Name = "";
    // show when page load
    document.addEventListener('DOMContentLoaded', (e) => {
        const playerEnterName = document.querySelector(".player-enter-name");
        const submit = document.querySelector("#confirmBtn");
        const player1NameSection = document.querySelector("#player-1-name");
        const player2NameSection = document.querySelector("#player-2-name");
        
        const player1NameDisplay = document.querySelector(".player1");
        const player2NameDisplay = document.querySelector(".player2");
        playerEnterName.showModal();

        submit.addEventListener("click", (e)=>{
            e.preventDefault();

            player1Name = player1NameSection.value;
            player2Name = player2NameSection.value;

            playerEnterName.close();

            player1NameDisplay.textContent = player1Name;
            player2NameDisplay.textContent = player2Name;
        })
    })

    const winnerInfo = document.querySelector(".winner-info");
    // show who's the winner
    function showWinner(context) {
        if (context === 1) {
            winnerInfo.textContent = `${player1Name} wins`;
        } else if (context === 2) {
            winnerInfo.textContent = `${player2Name} wins`;
        } else {
            winnerInfo.textContent = "Draw";
        }
    }
    function resetBoard() {
        document.querySelectorAll(".text-div").forEach(div => div.remove());
    }

    function showDialog(gameOver, gameOverContext) {
        const dialog = document.querySelector(".game-over");
        const replayBtn = document.querySelector("button");
        if (gameOver) {
            dialog.showModal();
            showWinner(gameOverContext);
        }
        replayBtn.addEventListener("click", ()=>{
            GameBoard.resetGame();
            
            // select all entered text-div and delete
            resetBoard();
            dialog.close();
        })
    }


    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("grid")) {
            // current grid 
            const grid = e.target;

            // check status
            const result = GameBoard.checkInput(e.target.id);
            const playerTurn = result[0];
            const clickable = result[1];
            const gameOver = result[2];
            const gameOverContext = result[3];
            const player1Score = result[4];
            const player2Score = result[5];

            if (playerTurn === 2 && clickable === true) {
                showInput(grid, "X");
            } else if (playerTurn === 1) {
                showInput(grid, "O");
            }


            showResult(player1Score, scorePlayer1);
            showResult(player2Score, scorePlayer2);

            showDialog(gameOver, gameOverContext);
        }
    });
})();

