import { SiteHandler } from "./SiteHandler";

export class LookingForGroup extends SiteHandler {
  id = "LookingForGroup";
  name = "Looking For Group";
  static urlStartsWith = "lfg.co/page";
  imageMatchRegex = /<div id="comic-img">\s+?<img src="(.*?)"/;

  after = () => (document.getElementById("comic-wrap").style.margin = "auto");
  scrollIntoView = () =>
    document.getElementById("page-title").scrollIntoView(true);

  getNextPageButton = () =>
    document.querySelector("a.comic-nav-next") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("a.comic-nav-prev") as HTMLAnchorElement;
}
