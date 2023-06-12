export default function resolveContentElement(contentTarget: Element | string | null | undefined) {
  if (contentTarget instanceof Element) {
    return contentTarget;
  }

  if (typeof contentTarget === "string") {
    const contentElement = document.querySelector(contentTarget);
    if (!contentElement) {
      throw new Error(`Content element "${contentTarget}" not found.`);
    }

    return contentElement;
  }

  const beyondwordsContentElement = document.querySelector(".beyondwords-content");
  if (beyondwordsContentElement) {
    return beyondwordsContentElement;
  }

  const isPostTemplate = document.body.classList.contains("post-template");
  const isPageTemplate = document.body.classList.contains("page-template");
  if (!isPostTemplate && !isPageTemplate) {
    throw new Error("Player is only available on Ghost Posts and Pages.");
  }

  const ghContentElement = document.querySelector(".gh-content"); // Casper theme
  if (ghContentElement) {
    return ghContentElement;
  }

  throw new Error("Content not found. See https://ghost.org/integrations/beyondwords/#advanced for further information.");
}
