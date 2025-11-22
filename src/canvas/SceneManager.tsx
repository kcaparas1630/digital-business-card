import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouteContext } from "@tanstack/react-router";
import LoadingScene from "../scenes/loading-scene/LoadingScreen";
import StartingPointScene from "../scenes/introduction-scene/StartingPoint";
import styles from "./styles/CanvasStyles.module.css";
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { Volume2, VolumeX } from "lucide-react";
import MobileJoystick from "../controls/MobileJoystick";
import MobileJumpButton from "../controls/MobileJumpButton";

type SceneName = "loading" | "starting-point";

// SceneManager.tsx
const SceneManager: React.FC = () => {
  const routeContext = useRouteContext({ from: '/' });

  // Initialize with "loading" if not preloaded yet
  const [currentScene, setCurrentScene] = useState<SceneName>(
    routeContext?.preloaded ? "starting-point" : "loading"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [joystickInput, setJoystickInput] = useState({ x: 0, y: 0 });
  const [jumpTrigger, setJumpTrigger] = useState(0);

  const handleJoystickMove = useCallback((x: number, y: number) => {
    setJoystickInput({ x, y });
  }, []);

  const handleJump = useCallback(() => {
    setJumpTrigger((prev) => prev + 1);
  }, []);

  const { isMusicPlaying, toggleMusic } = useMusicPlayer(
    "/music/little-slimex27s-adventure-151007.mp3"
  );

  // Handle Scene Transition
  const transitionToScene = async (newScene: SceneName) => {
    setIsTransitioning(true);

    // Simulate transition delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    setCurrentScene(newScene);
    setIsTransitioning(false);
  };

  useEffect(() => {
    // When preloading completes, transition to starting-point
    if (routeContext?.preloaded && currentScene === "loading") {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => {
        transitionToScene("starting-point");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [routeContext?.preloaded, currentScene]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Orientation warning for mobile portrait mode */}
      <div className={styles["orientation-warning"]}>
        <h2>Please Rotate Your Device</h2>
        <p>This website is best viewed in landscape orientation.</p>
      </div>
      
      <div className={styles["styled-view"]}>
        {/* Only show music button after loading */}
        {currentScene !== "loading" && (
          <button
            onClick={toggleMusic}
            className={styles["sound-toggle"]}
            title={isMusicPlaying ? "Pause music" : "Play music"}
          >
            {isMusicPlaying ? (
              <Volume2 size={28} color="white" strokeWidth={2.5} />
            ) : (
              <VolumeX size={28} color="white" strokeWidth={2.5} />
            )}
          </button>
        )}
        
        <Canvas
          camera={{ position: [0, 1, 5], fov: 50, near: 0.1, far: 1000 }}
          shadows
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            {currentScene === "loading" ? (
              <LoadingScene
                onSceneChange={transitionToScene}
                isTransitioning={isTransitioning}
              />
            ) : (
              <StartingPointScene
                joystickInput={joystickInput}
                jumpTrigger={jumpTrigger}
              />
            )}
          </Suspense>
        </Canvas>
        
        {isTransitioning && (
          <div className={styles["scene-transition-overlay"]} />
        )}

        {/* Mobile controls - rendered outside Canvas as HTML overlays */}
        {currentScene === "starting-point" && (
          <>
            <MobileJoystick onJoystickMove={handleJoystickMove} />
            <MobileJumpButton onJump={handleJump} />
          </>
        )}
      </div>
    </div>
  );
};

export default SceneManager;
