export default function resolveTargetElement(target: Element | string | null | undefined) {
  if (target instanceof Element) {
    return target;
  }

  if (typeof target === "string") {
    const targetElement = document.querySelector(target);
    if (!targetElement) {
      throw new Error(`Target element "${target}" not found.`);
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
