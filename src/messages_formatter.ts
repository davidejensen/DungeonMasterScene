import { message_types } from "./message_types";

export function formatMessageToJson(actionType: message_types.ActionType, messageContent: string): object
{
    let action: String = "";
    switch(actionType){
        case message_types.ActionType.ROLL:
            action = "ROLL";
            break;
        case message_types.ActionType.OPEN_DOOR:
            action = "open_door";
            break; 
    }
    return {
        action: action,
        message: messageContent
    };
}