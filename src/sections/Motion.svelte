<script>
  import { tweened, spring } from "svelte/motion";

  const progress = tweened(0);

  const coords = spring(
    { x: 50, y: 50 },
    {
      stiffness: 0.1,
      damping: 0.25,
    }
  );
  let size = spring(10);
</script>

<style>
  progress {
    display: block;
    width: 100%;
  }

  .spring {
    position: relative;
  }

  svg {
    width: 100%;
    height: 100px;
    border: 2px solid white;
  }

  circle {
    fill: #ff3e00;
  }
</style>

<div class="motion">
  <div class="tweend">
    <progress value={$progress} />
    <button on:click={() => ($progress = 0)}>0%</button>
    <button on:click={() => ($progress = 0.25)}>25%</button>
    <button on:click={() => ($progress = 0.5)}>50%</button>
    <button on:click={() => ($progress = 0.75)}>75%</button>
    <button on:click={() => ($progress = 1)}>100%</button>
  </div>
  <div class="spring">
    <div style="position: absolute; right: 1em;">
      <label>
        <h3>stiffness ({coords.stiffness})</h3>
        <input
          type="range"
          bind:value={coords.stiffness}
          min="0"
          max="1"
          step="0.1" />
      </label>

      <label>
        <h3>damping ({coords.damping})</h3>
        <input
          type="range"
          bind:value={coords.damping}
          min="0"
          max="1"
          step="0.1" />
      </label>
    </div>
    <svg
      on:mousemove={(e) => coords.set({ x: e.offsetX, y: e.offsetY })}
      on:mousedown={() => ($size = 30)}
      on:mouseup={() => ($size = 10)}>
      <circle cx={$coords.x} cy={$coords.y} r={$size} /></svg>
  </div>
</div>
