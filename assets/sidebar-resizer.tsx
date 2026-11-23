// Drag/keyboard resizable sidebar edge. Framework-agnostic port of kargulstudio/sales-crm
// components/_common/sidebar/sidebar-resizer.tsx + lib/sidebar.ts (MIT).
// Usage: <aside className="relative hidden w-(--sidebar-width) shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
//          …<SidebarResizer /></aside>
// Paint the stored width before first render (index.html <head>): <script>{SIDEBAR_WIDTH_SCRIPT}</script>
import { useRef, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from "react";

export const SIDEBAR_MIN_WIDTH = 200;
export const SIDEBAR_MAX_WIDTH = 400;
export const SIDEBAR_DEFAULT_WIDTH = 254;
const VAR = "--sidebar-width";
const KEY = "sidebar-width";
const STEP = 10;

export const SIDEBAR_WIDTH_SCRIPT = `try{var w=parseInt(localStorage.getItem("${KEY}"),10);if(w>=${SIDEBAR_MIN_WIDTH}&&w<=${SIDEBAR_MAX_WIDTH})document.documentElement.style.setProperty("${VAR}",w+"px")}catch(e){}`;

const clamp = (w: number) => Math.round(Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, w)));
const listeners = new Set<() => void>();
let current: number | null = null;

function read() {
  if (current === null) {
    const value = parseInt(getComputedStyle(document.documentElement).getPropertyValue(VAR), 10);
    current = Number.isNaN(value) ? SIDEBAR_DEFAULT_WIDTH : clamp(value);
  }
  return current;
}
function apply(width: number) {
  current = clamp(width);
  document.documentElement.style.setProperty(VAR, `${current}px`);
  listeners.forEach((l) => l());
}
function save() {
  try {
    localStorage.setItem(KEY, String(read()));
  } catch {}
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function SidebarResizer() {
  const width = useSyncExternalStore(subscribe, read, () => SIDEBAR_DEFAULT_WIDTH);
  const drag = useRef<{ x: number; w: number } | null>(null);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, w: read() };
    document.documentElement.dataset.sidebarResizing = "";
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (drag.current) apply(drag.current.w + e.clientX - drag.current.x);
  }
  function onPointerEnd(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    delete document.documentElement.dataset.sidebarResizing;
    save();
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const next: Record<string, number> = {
      ArrowLeft: width - STEP,
      ArrowRight: width + STEP,
      Home: SIDEBAR_MIN_WIDTH,
      End: SIDEBAR_MAX_WIDTH,
    };
    if (!(e.key in next)) return;
    e.preventDefault();
    apply(next[e.key]);
    save();
  }

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
      aria-valuemin={SIDEBAR_MIN_WIDTH}
      aria-valuemax={SIDEBAR_MAX_WIDTH}
      aria-valuenow={width}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onDoubleClick={() => {
        apply(SIDEBAR_DEFAULT_WIDTH);
        save();
      }}
      onKeyDown={onKeyDown}
      className="group absolute inset-y-0 -right-1 z-10 w-2 cursor-col-resize touch-none outline-none select-none"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-transparent transition-[background-color] duration-150 ease-power3-out group-hover:bg-line-strong group-focus-visible:bg-subtle group-active:bg-subtle"
      />
    </div>
  );
}
