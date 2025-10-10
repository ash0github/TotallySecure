import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // updatew the state so the next render will show fallback ui
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // log
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p>Unable to load transaction history at this time.</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
