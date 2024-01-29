import { SiteHandler } from "./SiteHandler";

export class Paranatural extends SiteHandler {
  id = "Paranatural";
  name = "Paranatural";
  static urlStartsWith = "paranatural.net/comic";
  canLoadNextImage = false;

  scrollIntoView = () => document.querySelector("#menu").scrollIntoView();

  getNextPageButton = () =>
    document.querySelector("a[rel=next]") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("a[rel=prev]") as HTMLAnchorElement;
}
