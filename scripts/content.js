function waitForElem(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

const doIt = () => {
  waitForElem(".showStatusBar").then((root) => {
    // ocultar retool nav
    const canvasContainer = root.querySelector(".retool-canvas-container");
    canvasContainer.style.marginTop = 0;
    canvasContainer.style.height = "100vh";

    // desabilitar cambios de stage y version
    const footer = root.children.item(1);
    const left = footer.children.item(0);
    left.style.pointerEvents = "none";

    // ocultar history & help
    const right = footer.children.item(2);
    right.children.item(1).style.display = "none";
    right.children.item(2).style.display = "none";
  });

  // ocultar logo de retool del menu
  waitForElem('[data-testid="Navigation::FloatingPresentationNav"]').then(
    (menuContainer) => {
      menuContainer.style.display = "none";
    }
  );
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "TabUpdated") {
    setTimeout(doIt, 1000);
  }
});

doIt();
