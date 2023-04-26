import GhostHelper from "./GhostHelper";

declare global {
  interface Window {
    BeyondWords?: {
      Player: unknown,
      GhostHelper?: typeof GhostHelper
    }
  }
}

export { };
