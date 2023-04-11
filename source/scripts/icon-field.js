class IconFieldController {
  constructor(selector = '#Root img') {
    this.icons = [];
    this.selector = selector;

    // A throttle
    this.timeout = {};
  }

  update() {
    clearTimeout(this.timeout['update']);

    this.timeout['update'] = setTimeout(() => {
      // find all the icons on the page
      const icons = [...document.querySelectorAll(this.selector)];

      if (icons.length > 0) {
        // Loop through the wysiwyg elements and inputs and add them to the arrays if they are not already in the array
        icons.forEach((icon) => {
          // If we haven't already added this icon to the array
          if (this.icons.indexOf(icon) === -1) {
            // Add the icon to the array
            this.icons.push(icon);

            // if the icon's src is svg extension
            if (icon.src.includes('.svg')) {
              // new xhr request to get the svg html
              const xhr = new XMLHttpRequest();
              // Open the request
              xhr.open('GET', icon.src, true);
              // When the request is loaded
              xhr.onload = () => {
                if (xhr.status === 200) {
                  // Add the svg html to the icon's parent element
                  if (!icon.nextElementSibling) icon.parentNode.innerHTML += xhr.responseText;
                }
              }

              // Send the request
              xhr.send();
            }
          };
        });
      } else this.icons = [];
    }, 500);
  }
}

exports.IconFieldController = IconFieldController;