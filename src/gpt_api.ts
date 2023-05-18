const callUrl: string = "";

export async function sendMessage(message: string)
{
    try {
        let response = await fetch(callUrl, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(message),
        })
        let json = await response.json()
        console.log(json)
      } catch {
        console.log("failed to reach URL")
      }
}