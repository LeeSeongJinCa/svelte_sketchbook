<script>
  import { spring } from "svelte/motion";
  import { pannable } from "../pannable";

  const coords = spring(
    {
      x: 0,
      y: 0,
    },
    {
      stiffness: 0.2,
      damping: 0.4,
    }
  );

  const handlePanStart = () => {
    coords.stiffness = coords.damping = 1;
  };

  const handlePanMove = (e) => {
    coords.update(($coords) => ({
      x: $coords.x + e.detail.dx,
      y: $coords.y + e.detail.dy,
    }));
  };

  const handlePanEnd = (e) => {
    coords.stiffness = 0.2;
    coords.damping = 0.4;
    coords.set({ x: 0, y: 0 });
  };
</script>

<style>
  .actions {
    position: relative;
    margin-top: 200px;
  }

  .box {
    --width: 100px;
    --height: 100px;
    position: absolute;
    width: var(--width);
    height: var(--height);
    left: calc(50% - var(--width) / 2);
    top: calc(50% - var(--height) / 2);
    border-radius: 4px;
    background-color: #ff3e00;
    cursor: move;
  }
</style>

<div class="actions">
  <div
    class="box"
    use:pannable
    on:panstart={handlePanStart}
    on:panmove={handlePanMove}
    on:panend={handlePanEnd}
    style="transform: translate({$coords.x}px, {$coords.y}px) rotate({$coords.x * 0.2}deg);" />
</div>
