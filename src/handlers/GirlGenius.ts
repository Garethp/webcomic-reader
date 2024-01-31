import { SiteHandler } from "./SiteHandler";
export class GirlGenius extends SiteHandler {
  id = "GirlGenius";
  name = "Girl Genius";
  static urlStartsWith = "girlgeniusonline.com";

  elementModifiers = {
    "#sidebar": (element: HTMLElement) => element.remove(),
    "#comicbody > table": (element: HTMLElement) => element.remove(),
    "#comicbody > p": (element: HTMLElement) => element.remove(),
    "#bottomprev": (element: HTMLAnchorElement) =>
      (element.href = element.href.replace("http://", "https://")),
    "#bottomnext": (element: HTMLAnchorElement) =>
      (element.href = element.href.replace("http://", "https://")),
    "#comicbody > a > img": (img: HTMLImageElement) =>
      (img.src = img.src.replace(/^http:/, "https:")),
  };

  scrollIntoView = () =>
    document.getElementById("topnext").scrollIntoView(true);
  getNextPageButton = () =>
    document.getElementById("bottomnext") as HTMLAnchorElement;
  getPreviousPageButton = () =>
    document.getElementById("bottomprev") as HTMLAnchorElement;

  getNextImageUrl = async () => {
    const nextPageLink = this.getNextPageButton().href;
    const [_, nextDate] = nextPageLink.match("date=(.*)$");
    return `https://www.girlgeniusonline.com/ggmain/strips/ggmain${nextDate}.jpg`;
  };

  getPrevImageUrl = async () => {
    const prevPageLink = this.getPreviousPageButton().href;
    const [, prevDate] = prevPageLink.match("date=(.*)$");
    return `https://www.girlgeniusonline.com/ggmain/strips/ggmain${prevDate}.jpg`;
  };
}
