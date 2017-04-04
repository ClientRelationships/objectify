export default class DeepProfile {

  deepProfileId: number;
  status: string;
  statisticId: number;
  whenUnprocessed: string;
  whenProcessed: string;
  source: string;
  converterId: number;
  creeperId: number;
  creeperActionId: number;
  creeperQuality: number;
  feedbackHash: string;
  feedbackIsAnonymous: number;
  feedbackIsSubscribed: number;

  constructor (
    deepProfileId: number,
    status: string = "dont-process",
    statisticId: number = null,
    whenUnprocessed: string = "",
    whenProcessed: string = "",
    source: string = null,
    converterId: number = null,
    creeperId: number = null,
    creeperActionId: number = null,
    creeperQuality: number = 0,
    feedbackHash: string = null,
    feedbackIsAnonymous: number = 0,
    feedbackIsSubscribed: number = 1
  ) {
    this.deepProfileId = deepProfileId;
    this.status = status;
    this.statisticId = statisticId;
    this.whenUnprocessed = whenUnprocessed;
    this.whenProcessed = whenProcessed;
    this.source = source;
    this.converterId = converterId;
    this.creeperId = creeperId;
    this.creeperActionId = creeperActionId;
    this.creeperQuality = creeperQuality;
    this.feedbackHash = feedbackHash;
    this.feedbackIsAnonymous = feedbackIsAnonymous;
    this.feedbackIsSubscribed = feedbackIsSubscribed;
  }

  setField (region, key, value): void {
    this[`${region}_${key}`] = value;
  }

  getField (region, key): string {
    return this[`${region}_${key}`];
  }

  toString (): string {
    return `${this.source} (ID ${this.deepProfileId})`;
  }

  getName (): string {
    const sources = {
      "feedback": () => {
        const feedbackFirstName = this.getField("feedback", "firstName");
        const feedbackLastName = this.getField("feedback", "lastName");
        if (this.feedbackIsAnonymous) {
          return "? (Anonymous)";
        }
        if (feedbackFirstName && !feedbackLastName) {
          return feedbackFirstName;
        }
        if (feedbackFirstName && feedbackLastName) {
          return `${feedbackFirstName} ${feedbackLastName}`;;
        }
        return "<No Name>";
      },
      "convert": () => {
        const convertFirstName = this.getField("convert", "name");
        if (convertFirstName) {
          return convertFirstName;
        }
        return "<No Name>";
      }
    };
    const source = (sources.hasOwnProperty(this.source) ? this.source : "convert");
    return sources[source]();
  }

}