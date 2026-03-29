"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GlassLensObject() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.15;

      // Gentle floating
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  useGSAP(() => {
    if (!meshRef.current) return;

    // Map the rotation of the lens directly to the scrollbar for visceral physical connection
    gsap.to(meshRef.current.rotation, {
      z: Math.PI * 2,
      x: Math.PI,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });

    // Make it zoom in and distort intensely on specific narrative points
    gsap.to(meshRef.current.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      scrollTrigger: {
        trigger: "#act2",
        start: "top bottom",
        end: "top top",
        scrub: true
      }
    });

  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* A complex torusknot creates beautiful refractions mimicking a complex camera lens element */}
      <torusKnotGeometry args={[1.5, 0.4, 256, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={2}
        chromaticAberration={1}
        anisotropy={0.5}
        distortion={0.5}
        distortionScale={0.3}
        temporalDistortion={0.1}
        iridescence={1}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[100, 400]}
        clearcoat={1}
        color="#ffffff"
      />
    </mesh>
  );
}

export default function AtmosphereBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-[-50] pointer-events-none bg-black">
      {/* Pure black base, glowing red/white ambient light bleed behind canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#FF2A00] opacity-10 blur-[150px] rounded-full"></div>

      <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#FF2A00" />

        <GlassLensObject />
        <Sparkles count={50} scale={10} size={4} speed={0.2} opacity={0.2} color="#FF2A00" />

        {/* We use an environment map so the glass has something to reflect and refract */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
