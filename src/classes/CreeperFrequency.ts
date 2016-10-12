export default class CreeperFrequency {

  value: number;

  constructor (value: number) {
    this.value = value;
  }

  toString (): string {
    switch (this.value) {
      case 1:
        return "Low (1/60)";
      case 30:
        return "Normal (30/60)";
      case 59:
        return "High (59/60)";
    }
    return "Unknown";
  }

}