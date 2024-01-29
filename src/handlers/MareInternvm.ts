import { SiteHandler } from "./SiteHandler";

export class MareInternvm extends SiteHandler {
  id = "MareInternvm";
  name = "Mare Internvm";
  static urlStartsWith = "marecomic.com";
  canLoadNextImage = false;

  getNextPageButton = () =>
    document.querySelector("a.comic-nav-next") as HTMLAnchorElement;

  getPreviousPageButton = () =>
    document.querySelector("a.comic-nav-previous") as HTMLAnchorElement;
}
