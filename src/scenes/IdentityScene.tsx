import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Scene3DSettings } from '../types/profile';
import { useSceneQuality } from '../hooks/useSceneQuality';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useSceneVisibility } from '../hooks/useSceneVisibility';

interface IdentitySceneProps {
  settings?: Scene3DSettings;
  onNodeClick?: (nodeId: string) => void;
}

interface OrbitalNodeData {
  id: string;
  label: string;
  color: number;
  radius: number;
  speed: number;
  phase: number;
  tiltX: number;
  tiltZ: number;
  mesh?: THREE.Mesh;
  glowMesh?: THREE.Mesh;
}

export const IdentityScene: React.FC<IdentitySceneProps> = ({ settings, onNodeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const quality = useSceneQuality(settings);
  const reducedMotion = useReducedMotion();
  const isVisible = useSceneVisibility(containerRef);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070d, 0.07);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: quality.dpr <= 1.0, // Only antialias on low DPR to optimize fill-rate
      powerPreference: 'high-performance',
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(quality.dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Master Rotation Group for interactive pointer tilt
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Nucleus & Core
    const nucleusGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x06a679,
      emissive: 0x06a679,
      emissiveIntensity: 0.7,
      roughness: 0.25,
      metalness: 0.8,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    masterGroup.add(nucleus);

    // Translucent Shell
    const shellGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b1018,
      roughness: 0.15,
      transmission: 0.75,
      thickness: 0.6,
      transparent: true,
      opacity: 0.65,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    masterGroup.add(shell);

    // Outer Geometric Wireframe Lattice
    const wireGeo = new THREE.IcosahedronGeometry(1.24, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireframe);

    // 2. Orbital Rings
    const ringGroup = new THREE.Group();
    masterGroup.add(ringGroup);

    // Ring 1 (Emerald Primary)
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.02, 16, 96);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x06a679,
      emissive: 0x00f59b,
      emissiveIntensity: 0.45,
      roughness: 0.3,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.32;
    ring1.rotation.y = Math.PI * 0.1;
    ringGroup.add(ring1);

    // Ring 2 (Violet Secondary)
    const ring2Geo = new THREE.TorusGeometry(3.05, 0.018, 16, 96);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x7c5cf5,
      emissive: 0xa78bfa,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.z = Math.PI * 0.18;
    ringGroup.add(ring2);

    // Ring 3 (Equatorial Tech Ring)
    const ring3Geo = new THREE.TorusGeometry(3.7, 0.012, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x5d7799,
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI * 0.52;
    ringGroup.add(ring3);

    // 3. Orbital Destination Nodes
    const nodes: OrbitalNodeData[] = [
      { id: 'github', label: 'GitHub', color: 0x00f59b, radius: 2.35, speed: 0.7, phase: 0.0, tiltX: Math.PI * 0.32, tiltZ: 0 },
      { id: 'projects', label: 'Projects', color: 0x06a679, radius: 2.35, speed: 0.7, phase: Math.PI, tiltX: Math.PI * 0.32, tiltZ: 0 },
      { id: 'linkedin', label: 'LinkedIn', color: 0xa78bfa, radius: 3.05, speed: -0.55, phase: 0.8, tiltX: -Math.PI * 0.28, tiltZ: Math.PI * 0.18 },
      { id: 'research', label: 'Research', color: 0x7c5cf5, radius: 3.05, speed: -0.55, phase: 0.8 + Math.PI, tiltX: -Math.PI * 0.28, tiltZ: Math.PI * 0.18 },
      { id: 'portfolio', label: 'Portfolio', color: 0x00e5ff, radius: 3.7, speed: 0.4, phase: 1.4, tiltX: Math.PI * 0.52, tiltZ: 0 },
      { id: 'youtube', label: 'YouTube', color: 0xf43f5e, radius: 3.7, speed: 0.4, phase: 1.4 + Math.PI, tiltX: Math.PI * 0.52, tiltZ: 0 },
    ];

    const nodeGroup = new THREE.Group();
    masterGroup.add(nodeGroup);

    nodes.forEach((node) => {
      // Core sphere
      const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(sphereGeo, sphereMat);

      // Glow halo
      const glowGeo = new THREE.SphereGeometry(0.22, 12, 12);
      const glowMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
        wireframe: true,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      nodeMesh.add(glowMesh);

      node.mesh = nodeMesh;
      node.glowMesh = glowMesh;
      nodeGroup.add(nodeMesh);
    });

    // Connector Lines from nucleus to nodes
    const linesGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodes.length * 2 * 3);
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x06a679,
      transparent: true,
      opacity: 0.22,
    });
    const connectorLines = new THREE.LineSegments(linesGeo, linesMat);
    masterGroup.add(connectorLines);

    // 4. Particle Constellation Field
    const particleCount = quality.particleCount;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const emeraldColor = new THREE.Color(0x06a679);
    const violetColor = new THREE.Color(0xa78bfa);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 1.8 + Math.random() * 3.2;

      particlePositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = (dist * Math.sin(phi) * Math.sin(theta)) * 0.7; // slight toroidal flattening
      particlePositions[i * 3 + 2] = dist * Math.cos(phi);

      const mixFactor = Math.random();
      const mixed = emeraldColor.clone().lerp(violetColor, mixFactor);
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
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
    const ambientLight = new THREE.AmbientLight(0x05070d, 1.4);
    scene.add(ambientLight);

    const emeraldLight = new THREE.DirectionalLight(0x06a679, 2.8);
    emeraldLight.position.set(5, 6, 4);
    scene.add(emeraldLight);

    const violetLight = new THREE.PointLight(0x7c5cf5, 3.2, 12);
    violetLight.position.set(-4, -3, 3);
    scene.add(violetLight);

    const coreLight = new THREE.PointLight(0x00f59b, 2.0, 6);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

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
      targetRotationY = nx * 0.45;
      targetRotationX = -ny * 0.35;
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
      if (!onNodeClick) return;
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseVector, camera);
      const meshes = nodes.map((n) => n.mesh).filter(Boolean) as THREE.Mesh[];
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const matched = nodes.find((n) => n.mesh === clickedMesh || n.mesh?.children.includes(clickedMesh));
        if (matched) {
          onNodeClick(matched.id);
        }
      }
    };

    container.addEventListener('click', handleClick);

    // 8. Resize Handler
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
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        // Paused when outside viewport or tab hidden to save battery & CPU
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous rotation (respects reduced-motion)
      const speedMultiplier = reducedMotion ? 0 : quality.orbitalSpeed;

      // Rotate nucleus & shells
      nucleus.rotation.y += delta * 0.4 * speedMultiplier;
      nucleus.rotation.x += delta * 0.2 * speedMultiplier;

      shell.rotation.y -= delta * 0.25 * speedMultiplier;
      shell.rotation.z += delta * 0.15 * speedMultiplier;

      wireframe.rotation.y += delta * 0.3 * speedMultiplier;

      // Rotate orbital rings
      ring1.rotation.z += delta * 0.2 * speedMultiplier;
      ring2.rotation.z -= delta * 0.15 * speedMultiplier;
      ring3.rotation.z += delta * 0.1 * speedMultiplier;

      // Rotate particle field
      particles.rotation.y += delta * 0.08 * speedMultiplier;

      // Update orbital destination nodes
      const linePosAttr = linesGeo.attributes.position as THREE.BufferAttribute;
      const lineArray = linePosAttr.array as Float32Array;

      nodes.forEach((node, i) => {
        if (!node.mesh) return;

        const angle = elapsed * node.speed * speedMultiplier + node.phase;
        // Compute 3D orbit on tilted ring plane
        const baseOrbitX = Math.cos(angle) * node.radius;
        const baseOrbitY = Math.sin(angle) * node.radius;

        // Apply plane tilt rotation
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
          const pulse = 1.0 + Math.sin(elapsed * 3 + i) * 0.18;
          node.glowMesh.scale.set(pulse, pulse, pulse);
        }

        // Update connector lines from nucleus (0,0,0) to node
        lineArray[i * 6] = 0;
        lineArray[i * 6 + 1] = 0;
        lineArray[i * 6 + 2] = 0;
        lineArray[i * 6 + 3] = x1;
        lineArray[i * 6 + 4] = yFinal;
        lineArray[i * 6 + 5] = z1;
      });
      linePosAttr.needsUpdate = true;

      // Smooth pointer lerp
      masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.06;
      masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.06;

      // Floating wave breathing motion
      masterGroup.position.y = Math.sin(elapsed * 1.2) * 0.12 * quality.motionMultiplier;

      // Raycast hover check on desktop
      if (!quality.isMobile && Math.abs(pointerX) > 0.01) {
        mouseVector.set(pointerX, pointerY);
        raycaster.setFromCamera(mouseVector, camera);
        const meshes = nodes.map((n) => n.mesh).filter(Boolean) as THREE.Mesh[];
        const intersects = raycaster.intersectObjects(meshes);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const matched = nodes.find((n) => n.mesh === hit || n.mesh?.children.includes(hit));
          setActiveNode(matched ? matched.label : null);
          container.style.cursor = 'pointer';
        } else {
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

      // Dispose geometries
      nucleusGeo.dispose();
      shellGeo.dispose();
      wireGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      particleGeo.dispose();
      linesGeo.dispose();

      nodes.forEach((n) => {
        n.mesh?.geometry.dispose();
        n.glowMesh?.geometry.dispose();
      });

      // Dispose materials
      nucleusMat.dispose();
      shellMat.dispose();
      wireMat.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();
      ring3Mat.dispose();
      particleMat.dispose();
      linesMat.dispose();

      // Dispose renderer
      renderer.dispose();
    };
  }, [quality, reducedMotion, isVisible, onNodeClick]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] flex items-center justify-center select-none overflow-hidden touch-none"
    >
      {/* Background ambient depth glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] rounded-full bg-emerald-500/15 blur-[90px] animate-pulse-glow" />
        <div className="w-[300px] h-[300px] rounded-full bg-violet-600/15 blur-[80px] animate-pulse-glow [animation-delay:2s]" />
      </div>

      {/* Three.js WebGL Canvas */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full max-w-[520px] max-h-[520px]" />

      {/* Interactive Node Hover Tooltip / Status Badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.2 rounded-full bg-surface/85 border border-white/10 backdrop-blur-md text-[10px] font-mono shadow-glass-card">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow animate-pulse" />
        <span className="text-signal-300">
          {activeNode ? (
            <span className="text-emerald-glow font-bold">DESTINATION // {activeNode.toUpperCase()}</span>
          ) : (
            '3D IDENTITY CORE // ACTIVE'
          )}
        </span>
      </div>
    </div>
  );
};

export default IdentityScene;
