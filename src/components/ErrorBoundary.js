import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    this.setState({ error: error.toString() });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundry">
          <div className="report-msg">
            Hi, sorry an error occurred. We'll check the logs and get a fix ASAP
            but it would be helpful if you could email a screenshot of this
            screen to team@ethicaltechnology.co and mention briefly what you
            were doing. Thanks for being a beta tester!
          </div>
          <div className="error">{this.state.error}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
