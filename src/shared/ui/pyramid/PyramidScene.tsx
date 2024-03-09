'use client'

import {Canvas, useFrame} from '@react-three/fiber';
import React, {useMemo, useRef} from 'react';
import * as THREE from 'three';
const Pyramid: React.FC = () => {
    const edgesRef = useRef<THREE.LineSegments>(null!);

    useFrame(() => {
        edgesRef.current.rotation.x += 0.005;
        edgesRef.current.rotation.y += 0.005;
    });

    const edges = useMemo(() => {
        const geometry = new THREE.ConeGeometry(3, 3, 4);
        return new THREE.EdgesGeometry(geometry);
    }, []);

    return (
        <lineSegments ref={edgesRef} geometry={edges}>
            <lineBasicMaterial color={'white'}  attach="material" />
        </lineSegments>
    );
};

const PyramidScene: React.FC = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Pyramid />
        </Canvas>
    );
};

export default PyramidScene;