import { SiteHandler } from "./SiteHandler";

export class XKCD extends SiteHandler {
  id = "XKCD";
  name = "XKCD";
  static urlStartsWith = "xkcd.com";
  canLoadNextImage = false;

  getNextPageButton = () =>
    document.querySelector("a[rel=next]") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("a[rel=prev]") as HTMLAnchorElement;
}
