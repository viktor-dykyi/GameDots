import React, {PureComponent} from 'react';
import "./ErrorBoundary.scss"

class ErrorBoundary extends PureComponent {
    state={
        hasError: false,
        errorInfo: null
    };

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true, errorInfo})
    }

    render() {
        const {hasError, errorInfo} = this.state;

        if (hasError) {
            return <h1 className="error">Something went wrong in {errorInfo.componentStack} </h1>
        } else {
            return this.props.children
        }
    }
}

export default ErrorBoundary;