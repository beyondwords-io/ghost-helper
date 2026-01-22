import loadBeyondWordsPlayerSdk from "./loadBeyondWordsPlayerSdk";
import resolveTargetElement from "./resolveTargetElement";
import domContentLoaded from "./domContentLoaded";
import createPlayerContainerElement from "./createPlayerContainerElement";

export type Props = {
  target?: Element | string | null;
  contentTarget?: Element | string | null;
  [key: string]: unknown;
};

export default class GhostHelper {
  static #instances: GhostHelper[] = [];

  static version: string = "latest";

  public readonly playerLoader: Promise<void>;

  public player: unknown;

  constructor(props: Props) {
    this.playerLoader = this.init(props)
      .then((player) => {
        this.player = player;
      })
      .catch((error) => {
        console.error("BeyondWords.GhostHelper", error);
        throw error;
      });
    GhostHelper.#instances.push(this);
  }

  private async init(props: Props) {
    await domContentLoaded();
    const targetElement = resolveTargetElement(props.target);
    const BeyondWordsPlayer = await loadBeyondWordsPlayerSdk(targetElement, GhostHelper.version);
    const playerContainerElement = createPlayerContainerElement();
    targetElement.insertBefore(playerContainerElement, targetElement.firstChild);
    return new BeyondWordsPlayer({
      sourceUrl: window.location.href,
      ...props,
      target: playerContainerElement,
    });
  }

  public destroy() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.player as any)?.destroy();
    GhostHelper.#instances = GhostHelper.#instances.filter((p) => p !== this);
  }

  static instances() {
    return [...GhostHelper.#instances];
  }

  static destroyAll() {
    GhostHelper.#instances.forEach((p) => p.destroy());
  }
}
