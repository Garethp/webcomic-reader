// We need to look for when a user clicks on the "Next"
// link, and then we need to find a way to check if we can identify that link in the future
// based on interesting attributes. We should check, in order, if the link has the following
// attributes and if so, if they're unique to this link on this page:
// * id
// * class
// * rel

export const startLinkIdentifier = (): Promise<string[]> => {
  return new Promise((resolve) => {
    const eventHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();

      // Check if the clicked element is a link with the text "Next"
      if (event.target instanceof HTMLAnchorElement) {
        const targetUrl = event.target.href;
        const attributes = ["id", "class", "rel"];
        const uniqueAttributes = [];

        // Check if the link has the attributes id, class, or rel
        attributes.forEach((attr) => {
          const value = event.target.getAttribute(attr);
          if (!value) return;

          const elementsWithSameAttr = [
            // @ts-ignore
            ...document.querySelectorAll(`a[${attr}="${value}"]`),
          ].filter((item) => item == event.target || item.href !== targetUrl);

          if (elementsWithSameAttr.length === 1) {
            uniqueAttributes.push(`${attr}="${value}"`);
          }
        });

        resolve(uniqueAttributes);
      }

      // Remove the event handler after it's run once
      document.body.removeEventListener("click", eventHandler);
      return false;
    };

    document.body.addEventListener("click", eventHandler);
  });
};
