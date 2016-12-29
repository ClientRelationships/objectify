import CreeperActionType from "../classes/CreeperActionType";

export default class CreeperAction {

  creeperActionId: number;
  type: CreeperActionType;
  data: string;

  constructor (creeperActionId: number, type: CreeperActionType, data: string = "Hello, World.") {
    this.creeperActionId = creeperActionId;
    this.type = type;
    this.data = data;
  }

}