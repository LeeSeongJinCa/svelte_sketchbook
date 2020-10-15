<script>
  import { onMount } from "svelte";
  import Keypad from "../Keypad.svelte";

  let name = "world";

  let a = 2;
  let b = 3;

  let checked = false;

  let scoops = 1;
  let flavours = ["mint"];

  let menu = ["cookie", "mint", "ripple"];

  const join = (flavours) => {
    if (flavours.length === 1) return flavours[0];
    return `${flavours.slice(0, -1).join(", ")} and ${
      flavours[flavours.length - 1]
    }`;
  };

  let value = "Some words";

  let questions = [
    { id: 1, text: `Where did you go to school?` },
    { id: 2, text: `What is your mother's name?` },
    {
      id: 3,
      text: `What is another personal fact that an attacker could easily find with Google?`,
    },
  ];

  let selected;
  let answer = "";

  const handleSubmit = () => {
    alert(
      `answered question ${selected.id} (${selected.text}) with "${answer}"`
    );
  };

  let html = "<p>White some text!</p>";

  let todos = [
    { done: false, text: "finish Svelte tutorial" },
    { done: false, text: "build an app" },
    { done: false, text: "world domination" },
  ];

  const add = () => {
    todos = [...todos, { done: false, text: "" }];
  };

  const clear = () => {
    todos = todos.filter((todo) => !todo.done);
  };

  $: remaining = todos.filter((todo) => !todo.done).length;

  let time = 0;
  let duration;
  let paused = true;

  let showControls = true;
  let showControlsTimeout;

  function handleMousemoveMedia(e) {
    clearTimeout(showControlsTimeout);
    showControlsTimeout = setTimeout(() => {
      showControls = false;
    }, 2000);

    if (!(e.button & 1)) return;
    if (!duration) return;

    const { left, right } = this.getBoundingClientRect();
    time = (duration * (e.clientX - left)) / (right - left);
  }

  function handleMousedownMedia(e) {
    function handleMouseup() {
      if (paused) e.target.play();
      else e.target.pause();
      cancel();
    }

    function cancel() {
      e.target.removeEventListener("mouseup", handleMouseup);
    }

    e.target.addEventListener("mouseup", handleMouseup);

    setTimeout(cancel, 200);
  }

  function format(seconds) {
    if (isNaN(seconds)) return "...";

    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`;
  }

  let w;
  let h;
  let size = 42;
  let text = "edit me";

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    let frame;

    (function loop() {
      frame = requestAnimationFrame(loop);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (let p = 0; p < imageData.data.length; p += 4) {
        const i = p / 4;
        const x = i % canvas.width;
        const y = (i / canvas.height) >>> 0;

        const t = window.performance.now();

        const r = 64 + (128 * x) / canvas.width + 64 * Math.sin(t / 1000);
        const g = 64 + (128 * y) / canvas.height + 64 * Math.cos(t / 1000);
        const b = 128;

        imageData.data[p + 0] = r;
        imageData.data[p + 1] = g;
        imageData.data[p + 2] = b;
        imageData.data[p + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    })();

    return () => {
      cancelAnimationFrame(frame);
    };
  });

  let keyValue = "";

  $: pin =
    keyValue.length <= 1
      ? keyValue
      : `${"*".repeat(keyValue.length - 1)}${keyValue.slice(
          keyValue.length - 1
        )}`;

  const handleSubmitKey = () => {
    alert("submitted " + keyValue);
  };
</script>

<style>
  [contenteditable] {
    padding: 0.5em;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  .done {
    opacity: 0.4;
  }

  div {
    position: relative;
  }

  .controls {
    position: absolute;
    top: 0;
    width: 100%;
    transition: opacity 1s;
  }

  .info {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  span {
    padding: 0.2em 0.5em;
    color: white;
    text-shadow: 0 0 8px black;
    font-size: 1.4em;
    opacity: 0.7;
  }

  .time {
    width: 3em;
  }

  .time:last-child {
    text-align: right;
  }

  progress {
    display: block;
    width: 100%;
    height: 10px;
    -webkit-appearance: none;
    appearance: none;
  }

  progress::-webkit-progress-bar {
    background-color: rgba(0, 0, 0, 0.2);
  }

  progress::-webkit-progress-value {
    background-color: rgba(255, 255, 255, 0.6);
  }

  video {
    width: 100%;
  }

  canvas {
    width: 100%;
    height: 100%;
    background-color: #666;
    -webkit-mask: url(https://svelte.dev/svelte-logo-mask.svg) 50% 50% no-repeat;
    mask: url(https://svelte.dev/svelte-logo-mask.svg) 50% 50% no-repeat;
  }
</style>

<div class="binding">
  <div class="textinputs">
    <input type="text" bind:value={name} />
    <h2>Hello {name}</h2>
  </div>
  <div class="numbericinputs">
    <label>
      <input type="number" bind:value={a} min="0" max="10" />
      <input type="range" bind:value={a} min="0" max="10" />
    </label>

    <label>
      <input type="number" bind:value={b} min="0" max="10" />
      <input type="range" bind:value={b} min="0" max="10" />
    </label>
    <p>{a} + {b} = {a + b}</p>
  </div>
  <div class="checkboxinputs">
    <label><input type="checkbox" bind:checked /> Yes!</label>
    {#if checked}
      <p>checked</p>
    {:else}
      <p>unchecked</p>
    {/if}
  </div>
  <div class="groupinputs">
    <h2>Size</h2>
    <div>
      <label>
        <input type="radio" bind:group={scoops} value={1} />
        One scoop
      </label>
      <label>
        <input type="radio" bind:group={scoops} value={2} />
        Two scoops
      </label>
      <label>
        <input type="radio" bind:group={scoops} value={3} />
        Three scoops
      </label>
    </div>

    <h2>Flavours</h2>

    {#each menu as flavour}
      <label>
        <input type="checkbox" bind:group={flavours} value={flavour} />
        {flavour}
      </label>
    {/each}

    {#if flavours.length === 0}
      <p>Please select at least one flavour</p>
    {:else if flavours.length > scoops}
      <p>Can't order more flavours than scoops!</p>
    {:else}
      <p>
        You ordered
        {scoops}
        {scoops === 1 ? 'scoop' : 'scoops'}
        of
        {join(flavours)}
      </p>
    {/if}
  </div>
  <div class="textinputs"><textarea bind:value /></div>
  <div class="selectbindings">
    <h2>Insecurity questions</h2>
    <select bind:value={selected}>
      {#each questions as question}
        <option value={question}>{question.text}</option>
      {/each}
    </select>
    <input type="text" bind:value={answer} />
    <button on:click={handleSubmit} disabled={!answer}>submit</button>
    <p>selected question {selected}</p>
  </div>
  <div class="selectmutiple">
    <select multiple bind:value={flavours}>
      {#each menu as flavour}
        <option value={flavour}>{flavour}</option>
      {/each}
    </select>
  </div>
  <div class="contenteditablebindings">
    <div contenteditable="true" bind:innerHTML={html} />
    <pre>{html}</pre>
  </div>
  <div class="eachblockbinding">
    <h2>Todos</h2>

    {#each todos as todo}
      <label class:done={todo.done}>
        <input type="checkbox" on:click={() => (todo.done = !todo.done)} />
        <input type="text" bind:value={todo.text} />
      </label>
    {/each}
    {remaining}
    remaining

    <button on:click={add}>Add new</button>
    <button on:click={clear}>Clear completed</button>
  </div>
  <div class="mediaelements">
    <h1>Caminandes: Llamigos</h1>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
      src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
      on:mousemove={handleMousemoveMedia}
      on:mousedown={handleMousedownMedia}
      bind:currentTime={time}
      bind:duration
      bind:paused />

    <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
      <progress value={time / duration || 0} />

      <div class="info">
        <span class="time">{format(time)}</span>
        <span>click anywhere to
          {paused ? 'play' : 'pause'}
          / drag to seek</span>
        <span class="time">{format(duration)}</span>
      </div>
    </div>
  </div>
  <div class="dimensions" bind:clientHeight={h} bind:clientWidth={w}>
    <input type="range" bind:value={size} />
    <input type="text " bind:value={text} />
    <p style="font-size: {size}px">size: {w}px x {h}px</p>
  </div>
  <div class="this"><canvas bind:this={canvas} width={32} height={32} /></div>
  <div class="componentbindings">
    <p>pin: {pin}</p>
    <Keypad on:submit={handleSubmitKey} bind:value={keyValue} />
  </div>
</div>
