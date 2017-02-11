export default class ConverterPurpose {

  value: number;

  constructor (value: any = null) {
    if (typeof value === "string") {
      if (value === null) value = "Default";
      switch (value) {
        case "Default":
          this.value = 1;
          break;
        case "SMS":
          this.value = 2;
          break;
        default:
          throw new Error("ConverterPurpose constructor string did not match a known string");
      }
    } else {
      if (value === null) value = 1;
      this.value = value;
    }
  }

  toString (): string {
    switch (this.value) {
      case 1:
        return "Default";
      case 2:
        return "SMS";
    }
    return "Unknown";
  }

}