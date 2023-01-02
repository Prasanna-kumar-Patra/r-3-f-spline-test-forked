import { Suspense, useState, useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
// import { useBox, useRaycastVehicle } from '@react-three/cannon'


import { Canvas, useFrame } from '@react-three/fiber'
import { Clone, OrbitControls, OrthographicCamera, ContactShadows } from '@react-three/drei'
import { Debug, Physics, usePlane } from '@react-three/cannon'
import useSpline from '@splinetool/r3f-spline'
import { useCompoundBody, useBox } from '@react-three/cannon'

import Scene from './Scene'
console.log("pkp:  ~ file: App.js:6 ~ Scene")

export default function App() {
  const [invertGravity, setInvertGravity] = useState(true)

  const sphere1 = useRef();
  console.log("pkp:  ~ file: App.js:19 ~ App ~ sphere1", sphere1)

  function onLoad(splineApp) {
    console.log("pkp:  ~ file: App.js:22 ~ onLoad ~ splineApp", splineApp)
    // save the app in a ref for later use
    // spline.current = splineApp;
  }

  function onClickGroup(ref) {
    console.log("pkp:  ~ file: App.js:28 ~ onClickGroup ~ ref", ref)

    setInvertGravity(!invertGravity)

    // sphere1.current = ref
    // sphere1.current.x = 0

    // sphere1.current.object.position.x += 10;

    // chassisApi.position.set(...position)
    // sphere1.current.position.x += 10;
    // sphere1.current.position
    // chassisApi.velocity.set(0, 0, 0)
    // chassisApi.angularVelocity.set(...angularVelocity)
    // chassisApi.rotation.set(...rotation)
    console.log("pkp:  ~ file: App.js:41 ~ onClickGroup ~ sphere1.current.position", sphere1.current)
  }

  function Little(props) {
    // console.log("pkp:  ~ file: App.js:42 ~ Little ~ props", props)
    const { nodes } = useSpline('https://prod.spline.design/RlGf0SBK5pkSy-nY/scene.splinecode')
    // console.log("pkp:  ~ file: App.js:33 ~ Little ~ nodes", nodes)
    useFrame(() => {
      console.log("pkp:  ~ file: App.js:20 ~ useFrame ~ useFrame")
      // little
    })

    const [little] = useCompoundBody(() => ({
      mass: 1,
      ...props,
      shapes: [
        { type: 'Sphere', args: [0.7], position: [0, -0.1, 0.1] },

      ],
    }))

    return <Clone
      onPointerDown={onClickGroup}
      ref={little}
      scale={1} position={[0, 0, 0]} object={nodes.Sphere} dispose={null} />
  }

  return (
    <Canvas shadows flat linear>
      <color attach="background" args={['#feeaea']} />
      <directionalLight intensity={0.7} position={[20, 30, 30]} />
      <OrthographicCamera makeDefault far={10000} near={0.1} zoom={1} position={[0, 100, 1000]} />
      <hemisphereLight intensity={0.75} color="#eaeaea" position={[0, 1, 0]} />
      <Scene />
      <Physics gravity={[0, invertGravity ? 5 : -10, 0]}>
        <Debug scale={1.1}>
          <group>
            <Little position={[125, 170, 0]} rotation={[-0.2, .2, .4]} />
            <Ground rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
          </group>
        </Debug>
      </Physics>
      <OrbitControls />
    </Canvas>
  )
}


function Ground(props) {
  usePlane(() => ({ type: 'Static', ...props }))
  return <ContactShadows position={[0, -3, 0]} scale={200} blur={2} far={3} opacity={1} />
}