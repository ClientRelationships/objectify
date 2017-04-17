export default class SexyArray extends Array<string> {

  itemPrepend: string;

  constructor (itemPrepend?: string) {
    super();
    this.itemPrepend = itemPrepend || "item";
  }

  contains (element: string): boolean {
    return (this.indexOf(element) !== -1);
  }

  add (element?: string): this {
    if (typeof element === "string") {
      this.push(element);
    } else {
      this.push(`${this.itemPrepend} ${this.length + 1}`);
    }
    return this;
  }

  updateByIndex (index: number, newKeyword: string): this {
    if (index === -1) return this;
    this[index] = newKeyword;
    return this;
  }

  update (oldKeyword: string, newKeyword: string): this {
    const index = this.indexOf(oldKeyword);
    return this.updateByIndex(index, newKeyword);
  }

  removeByIndex (index: number): this {
    if (index === -1) return this;
    this.splice(index, 1);
    return this;
  }

  remove (element: string): this {
    const index = this.indexOf(element);
    return this.removeByIndex(index);
  }

  toString (): string {
    return this.join(", ");
  }

  fromArray (array: Array<string>): this {
    if (!Array.isArray(array)) return this;
    this.length = 0;
    array.forEach((element) => {
      this.push(element);
    });
    return this;
  }

  fromString (string: string): this {
    if (string === null || string.length === 0) return this.fromArray([]);
    this.fromArray(string.split(", "));
    return this;
  }

}