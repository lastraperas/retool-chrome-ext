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
    // const menuContainer = root.querySelector(
    //   '.presentation-container > :fi[data-testid="Navigation::RetoolPill"]'
    // );
    // // menuContainer.firstChild.style.display = "none";
    // console.log(menuContainer);

    const canvasContainer = root.querySelector(".retool-canvas-container");
    canvasContainer.style.marginTop = 0;
    canvasContainer.style.height = "100vh";

    const footer = root.children.item(1);
    const left = footer.children.item(0);
    left.style.pointerEvents = "none";

    const middle = footer.children.item(1);
    middle.children.item(0).children.item(1).style.display = "none";

    const right = footer.children.item(2);
    right.children.item(1).style.display = "none";
    right.children.item(2).style.display = "none";
  });

  waitForElem('[aria-label="Menu"]').then((menu) => {
    menu.addEventListener("click", () => {
      waitForElem(
        ".ant-dropdown.user-utility-dropdown.large.ant-dropdown-placement-topLeft "
      ).then((dropdown) => {
        const menuItems = dropdown.querySelectorAll("ul > *");
        menuItems.forEach((li, index) => {
          if (index < menuItems.length - 2) {
            li.style.display = "none";
          }
        });
      });
    });
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "TabUpdated") {
    setTimeout(doIt, 750);
  }
});

doIt();
