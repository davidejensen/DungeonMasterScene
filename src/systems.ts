import {
  engine,
  MeshRenderer,
  Transform,
  PointerEvents,
  InputAction,
  PointerEventType,
  Schemas,
  inputSystem
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { generateNewRoom } from './room_handler'
import { respawnPlayer } from './utils'

export const BounceScaling = engine.defineComponent('BounceScaling', { t: Schemas.Number })
export const Door = engine.defineComponent('Door', {t: Schemas.Number, doorName: Schemas.String, spawnPosition: Schemas.Vector3})
export const Crate = engine.defineComponent('Crate', {t: Schemas.Number, crateName: Schemas.String})
export const Enemy = engine.defineComponent('Enemy', {t: Schemas.Number, enemyName: Schemas.String})

export function doorSystem(){
  const entitiesWithDoor = engine.getEntitiesWith(MeshRenderer, Transform, Door)
  for (const [entity] of entitiesWithDoor) {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
      console.log(Door.getMutable(entity).doorName)
      generateNewRoom(Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5)
      respawnPlayer(Door.getMutable(entity).spawnPosition);
    }
  }
}

export function crateSystem(){
  const entitiesWithCrate = engine.getEntitiesWith(MeshRenderer, Transform, Crate)
  for (const [entity] of entitiesWithCrate) {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
      console.log(Crate.getMutable(entity).crateName)
      BounceScaling.createOrReplace(entity)
    }
  }
}

export function enemySystem(){
  const entitiesWithEnemy = engine.getEntitiesWith(MeshRenderer, Transform, Enemy)
  for (const [entity] of entitiesWithEnemy) {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
      console.log(Enemy.getMutable(entity).enemyName)
    }
  }
}

export function scaleToZeroSystem(dt: number) {
  const usedCrates = engine.getEntitiesWith(BounceScaling, Transform)
  for (const [entity] of usedCrates) {
    const m = BounceScaling.getMutable(entity)
    m.t += dt

    if (m.t > 1.7) {
      Transform.getMutable(entity).scale = Vector3.Zero()
      BounceScaling.deleteFrom(entity)
    } else {
      Transform.getMutable(entity).scale = {
        x: Transform.getMutable(entity).scale.x - 0.01, 
        y: Transform.getMutable(entity).scale.y - 0.01, 
        z: Transform.getMutable(entity).scale.z - 0.01}
    }
  }
}
