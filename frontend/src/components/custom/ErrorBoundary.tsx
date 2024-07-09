import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Exclamation } from '../icons/Exclamation';
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }
  public render() {
    if (this.state.hasError) {
      return (<div className="relative items-center justify-center">
        <span className='flex justify-center'><Exclamation /></span>
        <h1 className="mt-8 text-3xl text-black font-bold">Oops, something went wrong!</h1>
      </div>);
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;