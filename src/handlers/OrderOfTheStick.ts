import { SiteHandler } from "./SiteHandler";

export class OrderOfTheStick extends SiteHandler {
  id = "OrderOfTheStick";
  name = "Order of the Stick";
  static urlStartsWith = "giantitp.com";
  canLoadNextImage = false;

  scrollIntoView = () => this.getNextPageButton().scrollIntoView(true);

  getNextPageButton = () =>
    document.querySelector(
      'a:has(> img[alt="Next Comic"])'
    ) as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector(
      'a:has(> img[alt="Previous Comic"])'
    ) as HTMLAnchorElement;
}
