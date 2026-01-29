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
        if (! gameOver) {
            if (Player1.turn) {
                addPlayerInput(playerInput, player1Arr);

                // set it to player two turn
                Player2.turn = true;
                Player1.turn = false;

                if (checkWin(player1Arr)) {
                    console.log("Player 1 win");
                    gameOver = true;
                }

            }  else if (Player2.turn) {
                addPlayerInput(playerInput, player2Arr);

                // set it to player 1 turn
                Player2.turn = false;
                Player1.turn = true;

                if (checkWin(player2Arr)) {
                    console.log("Player 2 win");
                    gameOver = true;
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

    // test GameBoard
    function startGame() {
        checkInput("R1C1");
        checkInput("R3C3");
        checkInput("R2C2");
        checkInput("R3C1");
        checkInput("R1C3");
        checkInput("R3C2");
        checkInput("R1C2");

        resetGame();
        checkInput("R1C1");
        checkInput("R3C3");
        checkInput("R2C2");
        checkInput("R3C1");
        checkInput("R1C3");
        checkInput("R1C2");
        checkInput("R3C2");
        checkInput("R2C3");
        checkInput("R2C1");
    }

    return {startGame};
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

GameBoard.startGame();