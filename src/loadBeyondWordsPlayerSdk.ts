/* eslint-disable @typescript-eslint/no-explicit-any */
let sdkLoader: Promise<any> | null = null;

export default async function loadBeyondWordsPlayerSdk(targetElement: Element, version: string = "latest"): Promise<any> {
  if (!(sdkLoader instanceof Promise)) {
    sdkLoader = new Promise((resolve, reject) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = `https://proxy.beyondwords.io/npm/@beyondwords/player@${version}/dist/umd.js`;
      scriptElement.async = true;
      scriptElement.onload = () => {
        const Player = (window as any).BeyondWords?.Player;
        if (!Player) {
          reject(new Error("Failed to load BeyondWords Player"));
          return;
        }

        resolve(Player);
      };
      scriptElement.onerror = (error) => reject(error);
      targetElement.appendChild(scriptElement);
    });
  }

  return sdkLoader;
}
