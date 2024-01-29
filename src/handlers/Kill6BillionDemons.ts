import { SiteHandler } from "./SiteHandler";

export class Kill6BillionDemons extends SiteHandler {
  id = "Kill6BillionDemons";
  name = "Kill 6 Billion Demons";
  static urlStartsWith = "killsixbilliondemons.com";
  canLoadNextImage = false;

  scrollIntoView = () =>
    document.querySelector(".comic_navi_wrapper").scrollIntoView(true);

  getNextPageButton = () =>
    document.querySelector("a.comic-nav-next") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("a.comic-nav-previous") as HTMLAnchorElement;
}
