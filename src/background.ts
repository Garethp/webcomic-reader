// Listen for messages from content scripts
const browser = require("webextension-polyfill");

export const isManifestV3 = browser.runtime.getManifest().manifest_version == 3;

browser.runtime.onMessage.addListener(async (request, sender) => {
  const config = await browser.storage.sync.get(request.webcomic);

  if (request.type === "canPreload") {
    const fetchSettings =
      browser?.privacy?.network?.networkPredictionEnabled?.get;
    return fetchSettings && !!(await fetchSettings({})).value;
  }

  if (request.type === "updateLatestUrl") {
    // If the webcomic wasn't in the sync config, add it to the context menu
    if (!config[request.webcomic]) {
      createWebcomicContextMenu(
        request.webcomic,
        request.name as string,
        request.icon as string
      );
    }

    return browser.storage.sync.set({
      [request.webcomic]: {
        ...config[request.webcomic],
        id: request.webcomic,
        name: request.name,
        url: request.url,
        icon: request.icon,
      },
    });
  }

  if (request.type === "setCustomHandler") {
    if (!config[request.url]) {
      createWebcomicContextMenu(request.url, request.title, request.icon);
    }

    await browser.storage.local.set({ buildHandler: false });

    return browser.storage.sync.set({
      [request.url]: {
        id: request.url,
        name: request.title,
        nextButtonIdentifier: request.nextIdentifier,
        prevButtonIdentifier: request.prevIdentifier,
        icon: request.icon,
      },
    });
  }
});

async function handleContextMenu(info) {
  if (info.menuItemId === "build-custom-handler") {
    const currentTab = (
      await browser.tabs.query({
        active: true,
        lastFocusedWindow: true,
      })
    )[0];

    if (!currentTab) return;
    await browser.tabs.sendMessage(currentTab.id, {
      type: "buildCustomHandler",
    });
  }

  if (info.menuItemId.startsWith("webcomic-")) {
    const webcomic = info.menuItemId.replace("webcomic-", "");
    const result = await browser.storage.sync.get(webcomic);
    browser.tabs.create({ url: result[webcomic].url });
  }
}

function registerContextMenus() {
  browser.contextMenus.onClicked.removeListener(handleContextMenu);
  browser.contextMenus.onClicked.addListener(handleContextMenu);
  browser.contextMenus.removeAll();

  browser.contextMenus.create({
    id: "webcomic-comics",
    title: "Your Webcomics",
    contexts: ["all"],
  });

  browser.contextMenus.create({
    id: "build-custom-handler",
    title: "Manually Add Webcomic",
    contexts: ["all"],
  });

  // Get all the webcomics from the config and add a context menu item for each
  browser.storage.sync.get().then((config) => {
    console.log(config);

    Object.keys(config).forEach((webcomic) => {
      createWebcomicContextMenu(
        config[webcomic].id,
        config[webcomic].name,
        config[webcomic].icon
      );
    });
  });
}

registerContextMenus();

browser.storage.sync.onChanged.addListener(registerContextMenus);

const createWebcomicContextMenu = (id: string, title: string, icon: string) => {
  try {
    browser.contextMenus.create({
      id: `webcomic-${id}`,
      title: title,
      contexts: ["all"],
      parentId: "webcomic-comics",
      icons: {
        20: icon,
      },
    });
  } catch (e) {
    browser.contextMenus.create({
      id: `webcomic-${id}`,
      title: title,
      contexts: ["all"],
      parentId: "webcomic-comics",
    });
  }
};
