import React, { useRef, useState } from 'react'
import { Detailed, useGLTF, useMatcapTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from "three"

export const Notes = React.memo(({ index, z, speed }) => {
  const { nodes, materials } = useGLTF('models/notes-transformed.glb')
  const ref = useRef(null)
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 1.3),
    x: THREE.MathUtils.randFloatSpread(.7),
    spin: THREE.MathUtils.randFloat(500, 520),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  })
  useFrame((state, dt) => {
    if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
    ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 15) * Math.PI, (data.rZ += dt / data.spin))
    if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
  })
  const [texture] = useMatcapTexture('1B1B1B_999999_575757_747474')
  return (
    <group dispose={null} position={[0, 0, 3]}>
      <Detailed ref={ref} distances={[0, 5, 8]}>
        <mesh geometry={nodes.Note3.geometry} material={nodes.Note3.material} position={[27.528, 20.694, 3.118]}
          rotation={[-1.357, 0, 0]} scale={-0.019} >
          <meshMatcapMaterial matcap={texture} />
        </mesh>
      </Detailed>
    </group>
  )
})

useGLTF.preload('models/notes-transformed.glb') 