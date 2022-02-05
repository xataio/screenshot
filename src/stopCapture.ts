export const stopCapture = (video: HTMLVideoElement) => {
  // @ts-ignore because getTracks is very much valid in modern browsers
  const tracks = video.srcObject?.getTracks();
  tracks?.forEach((track: { stop: () => void }) => track.stop());

  // This is the only way to clean up a video stream in the browser so...
  // eslint-disable-next-line no-param-reassign
  video.srcObject = null;
  video.remove();
};
