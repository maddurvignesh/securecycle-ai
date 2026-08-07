import type Lenis from "lenis";

let _lenis: Lenis | null = null;
let _stopped = false;

export function registerLenis(lenis: Lenis | null) {
  _lenis = lenis;
}

export function getLenis() {
  return _lenis;
}

export function stopScroll() {
  if (_stopped) return;
  _stopped = true;
  if (_lenis) _lenis.stop();
  document.documentElement.style.overflow = "hidden";
}

export function startScroll() {
  if (!_stopped) return;
  _stopped = false;
  if (_lenis) _lenis.start();
  document.documentElement.style.overflow = "";
}
