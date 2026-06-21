import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import CarModel from './CarModel'

export default function CarScene({ modelUrl }) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 4.5], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-4, 2, -3]} intensity={0.6} color="#0077ff" />
      <pointLight position={[4, 1, 3]}  intensity={0.4} color="#00d4ff" />

      {/* Car */}
      <CarModel url={modelUrl} />

      {/* Floor shadow */}
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.5}
        scale={8}
        blur={2}
        far={4}
      />

      {/* HDR environment for reflections */}
      <Environment preset="city" />

      {/* Drag to rotate + scroll to zoom */}
      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  )
}