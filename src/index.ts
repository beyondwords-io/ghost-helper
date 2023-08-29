import "@beyondwords/player";
import GhostHelper from "./GhostHelper";

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).BeyondWords ||= {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).BeyondWords.GhostHelper ||= GhostHelper;
}

export default GhostHelper;
