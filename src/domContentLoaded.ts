export default async function domContentLoaded(): Promise<void> {
  if (document.readyState === "complete" || document.readyState === "interactive") return;
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => resolve());
  });
}
