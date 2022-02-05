export const playCameraClickSound = (url: string) => {
  const audio = document.createElement("audio");
  audio.loop = false;
  audio.src = url;
  audio.play();
  audio.remove();
};
