class PageObserverController {
  constructor() {
    // Create a new event to fire
    const e = new Event('page-updated');
    let throttle = null;

    // We are going to detect changes to the page and update functionality accordingly.
    const Observer = new MutationObserver(() => {
      // Clear the throttle
      clearTimeout(throttle);

      // Set a new throttle
      throttle = setTimeout(() => {
        // dispatch a new event to the window
        window.dispatchEvent(e);
      }, 100);
    });

    // Observe the body
    Observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

exports.PageObserverController = PageObserverController;