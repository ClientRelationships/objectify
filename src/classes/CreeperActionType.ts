class CreeperActionType {

  value: number;

  constructor (value: number) {
    this.value = value;
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

export = CreeperActionType;