class CreeperFrequency {

  value: number;

  constructor (value: number) {
    this.value = value;
  }

  toString (): string {
    switch (this.value) {
      case 1:
        return "High (1: 59/60)";
      case 30:
        return "Normal (30: 30/60)";
      case 59:
        return "Low (59: 1/60)";
    }
    return "Unknown";
  }

}

export = CreeperFrequency;