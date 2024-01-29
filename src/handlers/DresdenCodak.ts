import { SiteHandler } from "./SiteHandler";

export class DresdenCodak extends SiteHandler {
  id = "DresdenCodak";
  name = "Dresden Codak";
  static urlStartsWith = "dresdencodak.com";
  canLoadNextImage = false;

  scrollIntoView = () =>
    document.querySelector("section.entry-content").scrollIntoView(true);

  getNextPageButton = () =>
    document.querySelector(
      'a:has(> img[alt="Next Page"])'
    ) as HTMLAnchorElement;

  getPreviousPageButton = () =>
    document.querySelector("a:has(> img[alt=Previous])") as HTMLAnchorElement;
}
