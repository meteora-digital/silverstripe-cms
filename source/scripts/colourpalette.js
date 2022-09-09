class ColourPaletteController {
  constructor() {
    this.inputs = [];
  }

  update() {
    [...document.querySelectorAll('.colorpalette')].forEach((container) => {
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

const ColourPalette = new ColourPaletteController();

ColourPalette.update();

window.addEventListener('page-updated', () => ColourPalette.update());