const BW_MARKER_DATASET_NAME = "beyondwordsMarker";

export default function assignMarkers(contentTargetElement: Element) {
  Array.from(contentTargetElement.children)
    .filter(child => child instanceof HTMLElement && typeof child.dataset[BW_MARKER_DATASET_NAME] !== "string")
    .forEach((child, index) => (child as HTMLElement).dataset[BW_MARKER_DATASET_NAME] = `segment-${index}`);
}
