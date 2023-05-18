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
      width: 400,
      height: 230,
      //  { top: 16, right: 0, bottom: 8 left: 270 },
      margin: '16px 0 8px 270px',
      // { top: 4, bottom: 4, left: 4, right: 4 },
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
        onChange={(e) =>{ currentTextString = "you wrote: " + e }}
        fontSize={35}
        placeholder={"type something"}
        placeholderColor={Color4.Gray()}
      />
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 50,
          margin: '8px 0'
        }}
        uiBackground={{
          textureMode: 'center',
          texture: {
            src: 'images/scene-thumbnail.png',
          },
        }}
        uiText={{ value: 'DungeonMaster', fontSize: 18 }}
      />
      <Label
      onMouseDown={()=>{generateNewRoom(Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5)}}
        value={`Player: ${getPlayerPosition()}`}
        fontSize={18}
        uiTransform={{ width: '100%', height: 30 } }
      />
      <Button
        onMouseDown={()=>{generateNewRoom(Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5)}}
        uiTransform={{ width: 120, height: 40, margin: 8 }}
        value='New room'
        variant='primary'
        fontSize={14}
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

async function testRequest(){
  try {
    let response = await fetch('https://events.decentraland.org/api/events')
    let json = await response.json()
    console.log(json.data[0].id)
  } catch {
    console.log("failed to reach URL")
  }

  let newTodo = Object.assign(new message_types.MessageSent(), `{"actionType":"${message_types.ActionType.CHARACTER}","content":"asdasdasd"}`);
  let messageSent = new message_types.MessageSent();
  messageSent.actionType = message_types.ActionType.CHARACTER;
  messageSent.content = "testtest";
  
  console.log(JSON.stringify(messageSent));
  console.log(newTodo.actionType);
  console.log(newTodo.content);
  
  console.log(JSON.parse(JSON.stringify(`{"actionType":${message_types.ActionType.CHARACTER},"content":"asdasdasd"}`)))
}

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}