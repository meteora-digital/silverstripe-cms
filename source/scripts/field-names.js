class FieldNamesController {
  constructor(config = {}) {
    this.events = {};
    this.labels = [];

    // A throttle
    this.timeout = {};

    // The config settings
    this.settings = Object.assign({
      include: ['.field'],
      exclude: [],
    }, config);
  }

  update(func) {
    clearTimeout(this.timeout['update']);

    this.timeout['update'] = setTimeout(() => {
      // find all the field elements on the page
      const fields = [...document.querySelectorAll(this.settings.include.join(','))];
      // Find all the elements we want to exclude
      const excluded = (this.settings.exclude.length) ? [...document.querySelectorAll(this.settings.exclude.join(','))] : [];

      // Remove the excluded elements from the fields
      const filtered = fields.filter((field) => excluded.indexOf(field) === -1);

      // Find all the labels
      const labels = [];

      filtered.forEach((field) => {
        const fieldLabels = [...field.querySelectorAll('label')];
        fieldLabels.forEach((label) => {
          if (label) labels.push(label);
        })
      });

      if (labels.length > 0) {
        // First loop through the elements and inputs to see if they are still on the page
        this.labels.forEach((label) => {
          // Find all the labels on the page, remove our current label from the array if it is not on the page anymore
          if (!labels.includes(label)) this.labels.splice(this.labels.indexOf(label), 1);
        });

        // Loop through the label elements and inputs and add them to the arrays if they are not already in the array
        labels.forEach((element) => {
          if (!this.labels.includes(element) && element != null) this.labels.push(element);
        });
      } else this.labels = [];

      // Update each label
      this.labels.forEach((label) => this.callback('update', label));
    }, 500);
  }

  callback(type, data = false) {
    // run the callback functions
    if (this.events[type]) this.events[type].forEach((event) => event(data));
  }

  on(event, func) {
    // If we loaded an event and it's not the on event and we also loaded a function
    if (event && event != 'on' && event != 'callback' && this[event] && func && typeof func == 'function') {
      if (this.events[event] == undefined) this.events[event] = [];
      // Push a new event to the event array
      this.events[event].push(func);
    }
  }
}

exports.FieldNamesController = FieldNamesController;