import { SiteHandler } from "./SiteHandler";

export class MegaTokyo extends SiteHandler {
  id = "MegaTokyo";
  name = "MegaTokyo";
  static urlStartsWith = "megatokyo.com/strip/";

  getNextPageButton = () =>
    document.querySelector("li.next > a") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.querySelector("li.prev > a") as HTMLAnchorElement;

  scrollIntoView = () => document.getElementById("comic").scrollIntoView(true);

  getNextImageUrl = async () => {
    const nextPageLink = this.getNextPageButton().href;
    const [_, nextId] = nextPageLink.match(/strip\/(\d+)$/);
    return `https://megatokyo.com/strips/${nextId}.png`;
  };

  getPrevImageUrl = async () => {
    const prevPageLink = this.getPreviousPageButton().href;
    const [, prevId] = prevPageLink.match(/strip\/(\d+)$/);
    return `https://megatokyo.com/strips/${prevId}.png`;
  };
}
