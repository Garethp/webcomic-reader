import { SiteHandler } from "./SiteHandler";

export class Wildlife extends SiteHandler {
  id = "Wildlife";
  name = "Wildlife";
  static urlStartsWith = "wildelifecomic.com";
  canLoadNextImage = false;

  getNextPageButton = () =>
    document.querySelector("a[rel=next]") as HTMLAnchorElement;

  getPreviousPageButton = () =>
    document.querySelector("a[rel=prev]") as HTMLAnchorElement;
}
