import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';

function PlasmaField() {
    const meshRef = useRef<THREE.Mesh>(null);
    const mousePos = useRef(new THREE.Vector2(0, 0));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current.set(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            meshRef.current.rotation.x = mousePos.current.y * 0.1 + Math.sin(time * 0.2) * 0.05;
            meshRef.current.rotation.y = mousePos.current.x * 0.1 + Math.cos(time * 0.3) * 0.05;

            // Subtle pulsing scale
            const pulse = 1 + Math.sin(time * 0.5) * 0.02;
            meshRef.current.scale.set(pulse, pulse, pulse);
        }
    });

    return (
        <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshStandardMaterial
                    color="#b02d29"
                    emissive="#ec6a06"
                    emissiveIntensity={0.3}
                    wireframe={true}
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </Float>
    );
}

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate random particles
    const particleCount = 200;
    const [{ positions, colors }] = useState(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

        // Mix of red and orange particles
        const isRed = Math.random() > 0.5;
        colors[i * 3] = isRed ? 0.69 : 0.92;     // R
        colors[i * 3 + 1] = isRed ? 0.18 : 0.42;   // G
        colors[i * 3 + 2] = isRed ? 0.16 : 0.02;   // B
    }

    return { positions, colors };
    });

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0005;
            pointsRef.current.rotation.x += 0.0002;

            const time = state.clock.getElapsedTime();
            const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3 + 1] += Math.sin(time + i) * 0.002;
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                sizeAttenuation
            />
        </points>
    );
}

function GlowOrbs() {
    const orb1Ref = useRef<THREE.Mesh>(null);
    const orb2Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (orb1Ref.current) {
            orb1Ref.current.position.x = Math.sin(time * 0.3) * 3;
            orb1Ref.current.position.y = Math.cos(time * 0.2) * 2;
        }

        if (orb2Ref.current) {
            orb2Ref.current.position.x = Math.cos(time * 0.4) * 4;
            orb2Ref.current.position.y = Math.sin(time * 0.3) * 1.5;
        }
    });

    return (
        <>
            <mesh ref={orb1Ref}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshBasicMaterial color="#b02d29" transparent opacity={0.1} />
            </mesh>
            <mesh ref={orb2Ref}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial color="#ec6a06" transparent opacity={0.08} />
            </mesh>
        </>
    );
}

export default function WebGLBackground() {
    return (
        <div id="webgl-canvas">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} color="#ec6a06" intensity={0.5} />
                <pointLight position={[-10, -10, -10]} color="#b02d29" intensity={0.3} />

                <PlasmaField />
                <ParticleField />
                <GlowOrbs />
            </Canvas>
        </div>
    );
}
