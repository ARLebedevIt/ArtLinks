import { extend, useFrame, useLoader, useThree } from "@react-three/fiber"
import React, { useMemo, useRef } from "react"
import * as THREE from 'three'
import { Water } from 'three-stdlib'

extend({ Water })

export const Ocean = React.memo(({ deviceWidth }) => {
  const ref = useRef(null)
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, 'img/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(100, 100), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(3, 0, 25),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 1.3,
      fog: true,
      format: gl.encoding
    }),
    [waterNormals]
  )
  const v = new THREE.Vector3()
  useFrame((state, delta) => {
    ref.current.material.uniforms.time.value += delta / 5
    if (deviceWidth > 1500) state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.02)
  })
  return <water ref={ref} args={[geom, config]} position-y={-1} rotation-x={-Math.PI / 2} />
})