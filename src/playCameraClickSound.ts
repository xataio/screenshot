export const playCameraClickSound = () => {
  const audio = document.createElement("audio");
  audio.loop = false;
  audio.src = "/sounds/screenshot.mp3";
  audio.play();
  audio.remove();
};
