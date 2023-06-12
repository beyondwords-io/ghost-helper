export default function assignMarkers(content: Element) {
  Array.from(content.children)
    .filter(child => child instanceof HTMLElement && child.tagName !== "STYLE" && child.tagName !== "SCRIPT" && typeof child.dataset.beyondwordsMarker !== "string")
    .forEach((child, index) => (child as HTMLElement).dataset.beyondwordsMarker = `data-segment-${index}`);
}
