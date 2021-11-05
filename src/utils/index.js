export const getRandomNumberInRange = (max, arrayOfIndexesToExclude) => {
    let rand = null;

    while (rand === null || arrayOfIndexesToExclude.includes(rand)) {
        rand = Math.round(Math.random() * (max));
    }
    return rand;
};

export const updateGameMap = (gameMap, neededIndex, fieldName, value) => {
    return gameMap.map((square, index) => {
        let newSquare = square;
        if (index === neededIndex) {
            newSquare = {...square, [fieldName]: value}
        }
        return newSquare
    });
};
