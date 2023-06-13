import BeyondWords from "@beyondwords/player";
import resolveTargetElement from "./resolveTargetElement";
import resolveContentElement from "./resolveContentElement";
import domContentLoaded from "./domContentLoaded";
import createPlayerContainerElement from "./createPlayerContainerElement";
import assignMarkers from "./assignMarkers";

export type Props = {
  target?: Element | string | null,
  contentTarget?: Element | string | null,
  assignMarkersEnabled?: boolean,
  [key: string]: unknown;
}

export default class GhostHelper {

  public readonly playerLoader: Promise<void>;

  public player: unknown;

  constructor(props: Props) {
    if (!("assignMarkersEnabled" in props)) props.assignMarkersEnabled = true;

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
    if (props.assignMarkersEnabled) {
      const contentTargetElement = resolveContentElement(props.contentTarget);
      assignMarkers(contentTargetElement);
    }
    return new BeyondWords.Player({
      sourceUrl: window.location.href,
      ...props,
      target: playerContainerElement,
    });
  }
}
