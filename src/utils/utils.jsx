const players = [
    {
        id: 1,
        name: 'Player 1',
        icon: 'X',
        colorClass: 'blue',
    },
    {
        id: 2,
        name: 'Player 2',
        icon: 'O',
        colorClass: 'yellow',
    },
];


export function deriveGame(state) {

    let currentMovesLength = state.CurrentGameMoves.length % 2;
    let currentRoundLength = state.history.currentRoundGames.length % 2;

    let currentPlayer = players[currentMovesLength + currentRoundLength];

    if ((currentMovesLength + currentRoundLength) === 2 ) {
        currentPlayer = players[(currentMovesLength + currentRoundLength) - 2];
    };


    const winningPattern = [
        [1, 2, 3],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 5, 7],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9],
    ];

    let winner = null;

    const p1moves = state.CurrentGameMoves.filter(move => move.currentPlayer.id === 1).map(move => move.squareId);

    const p2moves = state.CurrentGameMoves.filter(move => move.currentPlayer.id  === 2).map(move => move.squareId);

    winningPattern.forEach((pattern) => {
        const p1wins = pattern.every(v => p1moves.includes(v));
        const p2wins = pattern.every(v => p2moves.includes(v));

        if (p1wins) winner = 1;
        if (p2wins) winner = 2;
    })


    // Game status: win|in-progress|draw
    function status () {
        if (winner != null) {
            return 'win';
        } else if (state.CurrentGameMoves.length === 9 && winner === null) {
            return 'draw';
        } else {
            return 'in-progress';
        };
    };
    
    return {
        moves: state.CurrentGameMoves,
        currentPlayer,
        gameStatus: status(),
        winner,
    };

}

export function deriveStats(state) {
    const game = state.history.currentRoundGames

    const p1Win = [];
    const p2Win = [];
    const draw = [];
    
    game.map(eachGame => eachGame.winner === 1).forEach((record) => {
        if (record) {
            p1Win.push('1');
        }
    });


    game.map(eachGame => eachGame.winner === 2).forEach((record) => {
        if (record) {
            p2Win.push('1');
        }
    });


    game.map(eachGame => eachGame.gameStatus === 'draw').forEach((record) => {
        if (record) {
            draw.push('1');
        }
    });

    return {
        p1Wins: p1Win.length,
        p2Wins: p2Win.length,
        draws: draw.length
    };

}