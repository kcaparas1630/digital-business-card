// Animation Map Configuration
export const ANIMATION_MAP = {
  idle1: "/character/Animation_Idle_02_withSkin_draco.glb",
  idle2: "/character/Animation_Idle_03_withSkin_draco.glb",
  walkingForward: "/character/Animation_Walking_withSkin_draco.glb",
  walkingBackward: "/character/Animation_Walk_Backward_inplace_withSkin_draco.glb",
  jump: "/character/Animation_Regular_Jump_withSkin_draco.glb",

} as const;

export type AnimationKey = keyof typeof ANIMATION_MAP;
