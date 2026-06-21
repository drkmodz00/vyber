import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function CarModel({ url }) {
  const { scene } = useGLTF(url)
  const ref = useRef()

  // Optional: subtle floating bob
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04
    }
  })

  return <primitive ref={ref} object={scene} scale={1} position={[0, -0.8, 0]} />
}