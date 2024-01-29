import { SiteHandler } from "./SiteHandler";

export class CustomHandler extends SiteHandler {
  constructor(
    url: string,
    title: string,
    nextButtonIdentifier: string,
    prevButtonIdentifier: string
  ) {
    super();

    this.id = url;
    this.name = title;
    this.urlStartsWith = url;
    this.canLoadNextImage = false;

    this.nextButtonIdentifier = nextButtonIdentifier;
    this.prevButtonIdentifier = prevButtonIdentifier;
  }

  id = "custom";
  name = "Custom";
  urlStartsWith = "https://example.com/";

  private readonly nextButtonIdentifier: string;
  private readonly prevButtonIdentifier: string;

  getNextPageButton = () =>
    document.querySelector<HTMLAnchorElement>(
      `a[${this.nextButtonIdentifier}]`
    );

  getPreviousPageButton = () =>
    document.querySelector<HTMLAnchorElement>(
      `a[${this.prevButtonIdentifier}]`
    );

  getNextImageUrl = async () => "";
  getPrevImageUrl = async () => "";
}
