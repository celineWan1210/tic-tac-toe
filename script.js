const GameBoard = (function() {
    const GameBoard = {
        // row 1 
        R1L1: 0,
        R1L2: 0,
        R1L3: 0,
    };

    // win intialize
    let win = false;
    // player input initialize
    let player1Input = [];
    let player2Input = [];

    // find player input and change the GameBoard
    // add player input into their respective array for win checking
    function addPlayerInput(player, playerInputArray) {
        const input = player.input();
        if (GameBoard[input] === 0) {
            GameBoard[input] = 1;
            // store it inside array
            playerInputArray.push(player.input());
        }
    }

    // find player input and change the GameBoard
    function checkInput() {
        // if its player 1 turn
        if (Player1.turn) {
            addPlayerInput(Player1, player1Input);
            // set it to player two turn
            Player2.turn = true;
            Player1.turn = false;
        }  else if (Player2.turn) {
            addPlayerInput(Player2, player2Input);
            Player2.turn = false;
            Player1.turn = true;
        }
    }

    // test GameBoard
    function printGameBoard() {
        checkInput()
        checkInput()
        return console.log(GameBoard);
    }

    return {printGameBoard};
})();

// player 1 and player 2
const Player1 = (function() {

    function input(){
        const player1Input = "R1L1"
        return player1Input;
    }

    function turn() {
        return true;
    }

    return {input, turn};
})();
const Player2 = (function() {

    function input(){
        const player1Input = "R1L3"
        return player1Input;
    }

    function turn() {
        return false;
    }

    return {input, turn};
})();

GameBoard.printGameBoard();