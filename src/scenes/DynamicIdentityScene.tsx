import React, { Suspense, lazy, useState, useEffect } from 'react';
import type { Scene3DSettings } from '../types/profile';
import { SceneFallback } from './SceneFallback';

const LazyIdentityScene = lazy(() => import('./IdentityScene'));

interface DynamicIdentitySceneProps {
  settings?: Scene3DSettings;
  onNodeClick?: (nodeId: string) => void;
}

export const DynamicIdentityScene: React.FC<DynamicIdentitySceneProps> = ({
  settings,
  onNodeClick,
}) => {
  const [hasWebGl, setHasWebGl] = useState<boolean | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        setHasWebGl(false);
        return;
      }
      // Check if WebGLRenderingContext exists in global window
      if (typeof window.WebGLRenderingContext === 'undefined') {
        setHasWebGl(false);
        return;
      }
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      setHasWebGl(!!gl);
    } catch {
      setHasWebGl(false);
    }
  }, []);

  // If user disabled 3D in Studio or WebGL is missing or fallback requested
  if (
    settings?.enabled === false ||
    settings?.showFallbackOnly === true ||
    hasWebGl === false ||
    hasError
  ) {
    return <SceneFallback interactive={false} />;
  }

  return (
    <ErrorBoundary onCatch={() => setHasError(true)} fallback={<SceneFallback />}>
      <Suspense fallback={<SceneFallback />}>
        <LazyIdentityScene settings={settings} onNodeClick={onNodeClick} />
      </Suspense>
    </ErrorBoundary>
  );
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode; onCatch?: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode; onCatch?: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('3D Identity Scene failed to render, falling back to CSS/SVG:', error);
    this.props.onCatch?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default DynamicIdentityScene;
