import { sleep } from "./sleep";

export const waitForFocus = async (
  result: MediaStream
): Promise<MediaStream> => {
  await sleep();
  if (document.hasFocus()) {
    return result;
  }
  return waitForFocus(result);
};
