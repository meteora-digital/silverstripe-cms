class ColourPaletteController {
  constructor() {
    this.inputs = [];
  }

  update() {
    [...document.querySelectorAll('.colorpalette')].forEach(container => {
      const inputs = [...container.querySelectorAll('input')];

      for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        const title = input.value.replace(/-/g, ' ');
        const label = document.querySelector(`label[for="${input.id}"]`);
        const span = document.createElement('span');
        if (this.inputs.indexOf(input) > -1) continue;
        span.innerHTML = title;
        label.appendChild(span);
        this.inputs.push(input);
      }
    });
  }

}

exports.ColourPaletteController = ColourPaletteController;

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

class FieldNamesController {
  constructor() {
    this.fields = []; // A throttle

    this.timeout = {};
  }

  update() {
    clearTimeout(this.timeout['update']);
    this.timeout['update'] = setTimeout(() => {
      // find all the field elements on the page
      const fields = [...document.querySelectorAll('.field label')];

      if (fields.length > 0) {
        // First loop through the elements and inputs to see if they are still on the page
        this.fields.forEach(field => {
          // Find all the fields on the page, remove our current field from the array if it is not on the page anymore
          if (!fields.includes(field)) this.fields.splice(this.fields.indexOf(field), 1);
        }); // Loop through the field elements and inputs and add them to the arrays if they are not already in the array

        fields.forEach(element => {
          if (!this.fields.includes(element)) this.fields.push(element);
        });
      } else this.fields = [];

      this.fields.forEach(field => {
        const title = field.id.split('_');
        field.title = '$' + title[title.length - 1];
      });
    }, 500);
  }

}

exports.FieldNamesController = FieldNamesController;

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