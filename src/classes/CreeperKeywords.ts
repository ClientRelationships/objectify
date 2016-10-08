import CreeperActionType = require("./CreeperActionType");

class CreeperKeywords extends Array<string> {

  add (keyword?: string): CreeperKeywords {
    if (typeof keyword === "string") {
      this.push(keyword);
    } else {
      this.push(`keyword ${this.length + 1}`);
    }
    return this;
  }

  updateByIndex (index: number, newKeyword: string): CreeperKeywords {
    if (index === -1) return this;
    this[index] = newKeyword;
    return this;
  }

  update (oldKeyword: string, newKeyword: string): CreeperKeywords {
    let index = this.indexOf(oldKeyword);
    return this.updateByIndex(index, newKeyword);
  }

  removeByIndex (index: number): CreeperKeywords {
    if (index === -1) return this;
    this.splice(index, 1);
    return this;
  }

  remove (keyword: string): CreeperKeywords {
    let index = this.indexOf(keyword);
    return this.removeByIndex(index);
  }

  toString (): string {
    return this.join(", ");
  }

  fromArray (array: Array<string>): CreeperKeywords {
    this.length = 0;
    array.forEach((keyword) => {
      this.push(keyword);
    });
    return this;
  }

  fromString (string: string): CreeperKeywords {
    if (string.length === 0) return this.fromArray([]);
    this.fromArray(string.split(", "));
    return this;
  }

}

export = CreeperKeywords;