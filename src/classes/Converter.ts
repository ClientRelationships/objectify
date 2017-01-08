export default class Converter {

  converterId: number;
  _links: any;
  name: string;
  grabber: string;
  explainer: string;
  persuader: string;
  imageUrl: string;
  forwardUrl: string;
  callToAction: string;
  deepProfileOnSubmit: boolean;

  constructor (
    converterId: number,
    name: string,
    grabber: string = "?",
    explainer: string = "?",
    persuader: string = "?",
    imageUrl: string = "?",
    forwardUrl: string = "?",
    callToAction: string = "?",
    deepProfileOnSubmit: boolean = false,
    _links: any = {}
  ) {
    this.converterId = converterId;
    this.name = name;
    this.grabber = grabber;
    this.explainer = explainer;
    this.persuader = persuader;
    this.imageUrl = imageUrl;
    this.forwardUrl = forwardUrl;
    this.callToAction = callToAction;
    this.deepProfileOnSubmit = deepProfileOnSubmit;
    this._links = _links;
  }

  toString (): string {
    return `${this.name} (ID ${this.converterId})`;
  }

}