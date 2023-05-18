import { Transform } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { westDoor, eastDoor, northDoor, southDoor } from ".";

const normalScaleNorthSouth = Vector3.create(1.5,2.5,1)
const normalScaleEastWest = Vector3.create(1,2.5,1.5)

export function generateNewRoom(north: boolean, south: boolean, east: boolean, west: boolean): void
{
    if(north)
        Transform.getMutable(northDoor).scale = normalScaleNorthSouth
    else
        Transform.getMutable(northDoor).scale = Vector3.Zero()

    if(south)
        Transform.getMutable(southDoor).scale = normalScaleNorthSouth
    else
        Transform.getMutable(southDoor).scale = Vector3.Zero()

    if(east)
        Transform.getMutable(eastDoor).scale = normalScaleEastWest
    else
        Transform.getMutable(eastDoor).scale = Vector3.Zero()
    
    if(west)
        Transform.getMutable(westDoor).scale = normalScaleEastWest
    else
        Transform.getMutable(westDoor).scale = Vector3.Zero()
}

export function generateNewChest()
{
    
}

export function generateNewEnemy()
{
    
}