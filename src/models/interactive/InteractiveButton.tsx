import { useRef, useState } from "react";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface InteractiveButtonProps {
  label: string;
  position: [number, number, number];
  color: {
    primary: string;
    secondary: string;
    border: string;
    borderDark: string;
  };
  url?: string;
  downloadPath?: string;
  onActivate?: () => void;
}

const InteractiveButton = ({
  label,
  position,
  color,
  url,
  downloadPath,
  onActivate
}: InteractiveButtonProps) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const buttonGroupRef = useRef<THREE.Group>(null);
  const isActivatedRef = useRef(false);

  useFrame(() => {
    if (buttonGroupRef.current) {
      // Gentle floating animation
      buttonGroupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.05;

      // Rotate slightly when hovered
      if (hovered) {
        buttonGroupRef.current.rotation.y += 0.02;
      }
    }
  });

  const handleCollisionEnter = () => {
    // Prevent multiple activations
    if (isActivatedRef.current) return;
    isActivatedRef.current = true;

    setIsPressed(true);
    setHovered(true);

    // Create fade overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: black;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(overlay);

    // Trigger fade in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    // Navigate after fade completes
    setTimeout(() => {
      if (onActivate) {
        onActivate();
      } else if (downloadPath) {
        // Handle file download
        const link = document.createElement('a');
        link.href = downloadPath;
        link.download = downloadPath.split('/').pop() || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (url) {
        window.open(url, '_blank');
      }

      // Fade out and cleanup
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(overlay);
          setIsPressed(false);
          isActivatedRef.current = false;
        }, 500);
      }, 100);
    }, 500);
  };

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="fixed"
      position={position}
      sensor
      onIntersectionEnter={handleCollisionEnter}
      onIntersectionExit={() => setHovered(false)}
    >
      <group ref={buttonGroupRef}>
        {/* Outer border/frame */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[3.2, 1.2, 0.3]} />
          <meshStandardMaterial
            color={color.border}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        {/* Bottom shadow layer */}
        <mesh position={[0, -0.08, -0.05]} castShadow>
          <boxGeometry args={[3.1, 1.1, 0.25]} />
          <meshStandardMaterial
            color={color.borderDark}
            metalness={0.2}
            roughness={0.6}
          />
        </mesh>

        {/* Main button */}
        <mesh
          position={[0, isPressed ? -0.05 : 0, 0.1]}
          castShadow
        >
          <boxGeometry args={[2.8, 0.9, 0.2]} />
          <meshStandardMaterial
            color={isPressed ? color.secondary : color.primary}
            metalness={0.4}
            roughness={0.3}
            emissive={hovered ? color.primary : color.secondary}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>

        {/* Shine/highlight on top of button */}
        <mesh position={[0, 0.3, 0.15]} castShadow>
          <boxGeometry args={[2.5, 0.15, 0.15]} />
          <meshStandardMaterial
            color="#fef3c7"
            transparent
            opacity={0.6}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Text */}
        <Text
          position={[0, isPressed ? -0.05 : 0, 0.25]}
          font="/fonts/wheaton capitals.otf"
          fontSize={0.35}
          letterSpacing={0.05}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#1f2937"
        >
          {label}
        </Text>

        {/* Glow effect when hovered */}
        {hovered && (
          <pointLight
            position={[0, 0, 0.5]}
            intensity={0.5}
            distance={3}
            color={color.primary}
          />
        )}
      </group>
    </RigidBody>
  );
};

export default InteractiveButton;
