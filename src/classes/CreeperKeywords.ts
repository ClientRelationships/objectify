import CreeperActionType = require("./CreeperActionType");

class CreeperKeywords extends Array<string> {

  add (keyword?: string): void {
    if (typeof keyword === "string") {
      this.push(keyword);
    } else {
      this.push(`keyword ${this.length + 1}`);
    }
  }

  remove (keyword: string): void {
    let index = this.indexOf(keyword);
    if (index > -1) {
      this.splice(index, 1);
    }
  }

  toString (): string {
    return this.join(", ");
  }

  fromArray (array: Array<string>): void {
    this.length = 0;
    array.forEach((keyword) => {
      this.push(keyword);
    });
  }

  fromString (string: string): void {
    this.fromArray(string.split(", "));
  }

}

export = CreeperKeywords;