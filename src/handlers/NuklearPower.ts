import { SiteHandler } from "./SiteHandler";

export class NuklearPower extends SiteHandler {
  id = "NuklearPower";
  name = "Nuklear Power";
  static urlStartsWith = "nuklearpower.com";
  imageMatchRegex = /<div id="comic">\s+?<img src="(.*?)"/;

  after = () => {
    const comicItem = document.getElementsByClassName(
      "comic"
    )[0] as HTMLDivElement;
    comicItem.style.maxWidth = "1500px";
    comicItem.style.margin = "auto";
  };

  getNextPageButton = () =>
    document.querySelector("a[rel=next]") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("a[rel=prev]") as HTMLAnchorElement;
}
