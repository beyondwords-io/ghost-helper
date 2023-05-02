import BeyondWords from "@beyondwords/player";
import resolveTargetElement from "./resolveTargetElement";
import domContentLoaded from "./domContentLoaded";
import createPlayerContainerElement from "./createPlayerContainerElement";

export type Props = {
  target?: Element | string | null,
  [key: string]: unknown;
}

export default class GhostHelper {

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
  }

  private async init(props: Props) {
    await domContentLoaded();
    const targetElement = resolveTargetElement(props.target);
    const playerContainerElement = createPlayerContainerElement();
    targetElement.insertBefore(playerContainerElement, targetElement.firstChild);
    return new BeyondWords.Player({
      sourceUrl: window.location.href,
      ...props,
      target: playerContainerElement,
    });
  }
}
