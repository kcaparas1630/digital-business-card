import { Suspense, useRef } from "react";
import { Physics } from "@react-three/rapier";
import { Sky } from "@react-three/drei";
import { Group } from "three";
import Model from "../../models/character/Model";
import CameraController from "../../utils/CameraController";
import ProceduralTrees from "../../models/background/Trees";
import Grass from "../../models/background/Grass";
import Rocks from "../../models/background/Rocks";
import StylizedGround from "../../models/background/Ground";
import WorldBoundaries from "../../models/background/WorldBoundaries";
import Flowers from "../../models/background/Flowers";
import InteractiveButton from "../../models/interactive/InteractiveButton";
import { INTERACTIVE_BUTTONS } from "../../constants/interactiveButtons";

interface StartingPointSceneProps {
  joystickInput?: { x: number; y: number };
  jumpTrigger?: number;
}

const StartingPointScene = ({ joystickInput = { x: 0, y: 0 }, jumpTrigger = 0 }: StartingPointSceneProps) => {
  const modelRef = useRef<Group>(null);

  return (
    <>
      {/* Sky and atmosphere */}
      <Sky
        distance={450000}
        sunPosition={[5, 1, 8]}
        inclination={0}
        azimuth={0.25}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={["#e0f4ff", 20, 45]} />

      {/* Enhanced lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      <Physics gravity={[0, -9.81, 0]} colliders="hull" timeStep="vary">
        <Suspense fallback={null}>
          <Model
            ref={modelRef}
            joystickInput={joystickInput}
            jumpTrigger={jumpTrigger}
          />

          {/* Enhanced ground with shader */}
          <StylizedGround />
        </Suspense>

        {/* World boundaries - invisible walls */}
        <WorldBoundaries size={40} />

        {/* Procedurally generated trees */}
        <ProceduralTrees count={50} />

        {/* Rocks with physics */}
        <Rocks count={25} />

        {/* Interactive Buttons */}
        {INTERACTIVE_BUTTONS.map((button) => (
          <InteractiveButton
            key={button.id}
            label={button.label}
            position={button.position}
            color={button.color}
            url={button.url}
            downloadPath={button.downloadPath}
          />
        ))}
      </Physics>

      {/* Non-physics decorative elements */}
      <Grass count={600} worldSize={40} />
      <Flowers count={35} />

      <CameraController targetRef={modelRef} />
    </>
  );
};

export default StartingPointScene;
