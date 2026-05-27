// Allow importing plain CSS files as side-effects
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Register @react-three/fiber JSX intrinsic elements (points, lineSegments, etc.)
/// <reference types="@react-three/fiber" />
