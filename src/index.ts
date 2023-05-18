import { engine, Entity, executeTask, Material, Transform } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'

import { createCrate, createDoor, createEnemy, createWall } from './factory'
import { crateSystem, doorSystem, enemySystem, scaleToZeroSystem } from './systems'

import { setupCharacerSelectionUi, setupUi } from './ui'
import { sendInitialPrompt } from './apiModules/gpt_api_character_creation_module'

// export all the functions required to make the scene work
export * from '@dcl/sdk'

export let eastDoor: Entity;
export let northDoor: Entity;
export let westDoor: Entity;
export let southDoor: Entity;
export let crate: Entity;

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(doorSystem)
engine.addSystem(crateSystem)
engine.addSystem(enemySystem)
engine.addSystem(scaleToZeroSystem)

// Initial function executed when scene is evaluated and after systems are created
executeTask(async function () {
  sendInitialPrompt();
  const wall1 = createWall(15.5, 2.5, 7.5, 1,5,15);
  const wall2 = createWall(7.5, 2.5, 15.5, 15,5,1);
  const wall3 = createWall(0.5, 2.5, 7.5, 1,5,15);
  const wall4 = createWall(7.5, 2.5, 0.5, 15,5,1);

  eastDoor = createDoor(15, 1.25, 7.5, 1,2.5,1.5, 'East Room', {x:1.5,y:1.25,z:7});
  northDoor = createDoor(7.5, 1.25, 15, 1.5,2.5,1, 'North Room', {x:7,y:1.25,z:1.6});
  westDoor = createDoor(1, 1.25, 7.5, 1,2.5,1.5, 'West Room', {x:14.5,y:1.25,z:7});
  southDoor = createDoor(7.5, 1.25, 1, 1.5,2.5,1, 'South Room', {x:7,y:1.25,z:14.5});
  Material.setPbrMaterial(eastDoor, { albedoColor: Color4.create(1.0, 0, 0) })
  Material.setPbrMaterial(northDoor, { albedoColor: Color4.create(1.0, 0, 0) })
  Material.setPbrMaterial(westDoor, { albedoColor: Color4.create(1.0, 0, 0) })
  Material.setPbrMaterial(southDoor, { albedoColor: Color4.create(1.0, 0, 0) })

  crate = createCrate(8, 0.25, 8, 0.75,0.5,0.5, 'Crate')
  Material.setPbrMaterial(crate, { albedoColor: Color4.create(1.0, 1.0, 0) })

  const enemy = createEnemy(10,1,6, 1,2,1, 'Skeleton')
  Material.setPbrMaterial(enemy, { albedoColor: Color4.create(0, 1.0, 1.0) })
})

