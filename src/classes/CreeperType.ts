class CreeperType {

  value: number;

  constructor (value: number) {
    this.value = value;
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

export = CreeperType;