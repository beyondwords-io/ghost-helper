async function domContentLoaded() {
  if (document.readyState === "complete" || document.readyState === "interactive") return;
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => resolve(undefined));
  });
}

async function loadScript(src: string, targetElement: Element) {
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement("script");
    scriptElement.onload = (event) => {
      scriptElement.onload = null;
      scriptElement.onerror = null;
      resolve(event);
    };
    scriptElement.onerror = (event) => {
      scriptElement.onload = null;
      scriptElement.onerror = null;
      reject(event);
    };
    scriptElement.src = src;
    insertChildIntoTarget(targetElement, scriptElement);
  });
}

function resolveTargetElement(target: string | null | undefined) {
  if (typeof target === "string") {
    const targetElement = document.querySelector(target);
    if (!targetElement) {
      throw new Error(`Target element "${target}" not found.`);
    }

    return targetElement;
  }

  const beyondwordsContainerElement = document.querySelector(".beyondwords-container");
  if (beyondwordsContainerElement) {
    return beyondwordsContainerElement;
  }

  const isPostTemplate = document.body.classList.contains("post-template");
  const isPageTemplate = document.body.classList.contains("page-template");
  if (!isPostTemplate && !isPageTemplate) {
    throw new Error("Player is only available on Ghost Posts and Pages.");
  }

  const fullContentElement = document.querySelector(".post-full-content");
  if (fullContentElement) {
    return fullContentElement;
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

function createContainerElement() {
  const containerElement = document.createElement("div");
  containerElement.setAttribute("id", "beyondwords-player");
  containerElement.style.width = "100%";
  containerElement.style.marginBottom = "1em";
  return containerElement;
}

function insertChildIntoTarget(targetElement: Element, childElement: Element) {
  targetElement.insertBefore(childElement, targetElement.firstChild);
}

async function main() {
  const currentScript = document.currentScript;
  const projectId = currentScript?.getAttribute("data-project-id");
  const target = currentScript?.getAttribute("data-target");
  const playerApiUrl = currentScript?.getAttribute("data-player-api-url");
  const playerStyle = currentScript?.getAttribute("data-player-style");
  const widgetStyle = currentScript?.getAttribute("data-widget-style");
  const backgroundColor = currentScript?.getAttribute("data-background-color");
  const iconColor = currentScript?.getAttribute("data-icon-color");
  const textColor = currentScript?.getAttribute("data-text-color");
  if (typeof projectId !== "string") {
    throw new Error("data-project-id attribute is required.");
  }

  await domContentLoaded();
  const targetElement = resolveTargetElement(target);
  await loadScript("https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js", targetElement);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const BeyondWordsPlayer = (window as any).BeyondWords?.Player;
  if (!BeyondWordsPlayer) {
    throw new Error("BeyondWords Player SDK failed to initialize");
  }

  const containerElement = createContainerElement();
  insertChildIntoTarget(targetElement, containerElement);
  new BeyondWordsPlayer({
    target: containerElement,
    sourceUrl: window.location.href,
    projectId,
    playerApiUrl: typeof playerApiUrl === "string" ? playerApiUrl : undefined,
    playerStyle: typeof playerStyle === "string" ? playerStyle : undefined,
    widgetStyle: typeof widgetStyle === "string" ? widgetStyle : undefined,
    backgroundColor: typeof backgroundColor === "string" ? backgroundColor : undefined,
    iconColor: typeof iconColor === "string" ? iconColor : undefined,
    textColor: typeof textColor === "string" ? textColor : undefined,
  });
}

main().catch((error) => {
  console.error("BeyondWords", error);
});
