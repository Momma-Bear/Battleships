import { GAME_BOARD_DIM, FIRST_PLAYER, SECOND_PLAYER } from "../consts.mjs";
import language from "../game.mjs";
import { clearScreen, print } from "../utils/io.mjs";
import { create2DArrayWithFill } from "../utils/array.mjs";
import KeyBoardManager from "../utils/io.mjs";
import { ANSI } from "../utils/ansi.mjs";

ANSI.SEA = '\x1b[48;5;39m';

const createBattleshipScreen = (firstPlayerBoard, secondPlayerBoard) => {

    let currentPlayer = FIRST_PLAYER;
    let cursorColumn = 0;
    let cursorRow = 0;
    let mapOne = create2DArrayWithFill(GAME_BOARD_DIM);
    let mapTwo = create2DArrayWithFill(GAME_BOARD_DIM);
    let currentBoard  = firstPlayerBoard;
    let oponentBoard = secondPlayerBoard;
    let currentShotBoard = mapOne;
    let opposingShotBoard = mapTwo;
    let hit = 1;
    let miss = 2;


    function swapPlayer() {
        currentPlayer *= -1;
        if (currentPlayer == FIRST_PLAYER) {
            currentBoard = firstPlayerBoard;
            oponentBoard = secondPlayerBoard;
            currentShotBoard = mapOne;
            opposingShotBoard = mapTwo;
        } else {
            currentBoard = secondPlayerBoard;
            oponentBoard = firstPlayerBoard;
            currentShotBoard = mapTwo;
            opposingShotBoard = mapOne;
        }
    }



    return {
        isDrawn: false,
        next: null,
        transitionTo: null,

        init: function (firstPBoard, secondPBoard) {
             firstPlayerBoard = firstPBoard;
             secondPlayerBoard = secondPBoard;
        },

        update: function (dt) {
            if (KeyBoardManager.isUpPressed()) {
                cursorRow = Math.max(0, cursorRow - 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isDownPressed()) {
                cursorRow = Math.min(GAME_BOARD_DIM - 1, cursorRow + 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isLeftPressed()) {
                cursorColumn = Math.max(0, cursorColumn - 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isRightPressed()) {
                cursorColumn = Math.min(GAME_BOARD_DIM - 1, cursorColumn + 1);
                this.isDrawn = false;
            }

            if (KeyBoardManager.isEnterPressed()) {
                this.isDrawn = false;
                let row = cursorRow;
                let column = cursorColumn;
                if (currentBoard == null){
                    currentBoard = firstPlayerBoard;
                    oponentBoard = secondPlayerBoard;
                }

                if (currentBoard[row][column] == 0){
                    currentShotBoard[row][column] = miss;
                } else {
                    currentShotBoard[row][column] = hit;
                    if (currentPlayer == FIRST_PLAYER){
                        firstPlayerBoard[row][column] = 0;
                        let winner = true;
                        for (let x = 0; x < GAME_BOARD_DIM; x++){
                            for (let y = 0; y < GAME_BOARD_DIM; y++){
                                if (firstPlayerBoard[x][y] != 0){
                                    winner = false;
                                }
                            }
                        }
                        if (winner == true){
                            clearScreen();
                            print(language.PLAYER_1_WINNER);
                            this.isDrawn = true;
                            setTimeout(mainMenu, 2000);

                            function mainMenu(){
                                this.next = mainMenuScene;
                                this.transitionTo = "Main menu";
                            }
                        }
                    } else {
                        secondPlayerBoard[row][column] = 0;
                        let winner = true;
                        for (let x = 0; x < GAME_BOARD_DIM; x++){
                            for (let y = 0; y < GAME_BOARD_DIM; y++){
                                if (secondPlayerBoard[x][y] != 0){
                                    winner = false;
                                }
                            }
                        }
                        if (winner == true){
                            clearScreen();
                            print(language.PLAYER_2_WINNER);
                            this.isDrawn = true;
                            setTimeout(mainMenu, 2000);

                            function mainMenu(){
                                this.next = mainMenuScene;
                                this.transitionTo = "Main menu";
                            }
                        }
                    }
                }
                
                swapPlayer();
                this.isDrawn = false;
            }
        },

        draw: function (dr) {
            if (this.isDrawn == false) {
                this.isDrawn = true;

                clearScreen();

                let output = language.SHOOTING_PHASE;
                output += '  ';
                for (let i = 0; i < GAME_BOARD_DIM; i++){
                    output += ` ${String.fromCharCode(65 + i)}`;
                }
                output += '\n';

                for (let y = 0; y < GAME_BOARD_DIM; y++){
                    output += `${String(y + 1).padStart(2, ' ')} `;

                    for (let x = 0; x < GAME_BOARD_DIM; x++){
                        const cell = currentShotBoard[y][x];

                        if (y == cursorRow && x == cursorColumn){
                            output += ANSI.COLOR.GREEN + '█' + ANSI.RESET + ' ';   
                        } else if (cell == miss){
                            output += ANSI.COLOR.WHITE + '█' + ANSI.RESET + ' ';
                        } else if (cell == hit){
                            output += ANSI.COLOR.RED + '█' + ANSI.RESET + ' ';
                        } else {
                            output += ANSI.SEA + ' ' + ANSI.RESET + ' ';
                        }
                    }
                    output += `${y + 1}\n`;
                }

                output += '  ';
                for (let i = 0; i < GAME_BOARD_DIM; i++) {
                    output += ` ${String.fromCharCode(65 + i)}`;
                }
                output += '\n\n';

                output += language.CONTROLS;
                output += language.CONTROLS_ARROWS;
                output += language.CONTROLS_SHOOT;


                print (output);
                print(firstPlayerBoard);
                print(secondPlayerBoard);
                }



            }
        }

    }

export default  createBattleshipScreen;