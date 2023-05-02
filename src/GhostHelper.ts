import BeyondWords from "@beyondwords/player";
import resolveTargetElement from "./resolveTargetElement";

export default class GhostHelper {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly props: { [key: string]: any; };

  public readonly playerLoader: Promise<void>;

  public player: unknown;

  constructor(props) {
    this.props = props;
    this.playerLoader = this.init()
      .then((player) => {
        this.player = player;
      })
      .catch((error) => {
        console.error("BeyondWords.GhostHelper", error);
        throw error;
      });
  }

  private async init() {
    await this.domContentLoaded();
    const targetElement = resolveTargetElement(this.props.element);
    const playerContainerElement = this.attachPlayerContainerElement(targetElement);
    return new BeyondWords.Player({
      sourceUrl: window.location.href,
      ...this.props,
      target: playerContainerElement,
    });
  }

  private async domContentLoaded(): Promise<void> {
    if (document.readyState === "complete" || document.readyState === "interactive") return;
    return new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", () => resolve());
    });
  }

  private attachPlayerContainerElement(targetElement: Element) {
    const playerContainerElement = document.createElement("div");
    playerContainerElement.setAttribute("id", "beyondwords-player");
    playerContainerElement.style.width = "100%";
    targetElement.insertBefore(playerContainerElement, targetElement.firstChild);
    return playerContainerElement;
  }
}
