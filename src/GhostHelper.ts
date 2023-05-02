export default class GhostHelper {

  private readonly props: { [key: string]: unknown; };

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
    const targetElement = this.resolveTargetElement();
    const playerTargetElement = this.attachPlayerTargetElement(targetElement);
    if (!window.BeyondWords?.Player) {
      throw new Error("BeyondWords Player SDK failed to initialize");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new (window.BeyondWords.Player as any)({
      sourceUrl: window.location.href,
      ...this.props,
      target: playerTargetElement,
    });
  }

  private async domContentLoaded(): Promise<void> {
    if (document.readyState === "complete" || document.readyState === "interactive") return;
    return new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", () => resolve());
    });
  }

  private resolveTargetElement() {
    if (this.props.target instanceof Element) {
      return this.props.target;
    }

    if (typeof this.props.target === "string") {
      const targetElement = document.querySelector(this.props.target);
      if (!targetElement) {
        throw new Error(`Target element "${this.props.target}" not found.`);
      }

      return targetElement;
    }

    const beyondwordsTargetElement = document.querySelector(".beyondwords-target");
    if (beyondwordsTargetElement) {
      return beyondwordsTargetElement;
    }

    const isPostTemplate = document.body.classList.contains("post-template");
    const isPageTemplate = document.body.classList.contains("page-template");
    if (!isPostTemplate && !isPageTemplate) {
      throw new Error("Player is only available on Ghost Posts and Pages.");
    }

    const postFullContentElement = document.querySelector(".post-full-content");
    if (postFullContentElement) {
      return postFullContentElement;
    }

    const articleElement = document.querySelector("article");
    if (articleElement) {
      const headerElement = articleElement.querySelector("header");
      if (headerElement) {
        return headerElement;
      }

      return articleElement;
    }

    const contentElement = document.querySelector(".content");
    if (contentElement) {
      return contentElement;
    }

    throw new Error("Target not found. See https://ghost.org/integrations/beyondwords/#advanced for further information.");
  }

  private attachPlayerTargetElement(targetElement: Element) {
    const playerTargetElement = document.createElement("div");
    playerTargetElement.setAttribute("id", "beyondwords-player");
    playerTargetElement.style.width = "100%";
    targetElement.insertBefore(playerTargetElement, targetElement.firstChild);
    return playerTargetElement;
  }
}
