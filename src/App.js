import { Suspense } from 'react'

import { PerspectiveCamera } from '@react-three/drei'

import { Canvas } from '@react-three/fiber'
import { Clone, OrbitControls, OrthographicCamera, ContactShadows } from '@react-three/drei'
import { Debug, Physics, usePlane } from '@react-three/cannon'
import useSpline from '@splinetool/r3f-spline'
import { useCompoundBody } from '@react-three/cannon'

import Scene from './Scene'
console.log("pkp:  ~ file: App.js:6 ~ Scene")

export default function App() {
  return (

    <Canvas shadows flat linear>
      <color attach="background" args={['#feeaea']} />
      <directionalLight intensity={0.7} position={[20, 30, 30]} />
      <OrthographicCamera makeDefault far={10000} near={0.1} zoom={1} position={[0, 100, 1000]} />
      <hemisphereLight intensity={0.75} color="#eaeaea" position={[0, 1, 0]} />

      <Scene />
      <Physics iterations={6} gravity={[0, -20, 0]}>
        <Debug scale={1.1}>

          <Little position={[125, 170, 0]} rotation={[-0.2, .2, .4]} />

          <Ground rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />

        </Debug>
      </Physics>
      <OrbitControls />
    </Canvas>

  )
}


function Little(props) {
  const { nodes } = useSpline('https://prod.spline.design/RlGf0SBK5pkSy-nY/scene.splinecode')
  console.log("pkp:  ~ file: App.js:33 ~ Little ~ nodes", nodes)
  const [little] = useCompoundBody(() => ({
    mass: 1,
    ...props,
    shapes: [
      { type: 'Sphere', args: [0.7], position: [0, -0.1, 0.1] },
      { type: 'Sphere', args: [0.2], position: [-0.1, 0.7, 0.2] },
      { type: 'Sphere', args: [0.2], position: [0, -0.5, -0.6] },
      { type: 'Sphere', args: [0.1], position: [-0.4, -0.9, 0.2] },
      { type: 'Sphere', args: [0.1], position: [0.2, -0.9, 0.5] },
    ],
  }))
  return <Clone ref={little} scale={1} position={[0, 0, 0]} object={nodes.Sphere} dispose={null} />
}

function Ground(props) {
  usePlane(() => ({ type: 'Static', ...props }))
  return <ContactShadows position={[0, -3, 0]} scale={200} blur={2} far={3} opacity={1} />
}