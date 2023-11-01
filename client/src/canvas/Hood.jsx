import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Hood = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/hood_model.glb"); // Replace with the hood model

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal); // Replace with the hood full texture

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.Hood.geometry} // Replace with the hood geometry
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]} // Adjust position for the hood
            rotation={[0, 0, 0]} // Adjust rotation if needed
            scale={1} // Adjust scale if needed
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]} // Adjust position for the hood
            rotation={[0, 0, 0]} // Adjust rotation if needed
            scale={0.15} // Adjust scale if needed
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Hood;
