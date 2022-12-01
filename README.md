# Silverstripe CMS Theme

Install this package and import the SCSS / CSS and JavaScript files into your project to make Silverstripe look awesome.

## Installation

```bash
npm i @meteora-digital/silverstripe-cms
yarn add @meteora-digital/silverstripe-cms
```

## SCSS Usage

Create a new cms.scss file in your project, and import the styles
    
```scss
@import 'node_modules/@meteora-digital/silverstripe-cms/dist/styles/index.scss';
```

Next we need to set up some css variables for the theme.

If you're not using the darkmode component, you can simply add:

```scss
:root {
    --cms-background-colour: #f1f1f1;
    --cms-background-colour--dark: #e9e9e9;
    --cms-background-colour--light: #fefefe;
    --cms-background-colour--dynamic: #fefefe;
    --cms-border-colour: #bebebe;
    --cms-link-colour: #036cd7;
    --cms-text-colour: #0e0e0e;
    --cms-accent-colour: #81b88b;
}
```

If you are using the darkmode component, I recommend the following setup:

```scss
@mixin dark-mode {
    --cms-background-colour: #292c47;
    --cms-background-colour--dark: #23263d;
    --cms-background-colour--light: #323657;
    --cms-background-colour--dynamic: #323657;
    --cms-border-colour: #040406;
    --cms-link-colour: #60a3d5;
    --cms-text-colour: #c7c7c7;
    --cms-accent-colour: #81b88b;
}

@mixin light-mode {
    --cms-background-colour: #f1f1f1;
    --cms-background-colour--dark: #e9e9e9;
    --cms-background-colour--light: #fefefe;
    --cms-background-colour--dynamic: #fefefe;
    --cms-border-colour: #bebebe;
    --cms-link-colour: #036cd7;
    --cms-text-colour: #0e0e0e;
    --cms-accent-colour: #4d9159;
}

```

Note: The `--cms-background-colour--dynamic` variable is useful when you want to change an element's background colour based on the current darkmode state. For example, in darkmode you may want something to use `--cms-background-colour--light` and in lightmode you may want it to use `--cms-background-colour--dark`. This variable allows for extra control.

```scss
:root {
  @media (prefers-color-scheme: light) {
    @include light-mode;
  }

  @media (prefers-color-scheme: dark) {
    @include dark-mode;
  }
}

body {
  &[data-darkmode="on"] {
    @include dark-mode;
  }

  &[data-darkmode="off"] {
    @include light-mode;
  }
}
```

## CMS Logo

Add your logo to the top of the CMS Sidebar.

```scss
@include cms-logo (
  $url: 'images/svg/logo.svg',
  $width: 54,
  $height: 22,
);
```

## JavaScript Usage

I recommend setting up a seperate js file for each component. And then import those components to one cms.js file

```js
document.addEventListener('DOMContentLoaded', () => {
  import('./cms/darkmode');
  import('./cms/page-observer');
});
```

## Darkmode Usage

```js
/* ---------------------------------------------
Import Darkmode
--------------------------------------------- */

import { DarkmodeController } from '@meteora-digital/silverstripe-cms';

/* ---------------------------------------------
Document Setup
--------------------------------------------- */

// Create a new darkmode controller
const Darkmode = new DarkmodeController();
// Find the south toolbar area
const toolbar = document.querySelector('.toolbar.toolbar--south.cms-panel-toggle');

// Add the darkmode button to the south toolbar
toolbar.appendChild(Darkmode.button);
```

## FieldNames Usage

```js
/* ---------------------------------------------
Import FieldNames
--------------------------------------------- */

import { FieldNamesController } from '@meteora-digital/silverstripe-cms';

/* ---------------------------------------------
Document Setup
--------------------------------------------- */

const FieldController = new FieldNamesController({
    include: ['.field'],
    exclude: [],
});

// Add $Variable names as titles on field inputs
FieldController.on('update', (label) => {
  const title = label.id.split('_');
  label.title = '$' + title[title.length - 1];
});

// If you're using the PageObserverController
window.addEventListener('page-updated', () => FieldController.update());
```

## Page Observer Usage

The page observer is a mutation observer that can be used to check for changes to the page content, for example after an ajax request. This can help if you need to retarget DOM elements with custom JS.

```js
/* ---------------------------------------------
Import Page Observer
--------------------------------------------- */

import { PageObserverController } from '@meteora-digital/silverstripe-cms';

/* ---------------------------------------------
Document Setup
--------------------------------------------- */

new PageObserverController();

/* ---------------------------------------------
Event Listeners
--------------------------------------------- */

window.addEventListener('page-updated', () => {
    // Do something after the page has been updated
});
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

