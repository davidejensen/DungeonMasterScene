import { engine, Transform } from "@dcl/sdk/ecs"
import { Quaternion } from "@dcl/sdk/math"

export function respawnPlayer()
{
    const playerTransform = Transform.getMutable(engine.PlayerEntity)
    playerTransform.position = {x: 1.5, y: 0.88, z: 1.5}

    const cameraRotation = Transform.getMutable(engine.CameraEntity)
    cameraRotation.rotation = Quaternion.Zero()
    
}