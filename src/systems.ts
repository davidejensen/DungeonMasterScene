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
import { createCube } from './factory'
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

/**
 * All cubes rotating behavior
 */
export function circularSystem(dt: number) {
  const entitiesWithMeshRenderer = engine.getEntitiesWith(MeshRenderer, Transform)
  for (const [entity, _meshRenderer, _transform] of entitiesWithMeshRenderer) {
    const mutableTransform = Transform.getMutable(entity)

    mutableTransform.rotation = Quaternion.multiply(
      mutableTransform.rotation,
      Quaternion.fromAngleAxis(dt * 10, Vector3.Up())
    )
  }
}

/**
 * The spawner system is listening for entities with hover feedback, when a input is emitted
 * just spawn a new cube randomly and animate the spawner with a bounce.
 */
export function spawnerSystem() {
  const clickedCubes = engine.getEntitiesWith(PointerEvents)
  for (const [entity] of clickedCubes) {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
      createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8, false)
      BounceScaling.createOrReplace(entity)
    }
  }
}

/**
 * Add this system and every entity with BounceScaling will bounce for 5 seconds
 * @param dt - detal time in seconds
 */
export function bounceScalingSystem(dt: number) {
  const clickedCubes = engine.getEntitiesWith(BounceScaling, Transform)
  for (const [entity] of clickedCubes) {
    const m = BounceScaling.getMutable(entity)
    m.t += dt

    if (m.t > 5) {
      Transform.getMutable(entity).scale = Vector3.One()
      BounceScaling.deleteFrom(entity)
    } else {
      const factor = 0.9 + 0.2 * Math.exp(-1.5 * m.t) * Math.sin(10 * m.t)
      Transform.getMutable(entity).scale = Vector3.scale(Vector3.One(), factor)
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
