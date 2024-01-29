import { SiteHandler } from "./SiteHandler";

export class Lackadaisy extends SiteHandler {
  id = "Lackadaisy";
  name = "Lackadaisy";
  static urlStartsWith = "lackadaisy.com";
  canLoadNextImage = false;

  getNextPageButton = () =>
    document.querySelector("div.next > a") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("div.prev > a") as HTMLAnchorElement;
}
