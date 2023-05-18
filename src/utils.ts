import { engine, Transform } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { movePlayerTo } from "~system/RestrictedActions"

export function respawnPlayer(pos: Vector3)
{
    movePlayerTo({
        newRelativePosition: pos,
        cameraTarget: {x: 8, y: 0.88, z: 8}
    })
}

