import { GetHandlerByUrl } from "./handlers/index";
import { startLinkIdentifier } from "./handlerBuilder";
import { canUseSpeculationRules } from "./canUseSpeculationRules";

const addPrefetchLink = (url, as) => {
  const link = document.createElement("link");
  link.href = url;
  link.rel = "prefetch";
  link.as = as;
  document.body.appendChild(link);
};

(async function () {
  let handlePageChangeLastCalled = 0;

  const handlePageChange =  async () => {
    if (handlePageChangeLastCalled > Date.now() - 300) {
      return;
    }

    handlePageChangeLastCalled = Date.now();

    console.log('handlePageChange');

    if (!document.getElementById("webcomic-history-hook")) {
      console.log("Adding hook");
      const historyHook = document.createElement("script");
      historyHook.id = "webcomic-history-hook";
      historyHook.type = "text/javascript";
      historyHook.text = `
        window.history.pushState = new Proxy(window.history.pushState, {
          apply: (target, thisArg, argArray) => {
            // trigger here what you need
            window.dispatchEvent(new Event('pushstate'));
            return target.apply(thisArg, argArray);
          },
        });
        
        window.history.replaceState = new Proxy(window.history.replaceState, {
          apply: (target, thisArg, argArray) => {
            // trigger here what you need
            window.dispatchEvent(new Event('replaceState'));
            return target.apply(thisArg, argArray);
          },
        });
    `;
      document.body.appendChild(historyHook);
    }

    const handler = await GetHandlerByUrl(window.location.toString());
    if (!handler) return;

    handler.scrollIntoView();

    const nextPageButton = handler.getNextPageButton();

    const preRenderList = [];

    if (!!nextPageButton) {
      preRenderList.push(nextPageButton.href);

      addPrefetchLink(nextPageButton.href, "document");

      handler.getNextImageUrl().then((url) => {
        if (!url) return;

        addPrefetchLink(url, "image");
      });
    }

    const previousPageButton = handler.getPreviousPageButton();
    if (!!previousPageButton) {
      preRenderList.push(previousPageButton.href);

      addPrefetchLink(previousPageButton.href, "document");

      handler.getPrevImageUrl().then((url) => {
        if (!url) return;

        addPrefetchLink(url, "image");
      });
    }

    if (await canUseSpeculationRules()) {
      const specScript = document.createElement("script");
      specScript.type = "speculationrules";
      const specRules = {
        prerender: [
          {
            source: "list",
            urls: preRenderList,
          },
        ],
      };
      specScript.textContent = JSON.stringify(specRules);
      document.body.append(specScript);
    }

    handler.after();

    void storeLatestUrl(handler.id, handler.name, window.location.toString());
  };

  window.addEventListener("replaceState", handlePageChange);

  document.addEventListener("DOMContentLoaded", handlePageChange);

  const handler = await GetHandlerByUrl(window.location.toString());

  handler?.attachElementModifiers();
  handler?.before();

  if (!handler) return;

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      handler.getNextPageButton()?.click();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handler.getPreviousPageButton()?.click();
    }
  });
})();

const storeLatestUrl = async (
  id: string,
  webcomicName: string,
  url: string
) => {
  if (window.location.pathname.length < 3) return;

  const faviconData = await getIconData();

  browser.runtime.sendMessage({
    type: "updateLatestUrl",
    webcomic: id,
    name: webcomicName,
    icon: faviconData,
    url: url,
  });
};

const getIconData = async (): Promise<string> => {
  // @ts-ignore
  const links = [...document.getElementsByTagName("link")];
  let iconLink = links.filter(
    (link) => link.getAttribute("rel").indexOf("icon") > -1
  )[0];

  if (iconLink === undefined) {
    iconLink = `https://${window.location.host}/favicon.ico`;
  } else {
    iconLink = iconLink.href;
  }
  const faviconData = await fetch(iconLink)
    .then((response) => response.blob())
    .then((blob) => {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function () {
          resolve(this.result);
        }; // <--- `this.result` contains a base64 data URI
        reader.readAsDataURL(blob);
      });
    });

  return faviconData as string;
};

const buildCustomerHandler = async () => {
  alert("Please click the next button");
  const nextIdentifier = await startLinkIdentifier();

  if (!nextIdentifier.length) {
    alert("Unable to create a unique identifier for that button");
    return;
  }

  alert("Please click the previous button");
  const prevIdentifier = await startLinkIdentifier();

  if (!prevIdentifier.length) {
    alert("Unable to create a unique identifier for that button");
    return;
  }

  const url = window.location.hostname.replace(/^www\./, "");
  const title = window.prompt(
    "What's the title of this webcomic?",
    window.document.title
  );

  const faviconData = await getIconData();

  await browser.runtime.sendMessage({
    type: "setCustomHandler",
    url: url,
    title: title,
    nextIdentifier: nextIdentifier[0],
    prevIdentifier: prevIdentifier[0],
    icon: faviconData,
  });

  window.location.reload();
};

browser.runtime.onMessage.addListener(async (request, sender) => {
  if (request.type === "buildCustomHandler") {
    void buildCustomerHandler();
  }
});
