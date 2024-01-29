# Webcomic Reader

Webcomic Reader is a browser extension designed to enhance your webcomic reading experience.

## Features

- **Preloading**: The extension preloads the next and right pages of the webcomic for seamless navigation.
- **Progress Tracking**: The extension tracks your progress through the webcomic as you read, letting you quickly jump back to where you left off.
- **Browser Sync**: If you are using a browser that supports browser sync, such as Firefox, you can sync your webcomic reading progress across devices.

## How to Use

1. Install the extension in your browser.
2. Go read your favourite webcomic.
3. If you already have arrow support and it's showing up in the extension, you're good to go! Otherwise, you'll need to look to the next section.
4. To pick up where you left off, right click the extension icon, click on "Your Webcomics" and then click on the webcomic you want to read.

## Adding a New Webcomic

If your webcomic isn't working out of the box, don't worry, there's a way to add it yourself. Go into your webcomic of choice,
preferably not the first or last page, and right-click on the extension icon and click on "Manually Add Webcomic". You
should get a popup that asks you to click on the button for going to the next page, and then the button for going to the
previous page. After that, you'll be asked to enter the name of the webcomic. With all of that done, the page will
refresh and you can try navigating with the left and right buttons!

If at some point the process says that it can't identify the button, please open an issue with the webcomic name and
URL.

## Development

The extension is developed using JavaScript, TypeScript, and npm. The code is organized into handlers, with `SiteHandler.ts` being the abstract base class for all site handlers.

## Credits

Icon by [Free Pik](https://www.freepik.com/)
