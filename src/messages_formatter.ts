import { message_types } from "./message_types";

export function formatMessageToJson(actionType: message_types.ActionType, messageContent: string): string
{
    let action: String = "";
    switch(actionType){
        case message_types.ActionType.ROLL:
            action = "ROLL"
            break;
    }
    return `{"action": "${action}", "message":"${messageContent}"}`;
}