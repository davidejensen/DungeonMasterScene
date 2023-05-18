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
import { Cube, Wall } from './components'
import { Crate, Door } from './systems'

export function createWall(x: number, y: number, z: number, sx: number, sy: number, sz: number): Entity {
  const meshEntity = engine.addEntity()

  Wall.create(meshEntity)

  Transform.create(meshEntity, { position: {x,y,z} , scale: {x: sx,y: sy, z: sz}})
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)
  return meshEntity
}

export function createDoor(x: number, y: number, z: number, sx: number, sy: number, sz: number, doorName: string): Entity {
  const meshEntity = engine.addEntity()

  Door.create(meshEntity, {doorName: doorName})

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

// Cube factory
export function createCube(x: number, y: number, z: number, spawner = true): Entity {
  const meshEntity = engine.addEntity()

  // Used to track the cubes
  Cube.create(meshEntity)

  Transform.create(meshEntity, { position: { x, y, z } })
  // set how the cube looks and collides
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)

  // if it is a spawner, then we set the pointer hover feedback
  if (spawner) {
    PointerEvents.create(meshEntity, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_DOWN,
          eventInfo: {
            button: InputAction.IA_PRIMARY,
            hoverText: 'Press E to spawn',
            maxDistance: 100,
            showFeedback: true
          }
        }
      ]
    })
  }

  return meshEntity
}
