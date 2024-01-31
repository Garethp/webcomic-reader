import { SiteHandler } from "./SiteHandler";

export class QuestionableContent extends SiteHandler {
  id = "QuestionableContent";
  name = "Questionable Content";
  static urlStartsWith = "questionablecontent.net/view.php";
  canLoadNextImage = false;

  getNextPageButton = () =>
    // @ts-ignore
    [...document.querySelector("#comicnav").querySelectorAll("a")].find(
      (a) => a.innerText == "Next"
    );

  getPreviousPageButton = () =>
    // @ts-ignore
    [...document.querySelector("#comicnav").querySelectorAll("a")].find(
      (a) => a.innerText == "Previous"
    );
}
