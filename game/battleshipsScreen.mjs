import { GAME_BOARD_DIM, FIRST_PLAYER, SECOND_PLAYER } from "../consts.mjs";
import language from "../game.mjs";
import { clearScreen, print } from "../utils/io.mjs";
import { create2DArrayWithFill } from "../utils/array.mjs";
import KeyBoardManager from "../utils/io.mjs";
import { ANSI } from "../utils/ansi.mjs";

ANSI.SEA = '\x1b[48;5;39m';

const creteBatleshipScreen = () => {

    let currentPlayer = FIRST_PLAYER;
    let firstPlayerBoard = null;
    let secondPlayerBoard = null;
    let cursorColumn = 0;
    let cursorRow = 0;
    let mapOne = create2DArrayWithFill(GAME_BOARD_DIM);
    let mapTwo = create2DArrayWithFill(GAME_BOARD_DIM);
    let currentBoard = mapOne;
    let oponentBoard = mapTwo;
    let hit = 1;
    let miss = 2;


    function swapPlayer() {
        currentPlayer *= -1;
        if (currentPlayer == FIRST_PLAYER) {
            currentBoard = mapTwo;
            oponentBoard = mapOne;
        } else {
            currentBoard = mapOne;
            oponentBoard = mapTwo;
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
            //this.isDrawn = false;
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
                if (currentPlayer == FIRST_PLAYER){
                    if (secondPlayerBoard[cursorRow][cursorColumn] == 0){
                        mapOne[cursorRow][cursorColumn] = miss;
                    } else {
                        mapOne[cursorRow][cursorColumn] = hit;
                    }
                } else {
                    if (firstPlayerBoard[cursorRow][cursorColumn] == 0){
                        mapTwo[cursorRow][cursorColumn] = miss;
                    } else {
                        mapTwo[cursorRow][cursorColumn] = hit;
                    }
                }
                
                swapPlayer();
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
                        const cell = currentBoard[y][x];

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
                print("There should be a battleship game here");
                }

            


            }
        }

    }

export default creteBatleshipScreen;