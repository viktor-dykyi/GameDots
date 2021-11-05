import React, {memo, useCallback, useEffect, useRef} from "react";
import "./Square.scss";
import classNames from "classnames";

const Square = ({square, index, onMiss, onPress, delay}) => {
    const {highlighted, pressed, missed} = square;
    const timeout = useRef(0);

    const handleMiss = useCallback(() => {
        onMiss(index);
    }, [onMiss, index]);

    const handlePress = useCallback(() => {
        clearTimeout(timeout.current);
        onPress(index);
    }, [onPress, index]);

    const getClassName = () => {
        const mainClassName = "square__";

        if (pressed) {
            return mainClassName + "pressed"
        }
        if (missed) {
            return mainClassName + "missed"
        }
        if (highlighted) {
            return mainClassName + "highlighted"
        }
    };

    useEffect(() => {
        if (highlighted) {
            timeout.current = setTimeout(handleMiss, delay)
        }
    }, [highlighted, delay, handleMiss]);

    return (
        <div onClick={handlePress} className={classNames(["square", getClassName()])}>
        </div>
    );
};

export default memo(Square);