export module message_types{
    export class MessageSent {
        actionType: ActionType | undefined;
        content: string | undefined;

        ToJson(sent: MessageSent): string{
            return JSON.stringify(this)
        }

        ToObject(jsonObject: string): MessageSent
        {
            return JSON.parse(jsonObject)
        }
    }

    export class MessageReceived {
        result!: string;
    }

    export enum ActionType {
        ROLL,
        CHARACTER,
        OPEN_DOOR,
    }
}