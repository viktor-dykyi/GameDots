

export const fetchGameSettings = () => {
    return{
        easyMode: {
            field: 5,
            delay: 700,
        },
        normalMode: {
            field: 10,
            delay: 800,
        },
        hardMode: {
            field: 15,
            delay: 800,
        },
    };
};

export const sendWinnerInfo = (winner, dateOfWin) => {
    const newWinners = getWinners()
    newWinners.push({
        winner: winner,
        date: dateOfWin,
        id: getWinners().Lenght + 1,
    })
    localStorage.setItem("winners", JSON.stringify(newWinners));
    return newWinners;
};

export const getWinners = () => {
    const winners = JSON.parse(localStorage.getItem("winners")) || [];
    return [ ...winners];
};