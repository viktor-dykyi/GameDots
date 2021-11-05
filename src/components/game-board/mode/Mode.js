import React, {PureComponent} from "react";
import "./Mode.scss"

class Mode extends PureComponent {
    handleModeChange = (event) => {
        this.props.isPlaying && this.props.onEndGame();
        this.props.onPickGameMode(event)
    };

    render() {
        return(
            <div className="mode">
                <select className="mode__options-container"
                    defaultValue={"default"}
                    onChange={this.handleModeChange}>
                    <option value="default" disabled> Pick game mode</option>
                    <option value="easy" className="mode__option">easy</option>
                    <option value="normal" className="mode__option">normal</option>
                    <option value="hard" className="mode__option">hard</option>
                </select>
            </div>
        );
    }
}

export default Mode;