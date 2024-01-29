import { SiteHandler } from "./SiteHandler";

export class PennyArcade extends SiteHandler {
  id = "PennyArcade";
  name = "Penny Arcade";
  static urlStartsWith = "penny-arcade.com";
  canLoadNextImage = false;

  getNextPageButton = () =>
    document.querySelector("a.older") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("a.newer") as HTMLAnchorElement;
}
