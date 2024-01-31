import { SiteHandler } from "./SiteHandler";

export class LeastICouldDo extends SiteHandler {
  id = "LeastICouldDo";
  name = "Least I Could Do";
  static urlStartsWith = "leasticoulddo.com/comic";
  imageMatchRegex = /img class="comic" src="(.*?)"/;

  elementModifiers = {
    "img.comic": (element: HTMLElement) => {
      element.style.maxWidth = "1500px";
      element.style.margin = "auto";
    },
  };

  getNextPageButton = () =>
    document.querySelector("a[rel=next]") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("a[rel=prev]") as HTMLAnchorElement;
}
