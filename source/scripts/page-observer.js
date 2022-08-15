class PageObserverController {
  constructor() {
    // Create a new event to fire
    const e = new Event('page-updated');

    // We are going to detect changes to the page and update functionality accordingly.
    const Observer = new MutationObserver(() => {
      // dispatch a new event to the window
      window.dispatchEvent(e);
    });

    // Observe the body
    Observer.observe(document.body, {
      childList: true,
      // subtree: true,
    });
  }
}

exports.PageObserverController = PageObserverController;