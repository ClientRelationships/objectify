export default class CreeperType {

  value: number;

  constructor (value: any = null) {
    if (typeof value === "string") {
      if (value === null) value = "Autochirp";
      switch (value) {
        case "All":
          this.value = 1;
          break;
        case "Autochirp":
          this.value = 2;
          break;
        case "LeadGen":
          this.value = 3;
          break;
        default:
          throw new Error("CreeperType constructor string did not match a known string");
      }
    } else {
      if (value === null) value = 1;
      this.value = value;
    }
  }

  toString (): string {
    switch (this.value) {
      case 1:
        return "All";
      case 2:
        return "Autochirp";
      case 3:
        return "LeadGen";
    }
    return "Unknown";
  }

}