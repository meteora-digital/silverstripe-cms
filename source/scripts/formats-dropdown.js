// An array to store the menus in
const menus = [];

const update = () => {
  // Loop through all the mce menus
  [...document.querySelectorAll('.mce-menu')].forEach((menu) => {
    // If the menu is in the array, don't add it
    if (menus.indexOf(menu) > -1) return;
    // Add the menu to the array
    menus.push(menu);

    // Loop through all the menu items
    [...menu.querySelectorAll('.mce-text')].forEach((item) => {
      // Find all the inline styles
      const attribute = item.getAttribute('style') || '';
      const styles = attribute.split(';');
      // convert the styles into an object with key and value
      const properties = styles.reduce((obj, style) => {
        const [key, value] = style.split(':');
        obj[key] = value;
        return obj;
      }, {});

      // If the styles doesnt contain a 'color' property, return
      if (!properties['color']) return;

      // Add the !important flag to the color property
      properties['color'] = properties['color'] + '!important';

      // Add all the properties back to the item style attribute
      item.setAttribute('style', Object.keys(properties).map((key) => `${key}: ${properties[key]}`).join(';'));
    });
  });
}

// When the page is updated, update the menus
window.addEventListener('page-updated', () => update());
