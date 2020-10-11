import { onDestroy } from "svelte";

export function onInterval(callback, millisecond) {
  const interval = setInterval(callback, millisecond);

  onDestroy(() => {
    clearInterval(interval);
  });
}
