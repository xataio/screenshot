import { createVideoElementToCaptureFrames } from "./createVideoElementToCaptureFrames";
import { paintVideoFrameOnCanvas } from "./paintVideoFrameOnCanvas";
import { playCameraClickSound } from "./playCameraClickSound";
import { sleep } from "./sleep";
import { stopCapture } from "./stopCapture";
import { waitForFocus } from "./waitForFocus";

type Options = {
  /**
   * The quality between 0-1 of your final image. 1 is uncompressed, 0 is lowest quality.
   * @default 0.7
   */
  quality?: number;

  /**
   * What should we do when capture starts? This is usually a good time to `hideModal()` or similar.
   */
  onCaptureStart?: () => Promise<void>;

  /**
   * What should we do when capture ends? This is usually a good time to clean stuff up.
   */
  onCaptureEnd?: () => Promise<void>;

  /**
   * What format of image would you like?
   * @default image/jpeg
   */
  type?: "image/jpeg" | "image/png";

  /**
   * Why not play a little audio camera click sound effect when your screenshot is being taken?
   * @optional
   */
  soundEffectUrl?: string;
};

/**
 * Takes a screenshot of the current page using a the native browser [`MediaDevices`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) API.
 */
export const takeScreenshot = async ({
  onCaptureEnd,
  onCaptureStart,
  quality = 0.7,
  type = "image/jpeg",
  soundEffectUrl,
}: Options = {}) => {
  await onCaptureStart?.();
  return navigator.mediaDevices
    .getDisplayMedia({
      // This is actually supported, but only in Chrome so not yet part of the TS typedefs, so
      // @ts-ignore
      preferCurrentTab: true,
      video: { frameRate: 30 },
    })
    .then(waitForFocus) // We can only proceed if our tab is in focus.
    .then(async (result) => {
      // So we mount the screen capture to a video element...
      const video = createVideoElementToCaptureFrames(result);

      // ...which needs to be in the DOM but invisible so we can capture it.
      document.body.appendChild(video);

      // Now, we need to wait a bit to capture the right moment...
      // Hide this modal...

      // Play camera click sound, because why not
      if (soundEffectUrl) {
        playCameraClickSound(soundEffectUrl);
      }

      // Wait for the video feed...
      await sleep();

      // Paint the video frame on a canvas...
      const canvas = paintVideoFrameOnCanvas(video);

      // Set the data URL in state
      const screenshot = canvas.toDataURL(type, quality);

      // Stop sharing screen.
      stopCapture(video);

      // Clean up
      canvas.remove();

      await onCaptureEnd?.();

      return screenshot;
    });
};
