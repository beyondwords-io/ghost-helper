export default function assignMarkers(contentTargetElement: Element) {
  Array.from(contentTargetElement.children)
    .filter(child => child instanceof HTMLElement && typeof child.dataset.beyondwordsMarker !== "string")
    .forEach((child, index) => (child as HTMLElement).dataset.beyondwordsMarker = `segment-${index}`);
}
