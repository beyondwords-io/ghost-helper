export default function createPlayerContainerElement() {
  const playerContainerElement = document.createElement("div");
  playerContainerElement.setAttribute("id", "beyondwords-player");
  playerContainerElement.style.width = "100%";
  return playerContainerElement;
}
