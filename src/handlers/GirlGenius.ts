import { SiteHandler } from "./SiteHandler";
export class GirlGenius extends SiteHandler {
  id = "GirlGenius";
  name = "Girl Genius";
  static urlStartsWith = "girlgeniusonline.com";

  before = () => {
    new MutationObserver(function (mutations) {
      if (document.getElementById("sidebar")) {
        document.getElementById("sidebar").remove();
        this.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });

    new MutationObserver(function (mutations) {
      if (document.querySelector("#comicbody > table")) {
        document.querySelector("#comicbody > table").remove();
        this.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });

    new MutationObserver(function (mutations) {
      if (document.querySelector("#comicbody > p")) {
        document.querySelector("#comicbody > p").remove();
        this.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });

    new MutationObserver(function (mutations) {
      if (document.querySelector("#comicbody > p")) {
        document.querySelector("#comicbody > p").remove();
        this.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });

    new MutationObserver(function (mutations) {
      if (document.getElementById("comicarea")) {
        document.getElementById("comicarea").style.float = "none";
        document.getElementById("comicarea").style.margin = "0 auto";
        this.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });

    new MutationObserver(function (mutations) {
      if (document.getElementById("bottomnext")) {
        const button = document.getElementById(
          "bottomnext"
        ) as HTMLAnchorElement;
        button.href = button.href.replace("http://", "https://");
        this.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });

    new MutationObserver(function (mutations) {
      if (document.getElementById("bottomprev")) {
        const button = document.getElementById(
          "bottomprev"
        ) as HTMLAnchorElement;
        button.href = button.href.replace("http://", "https://");
        this.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });

    new MutationObserver(function (mutations) {
      if (document.getElementById("topnext")) {
        document.getElementById("topnext").scrollIntoView(true);
        this.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });

    new MutationObserver(function (mutations) {
      if (document.querySelector("#comicbody > a > img")) {
        const img = document.querySelector(
          "#comicbody > a > img"
        ) as HTMLImageElement;
        img.src = img.src.replace(/^http:/, "https:");
        this.disconnect();
      }
    }).observe(document, { childList: true, subtree: true });
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
