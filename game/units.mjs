function unitsCreation(language){
    const units = {
    carrier: { size: 5, id: language.SHIP_CRUISER, symbole: "O" },
    battleship: { size: 4, id: language.SHIP_BATTLESHIP, symbole: "K" },
    cruiser: { size: 3, id: language.SHIP_CRUISER, symbole: "T" },
    submarine: { size: 3, id: language.SHIP_SUBMARINE, symbole: "X" },
    destroyer: { size: 2, id: language.SHIP_DESTROYER, symbole: "Q" }
}

return units;
}


export default unitsCreation;