"use client";

import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-destructive mb-2">
            Something went wrong
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <Button onClick={this.handleReset} size="sm" variant="outline">
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
