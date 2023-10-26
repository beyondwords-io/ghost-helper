import loadBeyondWordsPlayerSdk from "./loadBeyondWordsPlayerSdk";
import resolveTargetElement from "./resolveTargetElement";
import resolveContentElement from "./resolveContentElement";
import domContentLoaded from "./domContentLoaded";
import createPlayerContainerElement from "./createPlayerContainerElement";
import assignMarkers from "./assignMarkers";

export type Props = {
  target?: Element | string | null;
  contentTarget?: Element | string | null;
  assignMarkersEnabled?: boolean;
  [key: string]: unknown;
};

export default class GhostHelper {
  static #instances: GhostHelper[] = [];

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
    const BeyondWordsPlayer = await loadBeyondWordsPlayerSdk(targetElement);
    const playerContainerElement = createPlayerContainerElement();
    targetElement.insertBefore(playerContainerElement, targetElement.firstChild);
    if (props.assignMarkersEnabled) {
      const contentTargetElement = resolveContentElement(props.contentTarget);
      assignMarkers(contentTargetElement);
    }
    return new BeyondWordsPlayer({
      sourceUrl: window.location.href,
      ...props,
      target: playerContainerElement,
    });
  }

  static instances() {
    return [...GhostHelper.#instances];
  }
}
