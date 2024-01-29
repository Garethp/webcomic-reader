import { SiteHandler } from "./SiteHandler";

export class Unsounded extends SiteHandler {
  id = "Unsounded";
  name = "Unsounded";
  static urlStartsWith = "casualvillain.com";
  canLoadNextImage = false;

  getNextPageButton = () =>
    document.querySelector("a.forward") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("a.back") as HTMLAnchorElement;
}
