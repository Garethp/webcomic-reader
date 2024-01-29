import { SiteHandler } from "./SiteHandler";

export class GunnerkriggCourt extends SiteHandler {
  id = "GunnerkriggCourt";
  name = "Gunnerkrigg Court";
  static urlStartsWith = "gunnerkrigg.com";
  canLoadNextImage = false;

  getNextPageButton = () =>
    document.querySelector("a:has(> img[alt=Next])") as HTMLAnchorElement;

  getPreviousPageButton = () =>
    document.querySelector("a:has(> img[alt=Previous])") as HTMLAnchorElement;
}
