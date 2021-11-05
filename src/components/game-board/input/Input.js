import React, {PureComponent} from "react";
import "./Input.scss";

class Input extends PureComponent {
    handleNameChange = (event) => {

        if (this.props.isPlaying) {
            return;
        }
        let userName = event.target.value;
        this.props.onChangeUserNameState(userName.trim())
    };

    render() {
        const {userName} = this.props;

        return (
            <input className="input"
            autoFocus
            onChange={this.handleNameChange}
            placeholder="Enter your name"
            value={userName}
             />
        );
    }
}

export default Input