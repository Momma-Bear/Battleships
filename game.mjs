import { ANSI } from "./utils/ansi.mjs";
import { print, clearScreen } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import { FIRST_PLAYER, SECOND_PLAYER } from "./consts.mjs";
import createMenu from "./utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createInnBetweenScreen from "./game/innbetweenScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";
import DICTIONARY  from "./language.mjs";

let language = DICTIONARY.en;
let mainMenuItems = buildMainMenu(language);
let settingsMenuItems = buildSettingsMenu(language);
let languageMenuItems = buildLanguageMenu(language);

const GAME_FPS = 1000 / 60; // The theoretical refresh rate of our game engine
let currentState = null;    // The current active state in our finite-state machine.
let gameLoop = null;        // Variable that keeps a refrence to the interval id assigned to our game loop 

let mainMenuScene = null;
let settingsMenuScene = null;
let languageMenuScene = null;

let mainMenu = 1;
let settingsMenu = 2;
let languageMenu = 3;

(function initialize() {
    print(ANSI.HIDE_CURSOR);
    mainMenuScene = createMenu(mainMenuItems, 0);
    settingsMenuScene = createMenu(settingsMenuItems, 0);
    languageMenuScene = createMenu(languageMenuItems, 0);
    SplashScreen.next = mainMenuScene;
    currentState = SplashScreen;  // This is where we decide what state our finite-state machine will start in. 
    gameLoop = setInterval(update, GAME_FPS); // The game is started.
})();

function update() {
    currentState.update(GAME_FPS);
    currentState.draw(GAME_FPS);
    if (currentState.transitionTo != null) {
        currentState = currentState.next;
        currentState.isDrawn = false;
        currentState.transitionTo = null;
        print(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    }
}

// Suport / Utility functions ---------------------------------------------------------------

function buildMainMenu(menuLanguage) {
    let menuItemCount = 0;
    return [
        {
            text: menuLanguage.MENU_START, id: menuItemCount++, action: function () {
                clearScreen();
                if (process.stdout.rows > 31 && process.stdout.columns > 68){
                    let innbetween = createInnBetweenScreen();
                    innbetween.init(language.SHIP_PLACEMENT_1, () => {

                        let p1map = createMapLayoutScreen();
                        p1map.init(FIRST_PLAYER, (player1ShipMap) => {


                            let innbetween = createInnBetweenScreen();
                            innbetween.init(language.SHIP_PLACEMENT_2, () => {
                                let p2map = createMapLayoutScreen();
                                p2map.init(SECOND_PLAYER, (player2ShipMap) => {
                                    return createBattleshipScreen(player1ShipMap, player2ShipMap);
                                })
                                return p2map;
                            });
                            return innbetween;
                        });

                        return p1map;

                    }, 3);
                    currentState.next = innbetween;
                    currentState.transitionTo = "Map layout";
                } else {
                    print(language.CONSOLE_ERROR);
                    setTimeout(quit, 1500);
                }
            }
        },
        { text: menuLanguage.MENU_SETTINGS, id: menuItemCount++, action: function () { changeMenu(settingsMenu); } },
        { text: menuLanguage.MENU_EXIT, id: menuItemCount++, action: function () { print(ANSI.SHOW_CURSOR); clearScreen(); print(language.EXIT); setTimeout(quit, 1500); } },
    ];
}

function quit(){
    clearScreen();
    process.exit();
}

function buildSettingsMenu(menuLanguage){
    let menuItemCount = 0;
    return [
        { text: menuLanguage.MENU_LANGUAGE, id: menuItemCount++, action: function () { changeMenu(languageMenu); }},
        { text: menuLanguage.MENU_BACK, id: menuItemCount++, action: function () { changeMenu(mainMenu); } }
    ]
}

function changeMenu(menu){
    if (menu == settingsMenu){
        currentState.next = settingsMenuScene;
        currentState.transitionTo = "Settings Menu";
    } else if (menu == languageMenu){
        currentState.next = languageMenuScene;
        currentState.transitionTo = "Language Menu";
    } else if (menu == mainMenu){
        currentState.next = mainMenuScene;
        currentState.transitionTo = "Main Menu";
    }
}

function buildLanguageMenu(menuLanguage){
    let menuItemCount = 0;                            
    return [
        { 
            text: "English", id: menuItemCount++, action: function () {
                language = DICTIONARY.en;
                setMenu(language);
                changeMenu(mainMenu);
            } 
        },
        {
            text: "Norsk", id: menuItemCount++, action: function () {
                language = DICTIONARY.no;
                setMenu(language);
                changeMenu(mainMenu);
            }
        },
    { text: menuLanguage.MENU_BACK, id: menuItemCount++, action: function () { changeMenu(settingsMenu); } }
    ]
}

function setMenu(currentLanguage){
    mainMenuItems = buildMainMenu(currentLanguage);
    settingsMenuItems = buildSettingsMenu(currentLanguage);
    languageMenuItems = buildLanguageMenu(currentLanguage);
    mainMenuScene = createMenu(mainMenuItems, 0);
    settingsMenuScene = createMenu(settingsMenuItems, 0);
    languageMenuScene = createMenu(languageMenuItems, 0);

}

export default language;