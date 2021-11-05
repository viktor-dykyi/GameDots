import React, {PureComponent} from "react";
import "./CountSquares.scss";

class CountSquares extends PureComponent {
    render() {
        const {pressedIndexes, missedIndexes} = this.props;

        return (<div className="count__container-counts">
            <span className="count__pressed-squares"> {pressedIndexes.length} - pressed</span>
            <span className="count__missed-squares">{missedIndexes.length} - missed</span>
            </div>
        );
    }
}

export default CountSquares;