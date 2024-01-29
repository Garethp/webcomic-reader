import { canUseSpeculationRules } from "../canUseSpeculationRules";

export abstract class SiteHandler {
  abstract id: string;
  abstract name: string;
  urlStartsWith: string;
  imageMatchRegex?: RegExp | undefined;
  canLoadNextImage: boolean = true;

  before: () => void = () => {};
  after: () => void = () => {
    if (this.canLoadNextImage) return;
    canUseSpeculationRules().then((canPreload) => {
      if (canPreload) return;

      [this.getNextPageButton(), this.getPreviousPageButton()].forEach(
        (link) => {
          let next_page_frame_element = document.createElement("iframe");
          next_page_frame_element.style.visibility = "hidden";
          next_page_frame_element.style.width = "100%";
          next_page_frame_element.style.height = "100%";
          next_page_frame_element.setAttribute("src", link.href);

          next_page_frame_element.addEventListener("load", () => {
            next_page_frame_element.contentWindow.document
              .querySelectorAll("img[loading=lazy]")
              .forEach((img) => {
                img.setAttribute("loading", "eager");
              });
          });

          document.body.appendChild(next_page_frame_element);

          // next_page_frame_element.contentWindow.document.addEventListener(
          //   "DOMContentLoaded",
          //   async () => {
          //     console.log("Setting images to eager");
          //     next_page_frame_element.contentWindow.document
          //       .querySelectorAll("img[loading=lazy]")
          //       .forEach((img) => {
          //         img.setAttribute("loading", "eager");
          //       });
          //   }
          // );
        }
      );
    });
  };

  scrollIntoView: () => void = () => {};
  abstract getNextPageButton: () => HTMLAnchorElement;
  abstract getPreviousPageButton: () => HTMLAnchorElement;

  getImageUrlFromPageUrl = async (url: string): Promise<string | undefined> => {
    if (this.imageMatchRegex === undefined) return undefined;

    return fetch(url)
      .then((result) => result.text())
      .then((html) => html.match(this.imageMatchRegex)[1]);
  };

  getNextImageUrl = () =>
    this.getImageUrlFromPageUrl(this.getNextPageButton().href);
  getPrevImageUrl = () =>
    this.getImageUrlFromPageUrl(this.getPreviousPageButton().href);
}
