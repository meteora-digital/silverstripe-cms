class FieldNamesController {
  constructor() {
    this.fields = [];

    // A throttle
    this.timeout = {};
  }

  update() {
    clearTimeout(this.timeout['update']);

    this.timeout['update'] = setTimeout(() => {
      // find all the field elements on the page
      const fields = [...document.querySelectorAll('.field label')];

      if (fields.length > 0) {
        // First loop through the elements and inputs to see if they are still on the page
        this.fields.forEach((field) => {
          // Find all the fields on the page, remove our current field from the array if it is not on the page anymore
          if (!fields.includes(field)) this.fields.splice(this.fields.indexOf(field), 1);
        });

        // Loop through the field elements and inputs and add them to the arrays if they are not already in the array
        fields.forEach((element) => {
          if (!this.fields.includes(element)) this.fields.push(element);
        });
      } else this.fields = [];

      this.fields.forEach((field) => {
        const title = field.id.split('_');
        field.title = '$' + title[title.length - 1];
      });
    }, 500);
  }
}

exports.FieldNamesController = FieldNamesController;