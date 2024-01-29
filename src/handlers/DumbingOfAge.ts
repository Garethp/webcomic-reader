import { SiteHandler } from "./SiteHandler";

export class DumbingOfAge extends SiteHandler {
  id = "DumbingOfAge";
  name = "Dumbing of Age";
  static urlStartsWith = "dumbingofage.com";
  canLoadNextImage = false;

  getNextPageButton = () =>
    document.querySelector("a[title=Next]") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("a[title=Previous]") as HTMLAnchorElement;
}
