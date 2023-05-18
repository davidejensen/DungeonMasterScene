import { OPENAI_API_KEY, OPENAI_URL } from "./openai";
import { initialPrompt } from "./prompt";

const callUrl: string = "";


export async function sendMessage(message: object)
{
    const body: object = {
        'prompt': message,
        'max_tokens': 60
      };
    postToApi(body)
}

export async function sendInitialPrompt()
{
    const body: object = {
        'model': "gpt-3.5-turbo",
        'max_tokens': 60,
        'messages': [{"role": "user", "content": initialPrompt}]
      };

      postToApi(body)
}

export function createHeader()
{
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
    };    
}

export async function postToApi(body: object)
{
    let headers = createHeader()
    try {
        let response = await fetch(OPENAI_URL, {
          headers: headers ,
          method: "POST",
          body: JSON.stringify(body),
        })
        console.log(response.status)
        let json = await response.json()
        console.log("asdasd2")
        console.log(JSON.stringify(json))
        console.log("asdasd3")
    } catch {
        console.log("asdasd")
        console.log("failed to reach URL")
    }
}