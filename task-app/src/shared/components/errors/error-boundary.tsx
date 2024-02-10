import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.reloadPage = this.reloadPage.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error capturado por el ErrorBoundary:', error, errorInfo);
  }

  reloadPage() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='main-error-page'>
          <h1 className='error-title'>
           opps!!
          </h1>
          <h2 className='error-subtitle'>¿Has intentado recargar la pagina?</h2>
          <button onClick={this.reloadPage}>Recargar</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
