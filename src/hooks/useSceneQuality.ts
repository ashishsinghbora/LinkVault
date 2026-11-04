import { useState, useEffect } from 'react';
import type { Scene3DSettings } from '../types/profile';

export interface SceneQualityMetrics {
  dpr: number;
  particleCount: number;
  targetFps: number;
  isMobile: boolean;
  enablePostProcessing: boolean;
  orbitalSpeed: number;
  motionMultiplier: number;
}

export function useSceneQuality(settings?: Scene3DSettings): SceneQualityMetrics {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const qualityPreference = settings?.quality || 'auto';
  const densityPreference = settings?.particleDensity || 'medium';
  const intensityPreference = settings?.motionIntensity || 'medium';

  // Cap DPR according to performance guidelines: max 1.0 on mobile, max 1.5 on desktop
  let dpr = 1.0;
  if (typeof window !== 'undefined') {
    const rawDpr = window.devicePixelRatio || 1;
    if (qualityPreference === 'performance' || isMobile) {
      dpr = Math.min(rawDpr, 1.0);
    } else if (qualityPreference === 'high') {
      dpr = Math.min(rawDpr, 1.5);
    } else {
      // 'auto'
      dpr = isMobile ? Math.min(rawDpr, 1.0) : Math.min(rawDpr, 1.5);
    }
  }

  // Particle count
  let particleCount = 200;
  if (densityPreference === 'low' || isMobile) {
    particleCount = 100;
  } else if (densityPreference === 'high') {
    particleCount = 350;
  }

  // Motion intensity multiplier
  let motionMultiplier = 1.0;
  if (intensityPreference === 'low') motionMultiplier = 0.5;
  if (intensityPreference === 'high') motionMultiplier = 1.5;

  const orbitalSpeed = (settings?.orbitalSpeed ?? 1.0) * motionMultiplier;

  return {
    dpr,
    particleCount,
    targetFps: 30,
    isMobile,
    enablePostProcessing: false, // Avoid heavy post-processing per requirements
    orbitalSpeed,
    motionMultiplier,
  };
}
