export const createVideoElementToCaptureFrames = (mediaStream: MediaStream) => {
  const video = document.createElement("video");
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  video.srcObject = mediaStream;
  video.setAttribute(
    "style",
    "position:fixed;top:0;left:0;pointer-events:none;visibility:hidden;"
  );

  return video;
};
