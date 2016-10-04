import CreeperActionType = require("./CreeperActionType");

class CreeperAction {

  creeperActionId: number;
  type: CreeperActionType;
  data?: string;

  constructor (creeperActionId: number, type: CreeperActionType, data?: string) {
    this.creeperActionId = creeperActionId;
    this.type = type;
    this.data = data;
  }

}

export = CreeperAction;