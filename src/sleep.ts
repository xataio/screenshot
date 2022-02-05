export const sleep = (timeoutInMs = 300) =>
  new Promise((r) => {
    setTimeout(r, timeoutInMs);
  });
