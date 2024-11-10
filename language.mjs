import { ANSI } from "./utils/ansi.mjs";

const DICTIONARY = {
    en: {
        MENU_START : "Start Game",
        MENU_SETTINGS : "Settings",
        MENU_EXIT : "Exit Game",
        MENU_LANGUAGE : "Language",
        MENU_BACK : "Back",
        SHIP_PLACEMENT_1 : `SHIP PLACEMENT\nFirst player get ready.\nPlayer two look away`,
        SHIP_PLACEMENT_2 : `SHIP PLACEMENT\nSecond player get ready.\nPlayer one look away`,
        SHIP_PLACEMENT : `${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Ship Placement Phase\n\n${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}`,
        CONTROLS : `${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Controls:${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n`,
        CONTROLS_ARROWS : 'Arrow keys: Move cursor\n',
        CONTROLS_R : 'R: Rotate ship\n',
        CONTROLS_ENTER : 'Enter: Place ship\n',
        SHIP_LIST : `\n${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Ships to place:${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n`,
        SHIP_CARRIER : "Carrier",
        SHIP_BATTLESHIP : "Battleship",
        SHIP_CRUISER : "Cruiser",
        SHIP_SUBMARINE : "Submarine",
        SHIP_DESTROYER : "Destroyer",
        CONSOLE_ERROR : "Your console is too small...",
        EXIT : "Exiting game..."
    },
    no: {
        MENU_START : "Start Spill",
        MENU_SETTINGS : "Innstillinger",
        MENU_EXIT : "Avslutt Spill",
        MENU_LANGUAGE : "Språk",
        MENU_BACK : "Tilbake",
        SHIP_PLACEMENT_1 : `SKIP PLASSERING\nSpiller en, gjør deg klar.\nSpiller to se vekk`,
        SHIP_PLACEMENT_2 : `SKIP PLASSERING\nSpiller to, gjør deg klar.\nSpiller en se vekk`,
        SHIP_PLACEMENT : `${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Skip Plasserings Fase\n\n${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}`,
        CONTROLS : `${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Kontroller:${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n`,
        CONTROLS_ARROWS : 'Pil taster: Flytt markør\n',
        CONTROLS_R : 'R: Roter skip\n',
        CONTROLS_ENTER: 'Enter: Plasser skip\n',
        SHIP_LIST : `\n${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Shik å plassere:${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n`,
        SHIP_CARRIER : "Hangarskip",
        SHIP_BATTLESHIP : "Slagskip",
        SHIP_CRUISER : "Krysser",
        SHIP_SUBMARINE : "Ubåt",
        SHIP_DESTROYER : "Destroyer",
        CONSOLE_ERROR : "Konsollen din er for liten...",
        EXIT : "Avslutter spill..."
    }
}

export default DICTIONARY;