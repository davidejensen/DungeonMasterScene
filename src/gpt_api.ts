const callUrl: string = "";

export async function sendMessage(message: string)
{
    postToApi(message)
}

export async function sendInitialPrompt()
{
    //load file and send it
    //postToApi(fileContent)
}

async function postToApi(body: string)
{
    try {
        let response = await fetch(callUrl, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(body),
        })
        let json = await response.json()
        console.log(json)
    } catch {
        console.log("failed to reach URL")
    }
}