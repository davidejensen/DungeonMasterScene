import { OPENAI_API_KEY, OPENAI_URL, OPENAI_ORG} from "./openai";
import { createCharacterPrompt } from "./prompts/create_character";
import { setupCharacerSelectionUi } from "./ui";

let previousMessages: Array<Message> = new Array<Message>
const callUrl: string = "";

export async function sendInitialPrompt()
{
    const body: object = {
        'model': "gpt-3.5-turbo",
        'max_tokens': 60,
        'messages': [{"role": "user", "content": createCharacterPrompt}]
      };
      let response = await fetch(OPENAI_URL, {
        headers: createHeader(),
        method: "POST",
        body: JSON.stringify(body),
      })
      addPreviousMessage("user", createCharacterPrompt);
  
      let json = await response.json()
      var choices: Array<Choices> = json.choices;
      choices.forEach((element: Choices) => addPreviousMessage(element.message.role, element.message?.content));
      console.log(JSON.stringify(json))
    setupCharacerSelectionUi()
}

export async function sendStartCommand()
{
    const requestContent = `I want to choose my character`;
    const body: object = {
        'model': "gpt-3.5-turbo",
        'max_tokens': 60,
        'messages': [{"role": "user", "content": requestContent}].concat(previousMessages)
      };
      let response = await fetch(OPENAI_URL, {
        headers: createHeader(),
        method: "POST",
        body: JSON.stringify(body),
      })
      addPreviousMessage("user", requestContent);

      let json = await response.json()
      var choices: Array<Choices> = json.choices;
      choices.forEach((element: Choices) => addPreviousMessage(element.message.role, element.message?.content));
      console.log(JSON.stringify(json))
}

export async function sendSelectedCharacter(selectedCharacter: string)
{
    const requestContent = `{"action":"choose_character", value:"${selectedCharacter.toUpperCase()}"}`;
    const body: object = {
        'model': "gpt-3.5-turbo",
        'max_tokens': 60,
        'messages': [{"role": "user", "content": requestContent}].concat(previousMessages)
      };
    addPreviousMessage("user", requestContent)

    let response = await fetch(OPENAI_URL, {
        headers: createHeader(),
        method: "POST",
        body: JSON.stringify(body),
      })
      let json = await response.json()
    var choices: Array<Choices> = json.choices;
    choices.forEach((element: Choices) => addPreviousMessage(element.message.role, element.message?.content));
    console.log(JSON.stringify(json))

    addPreviousMessage("user", requestContent)
    const body2: object = {
        'model': "gpt-3.5-turbo",
        'max_tokens': 60,
        'messages': [{"role": "user", "content": requestContent}].concat(previousMessages)
      };
    let response2 = await fetch(OPENAI_URL, {
        headers: createHeader(),
        method: "POST",
        body: JSON.stringify(body2),
      })
      let json2 = await response2.json()
    var choices: Array<Choices> = json2.choices;
    choices.forEach((element: Choices) => addPreviousMessage(element.message.role, element.message?.content));
    console.log(JSON.stringify(json2))

    
}

function addPreviousMessage(role: string, content: string)
{
    console.log("add role " + role + " message " + content)
    previousMessages.push({role: role, content: content})
}

class Character{
    class: string | undefined
    name: string | undefined
    bio: string | undefined
    
}

class Choices{
    message: Message = new Message;
    finish_reason: string | undefined
    index: number | undefined
}

class Message{
    role!: string;
    content!: string;
}

export function createHeader()
{
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'OpenAI-Organization': OPENAI_ORG,
    };    
}