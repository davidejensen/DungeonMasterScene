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
        'prompt': initialPrompt,
        'max_tokens': 60
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
        let json = await response.json()
        console.log(json)
    } catch {
        console.log("failed to reach URL")
    }
}