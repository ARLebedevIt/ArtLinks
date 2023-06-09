import { Canvas } from '@react-three/fiber'
import { Cloud, Html } from '@react-three/drei'
import './App.css'
import { Pen } from './components/Pen/Pen'
import { Notes } from './components/Notes/Notes'
import { Ocean } from './components/Ocean/Ocean'
import React from 'react'

const deviceWidth = window.innerWidth
const App = React.memo(({ speed = 0.1,
  count = deviceWidth < 1200 ? 50 : 40, depth = 16, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) => {
  return (
    <>
      {deviceWidth < 1025 && <div className='wrapperMobile'></div>}
      <Canvas id='canvasWrapped' gl={{ antialias: false, powerPreference: "high-performance", }}
        dpr={[1, 1.5]} camera={{
          position: [0, 0, 10],
          fov: deviceWidth > 650 ? 20 : 30, near: 0.01, far: depth + 20
        }}>
        <color attach="background" args={['rgb(3, 3, 3)']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[-10, 20, 5]} shadow-mapSize={[256, 256]} shadow-bias={-0.0001} castShadow>
          <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
        </directionalLight>
        <Html center>
          <div className='links'>
            <a href='https://www.youtube.com/@LebedevComposer' target='_blank'>YouTube</a>
            <a href='https://www.artstation.com/a_l_l_l' target='_blank'>ArtStation</a>
          </div>
        </Html>
        {Array.from({ length: count }, (_, i) => <Notes key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} />)}
        {Array.from({ length: count }, (_, i) => <Pen key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} />)}
        <Ocean deviceWidth={deviceWidth} />
        <Cloud segments={55} width={10} position={[8, 0, -36]} speed={0.08} opacity={.11} />
        <Cloud segments={55} width={10} position={[-7, 0, -36]} speed={.08} opacity={.11} />
        <Cloud segments={50} width={10} position={[0, 2, deviceWidth > 650 ? -20 : -15]} speed={0.1} opacity={.3} />
      </Canvas>
    </>
  )
})

export default App