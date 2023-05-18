import {
  engine,
  executeTask,
  Transform,
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Cube } from './components'
import { createCube } from './factory'
import { message_types } from './message_types'
import { generateNewRoom } from './room_handler'

let currentTextString: string;

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: 700,
      height: 100,
      margin: '16px 0 8px 270px',
      padding: 4,
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
    >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
    >
      <Input
        onChange={(e) =>{ currentTextString = e }}
        fontSize={12}
        placeholder={"type something"}
        placeholderColor={Color4.Gray()}
      />
      <Button
        onMouseDown={()=>{sendPrompt()}}
        uiTransform={{ width: 120, height: 40, margin: 8 }}
        value='Send'
        variant='primary'
        fontSize={14}
      />
      <Button
        onMouseDown={()=>{generateNewRoom(Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5)}}
        uiTransform={{ width: 80, height: 20, margin: 4 }}
        value='New room'
        variant='primary'
        fontSize={8}
      />
     </UiEntity>
  </UiEntity>
)

let promptedText: string = "Welcome to the dungeon";

const uiComponentCharacterSelection = () => (
  <UiEntity
    uiTransform={{
      width: 600,
      height: 300,
      position: 100,
      flexDirection: 'column',
      margin: '16px 0 8px 270px',
      padding: 4,
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
    >
    <UiEntity
      uiTransform={{
        width: '600',
        height: '30%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
    >
      <Label
        fontSize={12}
        color={ Color4.fromHexString("#ffffffff") }
        value = {"\n\n\n\n\n\n\n" + promptedText + "\n\n\nPick your character \n"}
      />
     </UiEntity>

    <UiEntity
      uiTransform={{
        width: '600',
        height: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
    >
      <Button
        onMouseDown={()=>{pickCharacter("warrior")}}
        uiTransform={{ width: 200, height: 100, margin: 4 }}
        value='Warrior'
        variant='primary'
        fontSize={15}
      />      
      <Button
        onMouseDown={()=>{pickCharacter("mage")}}
        uiTransform={{ width: 200, height: 100, margin: 4 }}
        value='Mage'
        variant='primary'
        fontSize={15}
      />      
      <Button
        onMouseDown={()=>{pickCharacter("rogue")}}
        uiTransform={{ width: 200, height: 100, margin: 4 }}
        value='Rogue'
        variant='primary'
        fontSize={15}
      />
     </UiEntity>
  </UiEntity>
)

function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}

function sendPrompt()
{
  console.log(currentTextString)
}

function pickCharacter(characterType: string)
{
  console.log(characterType);
  setupUi();
}

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

export function setupCharacerSelectionUi() {
  ReactEcsRenderer.setUiRenderer(uiComponentCharacterSelection)
}
