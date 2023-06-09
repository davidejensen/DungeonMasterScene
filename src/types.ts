export class Character{
    name: string | undefined
    bio: string | undefined
    life: number | undefined
    class: string | undefined
    str: number | undefined
    int: number | undefined
}
  
export class Choices{
    message: Message = new Message;
    finish_reason: string | undefined
    index: number | undefined
}
  
export class Message{
    role!: string;
    content!: string;
}

export class Room{
    nw: boolean | undefined
    sw: boolean | undefined
    ew: boolean | undefined
    ww: boolean | undefined
    hasCrate: boolean | undefined
    hasEnemy: boolean | undefined
}