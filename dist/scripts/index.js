class DarkmodeController {
  constructor() {
    // The various mode settings
    this.settings = ['on', 'off', 'auto']; // The current setting

    this.currentSetting = 0; // Create a button to toggle the darkmode

    this.button = document.createElement('button'); // Add some classes to the button

    this.button.classList.add('silverstripe-cms-toolbar-icon', 'silverstripe-cms-toolbar-icon--darkmode'); // When we click the button, switch the darkmode state

    this.button.addEventListener('click', e => {
      e.preventDefault();
      this.switchDarkMode();
    }); // Initialise the darkmode

    this.setDarkMode(this.getDarkMode());
  }

  getDarkMode() {
    return window.localStorage.getItem('silverstripe-cms-darkmode') || 'auto';
  }

  switchDarkMode() {
    // Cycle forward through the settings
    this.currentSetting = this.currentSetting == this.settings.length ? 0 : this.currentSetting + 1; // Set the darkmode

    this.setDarkMode(this.settings[this.currentSetting]);
  }

  setDarkMode(value = 'on') {
    window.localStorage.setItem('silverstripe-cms-darkmode', value);
    document.body.setAttribute('data-darkmode', value);
    this.button.setAttribute('data-darkmode', value);
    this.currentSetting = this.settings.indexOf(value);
  }

}

exports.DarkmodeController = DarkmodeController;

class PageObserverController {
  constructor() {
    // Create a new event to fire
    const e = new Event('page-updated'); // We are going to detect changes to the page and update functionality accordingly.

    const Observer = new MutationObserver(() => {
      // dispatch a new event to the window
      window.dispatchEvent(e);
    }); // Observe the body

    Observer.observe(document.body, {
      childList: true // subtree: true,

    });
  }

}

exports.PageObserverController = PageObserverController;