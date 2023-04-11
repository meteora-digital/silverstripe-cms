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
  constructor(config = {}) {
    this.events = {};
    this.labels = []; // A throttle

    this.timeout = {}; // The config settings

    this.settings = Object.assign({
      include: ['.field'],
      exclude: []
    }, config);
  }

  update() {
    clearTimeout(this.timeout['update']);
    this.timeout['update'] = setTimeout(() => {
      // find all the field elements on the page
      const fields = [...document.querySelectorAll(this.settings.include.join(','))]; // Find all the elements we want to exclude

      const excluded = this.settings.exclude.length ? [...document.querySelectorAll(this.settings.exclude.join(','))] : []; // Remove the excluded elements from the fields

      const filtered = fields.filter(field => excluded.indexOf(field) === -1); // Find all the labels

      const labels = [];
      filtered.forEach(field => {
        const fieldLabels = [...field.querySelectorAll('label')];
        fieldLabels.forEach(label => {
          if (label) labels.push(label);
        });
      });

      if (labels.length > 0) {
        // First loop through the elements and inputs to see if they are still on the page
        this.labels.forEach(label => {
          // Find all the labels on the page, remove our current label from the array if it is not on the page anymore
          if (!labels.includes(label)) this.labels.splice(this.labels.indexOf(label), 1);
        }); // Loop through the label elements and inputs and add them to the arrays if they are not already in the array

        labels.forEach(element => {
          if (!this.labels.includes(element) && element != null) this.labels.push(element);
        });
      } else this.labels = []; // Update each label


      this.labels.forEach(label => this.callback('update', label));
    }, 500);
  }

  callback(type, data = false) {
    // run the callback functions
    if (this.events[type]) this.events[type].forEach(event => event(data));
  }

  on(event, func) {
    // If we loaded an event and it's not the on event and we also loaded a function
    if (event && event != 'on' && event != 'callback' && this[event] && func && typeof func == 'function') {
      if (this.events[event] == undefined) this.events[event] = []; // Push a new event to the event array

      this.events[event].push(func);
    }
  }

}

exports.FieldNamesController = FieldNamesController;

class FormatsDropdownController {
  constructor() {
    this.menus = [];
  }

  update() {
    // Loop through all the mce menus
    [...document.querySelectorAll('.mce-menu')].forEach(menu => {
      // If the menu is in the array, don't add it
      if (this.menus.indexOf(menu) > -1) return; // Add the menu to the array

      this.menus.push(menu); // Loop through all the menu items

      [...menu.querySelectorAll('.mce-text')].forEach(item => {
        // Find all the inline styles
        const attribute = item.getAttribute('style') || '';
        const styles = attribute.split(';'); // convert the styles into an object with key and value

        const properties = styles.reduce((obj, style) => {
          const [key, value] = style.split(':');
          obj[key] = value;
          return obj;
        }, {}); // If the styles doesnt contain a 'color' property, return

        if (!properties['color']) return; // Add the !important flag to the color property

        properties['color'] = properties['color'] + '!important'; // Add all the properties back to the item style attribute

        item.setAttribute('style', Object.keys(properties).map(key => `${key}: ${properties[key]}`).join(';'));
      });
    });
  }

}

exports.FormatsDropdownController = FormatsDropdownController;

class IconFieldController {
  constructor(selector = '#Root img') {
    this.icons = [];
    this.selector = selector; // A throttle

    this.timeout = {};
  }

  update() {
    clearTimeout(this.timeout['update']);
    this.timeout['update'] = setTimeout(() => {
      // find all the icons on the page
      const icons = [...document.querySelectorAll(this.selector)];

      if (icons.length > 0) {
        // Loop through the wysiwyg elements and inputs and add them to the arrays if they are not already in the array
        icons.forEach(icon => {
          // If we haven't already added this icon to the array
          if (this.icons.indexOf(icon) === -1) {
            // Add the icon to the array
            this.icons.push(icon); // if the icon's src is svg extension

            if (icon.src.includes('.svg')) {
              // new xhr request to get the svg html
              const xhr = new XMLHttpRequest(); // Open the request

              xhr.open('GET', icon.src, true); // When the request is loaded

              xhr.onload = () => {
                if (xhr.status === 200) {
                  // Add the svg html to the icon's parent element
                  if (!icon.nextElementSibling) icon.parentNode.innerHTML += xhr.responseText;
                }
              }; // Send the request


              xhr.send();
            }
          }

          ;
        });
      } else this.icons = [];
    }, 500);
  }

}

exports.IconFieldController = IconFieldController;

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