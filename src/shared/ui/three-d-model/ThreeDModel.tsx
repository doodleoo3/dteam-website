'use client'

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'

interface ModelProps {
    url: string;
    color?: THREE.Color | string | number;
}

const Model: React.FC<ModelProps> = ({ url, color }) => {
    const obj = useLoader(OBJLoader, url);
    const meshRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (obj) {
            obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    (child.material as THREE.MeshStandardMaterial).color = new THREE.Color(color || 0xff9417);
                    (child.material as THREE.MeshStandardMaterial).metalness = 0.5;
                    (child.material as THREE.MeshStandardMaterial).roughness = 0.5;
                }
            });
        }
    }, [obj, color]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
            meshRef.current.rotation.x += 0.002;
        }
    });

    return <primitive ref={meshRef} object={obj} scale={[5.5, 5.5, 5.5]} />;
};

interface ThreeDModelProps {
    url: string;
    color?: THREE.Color | string | number;
}

const ThreeDModel: React.FC<ThreeDModelProps> = ({ url, color }) => {
    return (
        <Canvas>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Model url={url} color={color} />
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
};

export default ThreeDModel;