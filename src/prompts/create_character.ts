export const initialPrompt = 
`
I want you to be a dungeon master for my role game. The game is setup in fantasy world similar to Dungeons and Dragons.
You will EXCLUSIVELY use JSON as format for your output. 
`

export const createCharacterPrompt = 
`
These are the rules to create a character for our players. 
Characters have the following structure
-- name
-- bio: You will create a short description of the characters biography
-- life: always 100
-- class
-- str: for WARRIOR (70-80), for MAGE(20-30)
-- int: for WARRIOR (20-30), for MAGE(70-80)

You will return the character requested in the following JSON data structure:
{"action":"character", "character":{CHARACTER_DATA}}
`
//this needs additional "Player chooses class WARRIOR"

export const createMissionPrompt = 
`
You will describe ina few lines an heroic mission for our players, inside a dungeon and the topic needs to be around killing an enemy, finding a treasure, save a character or escaping the dungeon.
You will return the mission requested in the following JSON data structure:
{"action":"mission", "mission":MISSION TEXT}
`

export const createRoomPrompt =
`
You will describe a new room of the Dungeon. Each dungeon is 16 by 16 tiles, but you don't need to explicit that.
A dungeon may contain up to 3 chests that can be placed in any tile of the floor.
A room may contain up to 2 enemies, that can be placed in any tile of the floor.
A room may contain 1 to 4 doors, one on each cardinal point.
Your output will exclusively be formatted with the following data structure:
{"action":"room", "room":ROOM_DESCRIPTION, "chests":[{x:X_POSITION, Y_POSITION}], "enemies":[{x:X_POSITION, Y_POSITION}], "doors":["north","south","east","west"]}
`

export const openChestPrompt =
`
The player will open the chest placed in the position described.
You will describe what happens after that.
Your output will exclusively be formatted with the following data structure:
{"aciont":"open_chest", "message":DESCRIPTION}
`
//this needs additional "Player opens the chest located in x,y"