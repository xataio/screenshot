/**
 * Checks if the current browser supports the MediaDevices API.
 */
export const checkIfBrowserSupported = () =>
  Boolean(navigator.mediaDevices?.getDisplayMedia);
