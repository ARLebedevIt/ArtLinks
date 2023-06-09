import React, { useRef, useState } from 'react'
import { Detailed, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from "three"

export const Pen = React.memo(({ index, z, speed }) => {
  const { nodes, materials } = useGLTF('models/pen-transformed.glb')
  const ref = useRef(null)
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 1.3),
    x: THREE.MathUtils.randFloatSpread(.6),
    spin: THREE.MathUtils.randFloat(500, 520),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  })
  useFrame((state, dt) => {
    if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
    ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 15) * Math.PI, (data.rZ += dt / data.spin))
    if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
  })
  return (
    <group dispose={null} position={[0, 0, 3]}>
      <Detailed ref={ref} distances={[0, 6, 8]}>
        <group position={[-0.119, 1.3, 0.027]} rotation={[-0.11, -0.006, -0.834]} scale={16.112}>
          <mesh geometry={nodes.Cylinder005.geometry} material={materials['Material.005']} />
          <mesh geometry={nodes.Cylinder005_1.geometry} material={materials['Material.006']} />
          <mesh geometry={nodes.Cylinder005_2.geometry} material={materials['Material.007']} />
        </group>
      </Detailed>
    </group>
  )
})

useGLTF.preload('models/pen-transformed.glb')