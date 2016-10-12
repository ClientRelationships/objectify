export default class CreeperActionType {

  value: number;

  constructor (value: any) {
    if (typeof value === "string") {
      switch (value) {
        case "All":
          this.value = 1;
          break;
        case "Reply":
          this.value = 2;
          break;
        default:
          throw new Error("CreeperActionType constructor value did not match a known string");
      }
    } else {
      this.value = value;
    }
  }

  toString (): string {
    switch (this.value) {
      case 1:
        return "All";
      case 2:
        return "Reply";
    }
    return "Unknown";
  }

}