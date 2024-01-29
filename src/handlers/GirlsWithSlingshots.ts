import { SiteHandler } from "./SiteHandler";

export class GirlsWithSlingshots extends SiteHandler {
  id = "GirlsWithSlingshots";
  name = "Girls With Slingshots";
  static urlStartsWith = "girlswithslingshots.com";
  imageMatchRegex = /src="(.*?)" id="cc-comic"/;

  getNextPageButton = (): HTMLAnchorElement =>
    document.getElementsByClassName("cc-next")[0] as HTMLAnchorElement;
  getPreviousPageButton = (): HTMLAnchorElement =>
    document.getElementsByClassName("cc-prev")[0] as HTMLAnchorElement;
}
