import ConverterPurpose from "../classes/ConverterPurpose";

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
  purpose: ConverterPurpose;

  constructor (
    converterId: number,
    name: string,
    grabber: string = "<Attention Grabbing Headline>",
    explainer: string = "<Justify Information Retrieval>",
    persuader: string = "<Persuade and Convince>",
    imageUrl: string = "?",
    forwardUrl: string = "?",
    callToAction: string = "Continue",
    deepProfileOnSubmit: boolean = false,
    purpose: ConverterPurpose = new ConverterPurpose(),
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
    this.purpose = purpose;
    this._links = _links;
  }

  toString (): string {
    return `${this.name} (ID ${this.converterId})`;
  }

  getFields (): Array<Object> {
    return this.purpose.getFields();
  }

}