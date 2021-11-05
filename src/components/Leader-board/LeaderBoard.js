import React, {PureComponent} from 'react';
import "./LeaderBoard.scss";
import {getWinners} from "../../api/Api"

class LeaderBoard extends PureComponent {
    componentDidMount() {
        this.getWinnerList();
    }

    getWinnerList = () => {
        this.props.onSetWinners(getWinners())
    };

    render() {
        const {winners} = this.props;

        return ( <div className="leader-board">
        <h1 className="leader-board__title">
            Leader Board
        </h1>
        <ul className="leader-board__list">
            {winners.map(({winner, date, id}) => {
                return <li className="leader-board__item">
                    <div className="leader-board__winner-name">
                        {winner}
                    </div>
                    <div className="leader-board__time">
                        {date}
                    </div>
                </li>
            })}
        </ul>
    </div>) 
           
        
    }
}

export default LeaderBoard;

