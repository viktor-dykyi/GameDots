import React, {PureComponent} from 'react';
import { fetchGameSettings, sendWinnerInfo } from '../../api/Api';
import { initialState } from './constants';
import { getRandomNumberInRange, updateGameMap } from '../../utils';
import moment from "moment";
import Input from './input/Input';
import Button from './button/Button';
import CountSquares from './count-squares/CountSquares';
import Square from './square/Square';
import Mode from './mode/Mode';
import classNames from 'classnames';
import "./GameBoard.scss"

class GameBoard extends PureComponent {
    squareInitialState = {highlighted: false, missed: false, pressed: false};
    state = {
        userName: "",
        gameSettings: null,
        pickedMode: {
            field: 0,
            delay: 0
        },
        fieldSize: "",
        ...initialState
    };
    interval = 0;

    componentDidMount() {
     this.setState({gameSettings :  fetchGameSettings()})
    }

    getCountToSquare = () => {
        const count = this.state.pickedMode.field;
        return count * count
    };

    createGameMap = () => {
        this.setState({gameMap: Array(this.getCountToSquare()).fill(this.squareInitialState)})
    };

    pickGameMode = (event) => {
        const gameDifficulty = event.currentTarget.value;

        this.setState({
            pickedMode: this.state.gameSettings[`${gameDifficulty}Mode`],
            fieldSize: "game-board__size-" + gameDifficulty,
            isPlaying: false
        }, this.createGameMap);
    };

    highlightRandomSquare = () => {
        const count = this.getCountToSquare();
        const {highlightedIndexes, gameMap} = this.state;

        if (this.checkForWinner()) {
            return;
        }
        if (highlightedIndexes.length >= count) {
            this.clearInterval();
            return;
        }
        const max = count - 1;
        const randomIndex = getRandomNumberInRange(max, highlightedIndexes);
        const newMap = updateGameMap(gameMap, randomIndex, "highlighted", true);

        this.setState({gameMap: newMap, highlightedIndexes: [...highlightedIndexes, randomIndex]})
    };

    pressSquare = (index) => {
        const {pressedIndexes, gameMap} = this.state;
        const {highlighted, missed, pressed} = gameMap[index];

        if (highlighted && !missed && !pressed) {
            const newMap = updateGameMap(gameMap, index, "pressed", true);

            this.setState({gameMap: newMap, pressedIndexes: [...pressedIndexes, index]})
        }
    };

    missSquare = (index) => {
        const {missedIndexes, gameMap} = this.state;
        const {highlighted, missed, pressed} = gameMap[index];

        if (highlighted && !pressed && !missed) {
            const newMap = updateGameMap(gameMap, index, "missed", true);

            this.setState({gameMap: newMap, missedIndexes: [...missedIndexes, index]})
        }
    };

    clearInterval = () => {
        clearInterval(this.interval);
    };

    startGame = () => {
        this.interval = setInterval(this.highlightRandomSquare, this.state.pickedMode.delay);
        this.setState({isPlaying: true})
    };

    endGame = () => {
        this.clearInterval();
        this.setState({...initialState})
    };

    restartGame = () => {
        this.endGame();
        this.createGameMap();
        this.startGame();
    };

    checkForWinner = () => {
        const {userName, pressedIndexes, missedIndexes, isPlaying} = this.state;

        if (isPlaying) {
            const halfPoints = Math.ceil(this.getCountToSquare() / 2) - 1;
            const winner = pressedIndexes.length > halfPoints ? userName : missedIndexes.length >= halfPoints && "Computer";

            if (winner) {
                this.setState({winner, dateOfWin: moment().format('LLL')}, async () => {
                    this.clearInterval();
                    await this.sendWinnerInfo();
                });
            }
            return !!winner;
        }
    };

    sendWinnerInfo = async () => {
        const {winner, dateOfWin} = this.state;
        const winners = sendWinnerInfo(winner, dateOfWin);

        this.props.onSetWinners(winners);
    };

    changeUserNameState = (userName) => {
        this.setState({userName})
    };

    render() {
        const {fieldSize, pickedMode: {delay, field}, userName, pressedIndexes, missedIndexes, isPlaying, winner, gameMap} = this.state;
        const allowedToPlay = field > 0 && userName.length > 0;

        return (
            <div className="game-board">
                <div className="game-board__header-container">
                    <Mode isPlaying={isPlaying} onEndGame={this.endGame} onPickGameMode={this.pickGameMode}/>
                    {field > 0 &&
                    <Input isPlaying={isPlaying} onChangeUserNameState={this.changeUserNameState} userName={userName}/>}
                    <Button isPlaying={isPlaying} allowedToPlay={allowedToPlay} onRestartGame={this.restartGame}
                            onStartGame={this.startGame}/>
                </div>
                {winner && <p className="game-board__winner">{winner} won</p>}
                <CountSquares pressedIndexes={pressedIndexes} missedIndexes={missedIndexes}/>
                <div className={classNames(["game-board__field", fieldSize])}>
                    {gameMap.map((square, id) => <Square onPress={this.pressSquare}
                                                         onMiss={this.missSquare} delay={delay}
                                                         square={square}
                                                         key={id} index={id}/>)}
                </div>
            </div>
        );
    }
}

export default GameBoard;
