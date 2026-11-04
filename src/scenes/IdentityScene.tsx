import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCcw, Compass, ArrowUpRight } from 'lucide-react';
import type { Scene3DSettings } from '../types/profile';
import { useSceneQuality } from '../hooks/useSceneQuality';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useSceneVisibility } from '../hooks/useSceneVisibility';
import { SPATIAL_NODES, type SpatialNodeDef } from './spatialNodes';

interface SpatialNodeWithMesh extends SpatialNodeDef {
  mesh?: THREE.Mesh;
  glowMesh?: THREE.Mesh;
}

interface IdentitySceneProps {
  settings?: Scene3DSettings;
  onNodeClick?: (nodeId: string) => void;
}

export const IdentityScene: React.FC<IdentitySceneProps> = ({ settings, onNodeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<SpatialNodeDef | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const quality = useSceneQuality(settings);
  const reducedMotion = useReducedMotion();
  const isVisible = useSceneVisibility(containerRef);

  // Shared node navigation trigger
  const navigateToNode = useCallback(
    (node: SpatialNodeDef) => {
      setActiveNode(node);
      setIsFocused(true);

      if (onNodeClick) {
        onNodeClick(node.id);
      }

      // Smooth scroll to target HTML section and update URL hash cleanly
      const targetElement = document.getElementById(node.targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        try {
          window.history.pushState(null, '', `#${node.targetId}`);
        } catch {
          // ignore
        }
      }
    },
    [onNodeClick]
  );

  const handleRecenter = useCallback(() => {
    setActiveNode(null);
    setIsFocused(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene & Camera
    const scene = new THREE.Scene();
    // Digital Observatory Atmospheric Fog (#07070D)
    scene.fog = new THREE.FogExp2(0x07070d, 0.06);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 8.8);

    // CRITICAL FIX: Safe WebGLRenderer instantiation directly on canvas
    // NEVER call canvas.getContext('webgl') beforehand!
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: quality.dpr <= 1.0,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('Three.js WebGLRenderer could not be initialized:', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(quality.dpr, quality.isMobile ? 1.0 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Master Rotation Group for interactive pointer tilt & orbit
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Nucleus — The Digital Observatory Core
    // Dual shell: Inner high-emissive faceted nucleus + outer translucent crystal cage
    const innerGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x6d28d9, // Deep Violet
      emissive: 0xa855f7, // Electric Violet glow
      emissiveIntensity: 0.75,
      roughness: 0.2,
      metalness: 0.85,
    });
    const nucleus = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(nucleus);

    // Translucent Shell
    const shellGeo = new THREE.IcosahedronGeometry(1.22, 2);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x10101a,
      roughness: 0.12,
      transmission: 0.72,
      thickness: 0.7,
      transparent: true,
      opacity: 0.68,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    masterGroup.add(shell);

    // Outer Faceted Wireframe Lattice (Cyan Accent)
    const wireGeo = new THREE.IcosahedronGeometry(1.26, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireframe);

    // 2. Concentric Orbital Rings
    const ringGroup = new THREE.Group();
    masterGroup.add(ringGroup);

    // Ring 1 (Inner Violet Ring)
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.018, 16, 96);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x6d28d9,
      emissive: 0xa855f7,
      emissiveIntensity: 0.5,
      roughness: 0.25,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.28;
    ringGroup.add(ring1);

    // Ring 2 (Middle Cyan Ring)
    const ring2Geo = new THREE.TorusGeometry(2.95, 0.016, 16, 96);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x0891b2,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.45,
      roughness: 0.25,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.24;
    ring2.rotation.z = Math.PI * 0.2;
    ringGroup.add(ring2);

    // Ring 3 (Equatorial Observatory Ring)
    const ring3Geo = new THREE.TorusGeometry(3.65, 0.014, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xaaa7bc,
      transparent: true,
      opacity: 0.35,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI * 0.48;
    ring3.rotation.z = -Math.PI * 0.1;
    ringGroup.add(ring3);

    // Ring 4 (Outer Network Ring)
    const ring4Geo = new THREE.TorusGeometry(4.15, 0.012, 16, 120);
    const ring4Mat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.25,
    });
    const ring4 = new THREE.Mesh(ring4Geo, ring4Mat);
    ring4.rotation.x = -Math.PI * 0.15;
    ring4.rotation.z = -Math.PI * 0.3;
    ringGroup.add(ring4);

    // 3. 7 Destination Nodes in 3D Space
    const nodeGroup = new THREE.Group();
    masterGroup.add(nodeGroup);

    const nodesWithMeshes: SpatialNodeWithMesh[] = SPATIAL_NODES.map((n) => ({ ...n }));

    nodesWithMeshes.forEach((node) => {
      // Core glowing sphere
      const sphereGeo = new THREE.SphereGeometry(0.13, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: node.threeColor,
        emissive: node.threeColor,
        emissiveIntensity: 0.85,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(sphereGeo, sphereMat);

      // Outer glow aura
      const glowGeo = new THREE.SphereGeometry(0.24, 12, 12);
      const glowMat = new THREE.MeshBasicMaterial({
        color: node.threeColor,
        transparent: true,
        opacity: 0.38,
        wireframe: true,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      nodeMesh.add(glowMesh);

      nodeMesh.userData = { nodeId: node.id };
      node.mesh = nodeMesh;
      node.glowMesh = glowMesh;
      nodeGroup.add(nodeMesh);
    });

    // Connector Lines from Nucleus (0,0,0) to each node
    const linesGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodesWithMeshes.length * 2 * 3);
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.25,
    });
    const connectorLines = new THREE.LineSegments(linesGeo, linesMat);
    masterGroup.add(connectorLines);

    // 4. Ambient Observatory Particle Field
    const particleCount = quality.particleCount;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const violetColor = new THREE.Color(0xa855f7);
    const cyanColor = new THREE.Color(0x22d3ee);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 1.9 + Math.random() * 3.4;

      particlePositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta) * 0.72; // slight flattening
      particlePositions[i * 3 + 2] = dist * Math.cos(phi);

      const mix = Math.random();
      const col = violetColor.clone().lerp(cyanColor, mix);
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: quality.isMobile ? 0.035 : 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // 5. Illumination
    const ambientLight = new THREE.AmbientLight(0x07070d, 1.6);
    scene.add(ambientLight);

    const electricVioletLight = new THREE.DirectionalLight(0xa855f7, 2.8);
    electricVioletLight.position.set(5, 6, 4);
    scene.add(electricVioletLight);

    const cyanPointLight = new THREE.PointLight(0x22d3ee, 3.2, 14);
    cyanPointLight.position.set(-4, -3, 3.5);
    scene.add(cyanPointLight);

    const nucleusPointLight = new THREE.PointLight(0x6d28d9, 2.2, 6);
    nucleusPointLight.position.set(0, 0, 0);
    scene.add(nucleusPointLight);

    // 6. Interactive Pointer Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerX = nx;
      pointerY = ny;
      targetRotationY = nx * 0.42;
      targetRotationX = -ny * 0.32;
    };

    const handlePointerLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // 7. Raycasting for Node Hover/Click
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseVector, camera);
      const meshes = nodesWithMeshes.map((n) => n.mesh).filter(Boolean) as THREE.Mesh[];
      const intersects = raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const matched = nodesWithMeshes.find(
          (n) => n.mesh === hit || n.mesh?.children.includes(hit) || n.mesh?.userData.nodeId === hit.userData.nodeId
        );
        if (matched) {
          navigateToNode(matched);
        }
      }
    };

    container.addEventListener('click', handleClick);

    // 8. Responsive Resize Observer
    const handleResize = () => {
      const newWidth = container.clientWidth || 480;
      const newHeight = container.clientHeight || 480;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const speedMultiplier = reducedMotion ? 0 : quality.orbitalSpeed;

      // Nucleus rotation
      nucleus.rotation.y += delta * 0.42 * speedMultiplier;
      nucleus.rotation.x += delta * 0.22 * speedMultiplier;

      shell.rotation.y -= delta * 0.28 * speedMultiplier;
      shell.rotation.z += delta * 0.16 * speedMultiplier;

      wireframe.rotation.y += delta * 0.32 * speedMultiplier;

      // Orbital rings rotation
      ring1.rotation.z += delta * 0.2 * speedMultiplier;
      ring2.rotation.z -= delta * 0.16 * speedMultiplier;
      ring3.rotation.z += delta * 0.11 * speedMultiplier;
      ring4.rotation.z -= delta * 0.08 * speedMultiplier;

      // Particles rotation
      particles.rotation.y += delta * 0.07 * speedMultiplier;

      // Update 7 orbital nodes positions
      const linePosAttr = linesGeo.attributes.position as THREE.BufferAttribute;
      const lineArray = linePosAttr.array as Float32Array;

      nodesWithMeshes.forEach((node, i) => {
        if (!node.mesh) return;

        const angle = elapsed * node.speed * speedMultiplier + node.phase;
        const baseOrbitX = Math.cos(angle) * node.radius;
        const baseOrbitY = Math.sin(angle) * node.radius;

        // Apply 3D plane tilt rotation
        const cosX = Math.cos(node.tiltX);
        const sinX = Math.sin(node.tiltX);
        const cosZ = Math.cos(node.tiltZ);
        const sinZ = Math.sin(node.tiltZ);

        const x1 = baseOrbitX * cosZ - baseOrbitY * sinZ;
        const y1 = baseOrbitX * sinZ + baseOrbitY * cosZ;
        const z1 = -y1 * sinX;
        const yFinal = y1 * cosX;

        node.mesh.position.set(x1, yFinal, z1);

        // Subtle glow pulse
        if (node.glowMesh) {
          const pulse = 1.0 + Math.sin(elapsed * 3.2 + i) * 0.2;
          node.glowMesh.scale.set(pulse, pulse, pulse);
        }

        // Update connector lines from nucleus to node
        lineArray[i * 6] = 0;
        lineArray[i * 6 + 1] = 0;
        lineArray[i * 6 + 2] = 0;
        lineArray[i * 6 + 3] = x1;
        lineArray[i * 6 + 4] = yFinal;
        lineArray[i * 6 + 5] = z1;
      });
      linePosAttr.needsUpdate = true;

      // Pointer rotation damping (smooth lerp)
      masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.06;
      masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.06;

      // Wave breathing motion
      masterGroup.position.y = Math.sin(elapsed * 1.3) * 0.11 * quality.motionMultiplier;

      // Raycast hover check on desktop
      if (!quality.isMobile && Math.abs(pointerX) > 0.01) {
        mouseVector.set(pointerX, pointerY);
        raycaster.setFromCamera(mouseVector, camera);
        const meshes = nodesWithMeshes.map((n) => n.mesh).filter(Boolean) as THREE.Mesh[];
        const intersects = raycaster.intersectObjects(meshes, true);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const matched = nodesWithMeshes.find(
            (n) => n.mesh === hit || n.mesh?.children.includes(hit) || n.mesh?.userData.nodeId === hit.userData.nodeId
          );
          if (matched && !isFocused) {
            setActiveNode(matched);
            container.style.cursor = 'pointer';
          }
        } else if (!isFocused) {
          setActiveNode(null);
          container.style.cursor = 'default';
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 10. Complete Resource Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('click', handleClick);

      // Geometries
      innerGeo.dispose();
      shellGeo.dispose();
      wireGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      ring4Geo.dispose();
      particleGeo.dispose();
      linesGeo.dispose();

      nodesWithMeshes.forEach((n) => {
        n.mesh?.geometry.dispose();
        n.glowMesh?.geometry.dispose();
      });

      // Materials
      innerMat.dispose();
      shellMat.dispose();
      wireMat.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();
      ring3Mat.dispose();
      ring4Mat.dispose();
      particleMat.dispose();
      linesMat.dispose();

      renderer.dispose();
    };
  }, [quality, reducedMotion, isVisible, navigateToNode, isFocused]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[430px] md:h-[490px] flex items-center justify-center select-none overflow-hidden touch-none"
      aria-label="Interactive 3D Digital Observatory Identity Core"
    >
      {/* Background ambient depth glow layers (Electric Violet & Cyan) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full bg-violet-600/15 blur-[100px] animate-pulse-glow" />
        <div className="w-[300px] h-[300px] rounded-full bg-cyan-400/15 blur-[85px] animate-pulse-glow [animation-delay:2.2s]" />
      </div>

      {/* Three.js WebGL Canvas */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full max-w-[540px] max-h-[540px]" />

      {/* Top Observatory Spatial HUD Bar */}
      <div className="absolute top-2 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface/90 border border-white/10 backdrop-blur-md text-[10px] font-mono text-signal-300">
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:12s]" />
          <span className="tracking-widest uppercase">SPATIAL OBSERVATORY // 7 NODES</span>
        </div>

        {isFocused && (
          <button
            onClick={handleRecenter}
            className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-raised/95 border border-violet-electric/40 hover:border-violet-electric text-[10px] font-mono text-violet-electric hover:text-white transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-electric"
            aria-label="Recenter 3D view"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Recenter View</span>
          </button>
        )}
      </div>

      {/* Bottom Interactive Node Status & Telemetry Readout */}
      <div className="absolute bottom-2 left-4 right-4 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <div className="pointer-events-auto max-w-md w-full px-3.5 py-2 rounded-xl bg-surface/90 border border-white/10 backdrop-blur-md shadow-glass-card text-center transition-all">
          {activeNode ? (
            <div className="flex items-center justify-between gap-3 text-left">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: activeNode.colorHex }}
                  />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-signal-100 truncate">
                    {activeNode.label}
                  </span>
                </div>
                <p className="text-[10px] text-signal-400 truncate mt-0.5">{activeNode.description}</p>
              </div>
              <button
                onClick={() => navigateToNode(activeNode)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-raised hover:bg-violet-deep border border-white/15 hover:border-violet-electric text-[10px] font-mono text-signal-100 transition-colors flex-shrink-0"
              >
                <span>Navigate</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-signal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>CLICK OR TAP 3D NODES TO NAVIGATE SPATIAL ENVIRONMENT</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentityScene;
