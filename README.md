# <img alt="Logo" width="56" src="assets/logo.png" /> `@xata.io/screenshot`

This tool uses [native browser APIs](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) to take screenshots of a given web page, tab, window, or the user's entire screen.

## Demos

Pick your preference. You can easily learn about this project in the following ways:

- Watch an explainer on [YouTube](https://www.youtube.com/watch?v=uC6RbWanoy4).
- See it in action on [StackBlitz](https://stackblitz.com/edit/node-b86qqd?file=app/routes/index.tsx).
- Read about the details on the [Xata Blog](https://xata.io/blog/introducing-screenshot/).

## Usage

First, you'll want to install it:

```bash
npm install @xata.io/screenshot
```

Then, you can add it to your app and use it like so:

```js
import { takeScreenshot, checkIfBrowserSupported } from "@xata.io/screenshot";

/**
 * Only do this if your browser supports it.
 * To check, visit https://caniuse.com/mdn-api_mediadevices_getdisplaymedia
 */
if (checkIfBrowserSupported()) {
  takeScreenshot().then((screenshot) => {
    /**
     * This is a base64-encoded string representing your screenshot.
     * It can go directly into an <img>'s `src` attribute, or be sent to a server to store.
     */
    console.log(screenshot);
  });
}
```

### Options

`takeScreenshot` accepts a few options to help you customize the user flow and the resulting image. These are:

| Option           | Description                                                                                                           | Required | Default Value  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| `quality`        | The quality of the final image on a scale of 0 to 1. 0 is lowest quality, 1 is highest.                               | _nope_   | `.7`           |
| `onCaptureStart` | An `async` function that does stuff when the capture starts. You'll usually want to hide any modals or anything here. | _nope_   |                |
| `onCaptureEnd`   | An `async` function that does stuff after capture ends. This is usually when you'll want to clean up.                 | _nope_   |                |
| `type`           | What kind of image do we want? Possible values are `"image/jpeg"` and `"image/png"`.                                  | _nope_   | `"image/jpeg"` |
| `soundEffectURL` | Why not play a little camera click sound effect when taking a screenshot?                                             | _nope_   | -              |

## Contributing

You're always welcome to open an issue if you encounter any, or even better, open a PR directly to solve issues. We don't (yet) have more contributing guidelines than this because the project is quite small. This may change as things develop.

Made with ❤️ in Berlin.
