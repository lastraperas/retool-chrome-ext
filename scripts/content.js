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

waitForElem(".showStatusBar").then((root) => {
  const container = root.querySelector(".presentation-container");
  container.firstChild.style.display = "none";

  const canvasContainer = root.querySelector(".retool-canvas-container");
  canvasContainer.style.marginTop = 0;
  canvasContainer.style.height = "100vh";

  const header = container.querySelector(
    ".presentation-canvas-padding.presentation-canvas-padding--with-pill"
  );
  header.firstChild.style.display = "none";

  const footer = root.children.item(1);
  const left = footer.children.item(0);
  left.style.pointerEvents = "none";

  const middle = footer.children.item(1);
  middle.children.item(0).children.item(1).style.display = "none";

  const right = footer.children.item(2);
  right.children.item(1).style.display = "none";
  right.children.item(2).style.display = "none";
});

waitForElem('[data-testid="QueryStatus::RerunQueriesButton]"').then((btn) => {
  btn.style.display = "none";
});
