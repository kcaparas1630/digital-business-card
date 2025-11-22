import { useMemo } from "react";
import { RigidBody } from "@react-three/rapier";

// Rocks with physics
const Rocks = ({ count = 30 }) => {
  const instances = useMemo(() => {
    const temp = [];
    const worldSize = 40;
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          // eslint-disable-next-line react-hooks/purity
          (Math.random() - 0.5) * worldSize * 2,
          -1.9,
          // eslint-disable-next-line react-hooks/purity
          (Math.random() - 0.5) * worldSize * 2
        ] as [number, number, number],
        // eslint-disable-next-line react-hooks/purity
        scale: 0.1 + Math.random() * 0.3,
        rotation: [
          // eslint-disable-next-line react-hooks/purity
          Math.random() * Math.PI,
          // eslint-disable-next-line react-hooks/purity
          Math.random() * Math.PI,
          // eslint-disable-next-line react-hooks/purity
          Math.random() * Math.PI
        ] as [number, number, number]
      });
    }
    return temp;
  }, [count]);
  
  return (
    <>
      {instances.map((instance, i) => (
        <RigidBody key={i} type="fixed" position={instance.position}>
          <mesh castShadow scale={instance.scale} rotation={instance.rotation}>
            <dodecahedronGeometry args={[1]} />
            <meshStandardMaterial color="#666" roughness={0.8} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
};

export default Rocks;
