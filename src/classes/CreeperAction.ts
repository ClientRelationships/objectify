import CreeperActionType from "../classes/CreeperActionType";

export default class CreeperAction {

  creeperActionId: number;
  type: CreeperActionType;
  data: string;

  constructor (creeperActionId: number, type: CreeperActionType, data?: string) {
    this.creeperActionId = creeperActionId;
    this.type = type;
    if (data) {
      this.data = data;
    }
  }

}