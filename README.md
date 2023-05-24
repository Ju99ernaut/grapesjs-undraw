# Grapesjs Undraw

Add undraw illustrations through a modal

[DEMO](https://blocomposer.app)

### HTML
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<link href="https://unpkg.com/grapesjs-undraw/dist/grapesjs-undraw.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/grapesjs-undraw"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  plugins: ['grapesjs-undraw'],
});
```

### CSS
```css
body, html {
  margin: 0;
  height: 100%;
}
```


## Summary

* Plugin name: `grapesjs-undraw`
* Commands
    * `undraw`
* API
    * `editor.Undraw`



## Options

| Option | Description | Default |
|-|-|-
| `undrawEndpoint` | Endpoint for undraw svgs(can be self hosted) | `https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/` |
| `undrawError` | Handle errors | `check source` |
| `modalUndrawTitle` | Modal title | `Undraw` |

## Download

* CDN
  * `https://unpkg.com/grapesjs-undraw`
* NPM
  * `npm i grapesjs-undraw`
* GIT
  * `git clone https://github.com/Ju99ernaut/grapesjs-undraw.git`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<link href="https://unpkg.com/grapesjs-undraw/dist/grapesjs-undraw.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-undraw.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['grapesjs-undraw'],
      pluginsOpts: {
        'grapesjs-undraw': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-undraw';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-undraw/dist/grapesjs-undraw.min.css'

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```



## Development

Clone the repository

```sh
$ git clone https://github.com/Ju99ernaut/grapesjs-undraw.git
$ cd grapesjs-undraw
```

Install dependencies

```sh
$ npm i
```

Build sass

```sh
$ npm run build:css
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```

## License

MIT
