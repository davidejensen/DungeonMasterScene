import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  PointerEvents,
  PointerEventType,
  InputAction
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { Cube, Wall } from './components'
import { Crate, Door, Enemy } from './systems'

export function createWall(x: number, y: number, z: number, sx: number, sy: number, sz: number): Entity {
  const meshEntity = engine.addEntity()

  Wall.create(meshEntity)

  Transform.create(meshEntity, { position: {x,y,z} , scale: {x: sx,y: sy, z: sz}})
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)
  return meshEntity
}

export function createDoor(x: number, y: number, z: number, sx: number, sy: number, sz: number, doorName: string, spawnPosition: Vector3): Entity {
  const meshEntity = engine.addEntity()

  Door.create(meshEntity, {doorName: doorName, spawnPosition: spawnPosition})

  Transform.create(meshEntity, { position: {x,y,z} , scale: {x: sx,y: sy, z: sz}})
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)
  PointerEvents.create(meshEntity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'to travel to ' + doorName,
          maxDistance: 6,
          showFeedback: true
        }
      }
    ]
  })

  return meshEntity
}

export function createCrate(x: number, y: number, z: number, sx: number, sy: number, sz: number, crateName: string): Entity {
  const meshEntity = engine.addEntity()

  Crate.create(meshEntity, {crateName: crateName})

  Transform.create(meshEntity, { position: {x,y,z} , scale: {x: sx,y: sy, z: sz}})
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)
  
  PointerEvents.create(meshEntity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'to open ' + crateName,
          maxDistance: 6,
          showFeedback: true
        }
      }
    ]
  })

  return meshEntity
}

export function createEnemy(x: number, y: number, z: number, sx: number, sy: number, sz: number, enemyName: string): Entity {
  const meshEntity = engine.addEntity()

  Enemy.create(meshEntity, {enemyName: enemyName})

  Transform.create(meshEntity, { position: {x,y,z} , scale: {x: sx,y: sy, z: sz}})
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)
  
  PointerEvents.create(meshEntity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'to attack ' + enemyName,
          maxDistance: 6,
          showFeedback: true
        }
      }
    ]
  })

  return meshEntity
}

