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

    // win intialize
    let win = false;
    let player1Score = 0;
    let player2Score = 0;
    let player1Count = 0;
    let player2Count = 0

    // find player input and change the GameBoard
    // add player input into their respective array for win checking
    function addPlayerInput(playerInput, playerCount) {
        if (GameBoard[playerInput] === 0) {
            GameBoard[playerInput] = 1;
        }
    }

    // find player input and change the GameBoard
    function checkInput(playerInput) {
        // take turn check input until there is a win
        if (! win) {
            if (Player1.turn) {
                addPlayerInput(playerInput, player1Score);
                
                // add player score
                player1Score += addScore(playerInput);
                player1Count += 1;

                // set it to player two turn
                Player2.turn = true;
                Player1.turn = false;

            }  else if (Player2.turn) {
                addPlayerInput(playerInput, player2Score);

                //  add player score
                player2Score += addScore(playerInput);
                player2Count += 1;

                // set it to player 1 turn
                Player2.turn = false;
                Player1.turn = true;
            }
        }
    }

    // check win
    // check first three input only
    function addScore(playerInput, playerCount) {
        return score = BoardAlgo[playerInput];
    }

    function checkWin() {
        if (player1Score === 15 && player1Count === 3) {
            win = true;
            console.log("Player 1 wins");
        } else if (player2Score === 15 && player2Count === 3) {
            win = true;
            console.log("Player 2 wins");
        } else if (player1Count === 5 && player2Count === 4){
            console.log("Draw");
        }
    }

    // test GameBoard
    function printGameBoard() {
        checkInput("R1C1");
        console.log(player1Score);
        checkWin();
        checkInput("R3C3");
        console.log(player2Score);
        checkWin();
        checkInput("R2C2");
        console.log(player1Score);
        checkWin();
        checkInput("R3C1");
        console.log(player2Score);
        checkInput("R1C3");
        console.log(player1Score);
        checkInput("R3C2");
        console.log(player2Score);
        checkWin();
        
        console.log(player1Count);
        console.log(GameBoard);
    }

    return {printGameBoard};
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

GameBoard.printGameBoard();