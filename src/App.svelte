<script>
  import { onMount, beforeUpdate, afterUpdate, tick } from "svelte";
  import { tweened, spring } from "svelte/motion";
  import { cubicOut, elasticOut, quintOut } from "svelte/easing";
  import { fade, fly, slide, crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  import { pannable } from "./pannable";
  import { longpress } from "./longpress";

  import Introduce from "./sections/Introduce.svelte";
  import Reactivity from "./sections/Reactivity.svelte";
  import Props from "./sections/Props.svelte";
  import Logic from "./sections/Logic.svelte";
  import Event from "./sections/Event.svelte";
  import Binding from "./sections/Binding.svelte";
  import Lifecycle from "./sections/Lifecycle.svelte";
  import Stores from "./sections/Stores.svelte";
  import Motion from "./sections/Motion.svelte";

  import Box from "./Box.svelte";
  import Hoverable from "./Hoverable.svelte";
  import Map from "./Map.svelte";
  import MapMarket from "./MapMarket.svelte";
  import Folder from "./Folder.svelte";
  import RedThing from "./RedThing.svelte";
  import BlueThing from "./BlueThing.svelte";
  import GreenThing from "./GreenThing.svelte";
  import Todo from "./Todo.svelte";
  import AudioPlayer, { stopAll } from "./AudioPlayer.svelte";
  import Debugging from "./Debugging.svelte";
  import Congratulations from "./Congratulations.svelte";
  import Transitions from "./sections/Transitions.svelte";

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  let springCoords = spring(
    { x: 50, y: 50 },
    {
      stiffness: 0.1,
      damping: 0.25,
    }
  );
  let springSize = spring(10);

  let visible = true;

  function spin(node, { duration }) {
    return {
      duration,
      css: (t) => {
        const eased = elasticOut(t);
        return `
          transform: scale(${eased}) rotate(${eased * 1080}deg);
          color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);
        `;
      },
    };
  }

  function typewriter(node, { speed = 50 }) {
    const vaild =
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!vaild) {
      throw new Error(
        "This transition only work on elements with a single text node child"
      );
    }

    const text = node.textContent;
    const duration = text.length * speed;

    return {
      duration,
      tick: (t) => {
        const i = ~~(text.length * t);
        node.textContent = text.slice(0, i);
      },
    };
  }

  let status = "wating...";

  let showItems = true;
  let i = 5;
  let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  let uid = 1;

  let todos2 = [
    { id: uid++, done: false, description: "write some docs" },
    { id: uid++, done: false, description: "start writing blog post" },
    { id: uid++, done: true, description: "buy some milk" },
    { id: uid++, done: false, description: "mow the lawn" },
    { id: uid++, done: false, description: "feed the turtle" },
    { id: uid++, done: false, description: "fix some bugs" },
  ];

  function add2(input) {
    const todo = {
      id: uid++,
      done: false,
      description: input.value,
    };

    todos2 = [todo, ...todos2];
    input.value = "";
  }

  function remove2(todo) {
    todos2 = todos2.filter((t) => t !== todo);
  }

  function mark2(todo, done) {
    todo.done = done;
    remove2(todo);
    todos2 = todos2.concat(todo);
  }

  const coords2 = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.2,
      damping: 0.4,
    }
  );

  function handlePanStart() {
    coords2.stiffness = coords2.damping = 1;
  }

  function handlePanMove(event) {
    coords2.update(($coords) => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy,
    }));
  }

  function handlePanEnd(event) {
    coords2.stiffness = 0.2;
    coords2.damping = 0.4;
    coords2.set({ x: 0, y: 0 });
  }

  let pressed = false;
  let pressedDuration = 2000;

  const buttons = ["foo", "bar", "baz"];
  let current = "foo";

  let big = false;

  let root = [
    {
      type: "folder",
      name: "Important work stuff",
      files: [{ type: "file", name: "quarterly-results.xlsx" }],
    },
    {
      type: "folder",
      name: "Animal GIFs",
      files: [
        {
          type: "folder",
          name: "Dogs",
          files: [
            { type: "file", name: "treadmill.gif" },
            { type: "file", name: "rope-jumping.gif" },
          ],
        },
        {
          type: "folder",
          name: "Goats",
          files: [
            { type: "file", name: "parkour.gif" },
            { type: "file", name: "rampage.gif" },
          ],
        },
        { type: "file", name: "cat-roomba.gif" },
        { type: "file", name: "duck-shuffle.gif" },
        { type: "file", name: "monkey-on-a-pig.gif" },
      ],
    },
    { type: "file", name: "TODO.md" },
  ];

  const options = [
    { color: "red", component: RedThing },
    { color: "blue", component: BlueThing },
    { color: "green", component: GreenThing },
  ];

  let selected2 = options[0];

  let key;
  let keyCode;

  function handleKeydownWindow(e) {
    key = e.key;
    keyCode = e.keyCode;
  }

  let y;

  let hereKitty = false;
  const handleMouseenterWindow = () => (hereKitty = true);
  const handleMouseleaveWindow = () => (hereKitty = false);

  let todos3 = [
    { id: 1, done: true, text: "wash the car" },
    { id: 2, done: false, text: "take the dog for a walk" },
    { id: 3, done: false, text: "mow the lawn" },
  ];

  const toggleTodo = (toggled) => {
    todos3 = todos3.map((todo) => {
      if (todo === toggled) {
        return {
          id: todo.id,
          text: todo.text,
          done: !todo.done,
        };
      }

      return todo;
    });
  };
</script>

<style>
  .root {
    padding: 100px 0;
  }
</style>

<div class="root">
  <Introduce />
  <Reactivity />
  <Props />
  <Logic />
  <Event />
  <Binding />
  <Lifecycle />
  <Stores />
  <Motion />
  <Transitions />

  <!-- 

  <progress value={$progress} />
  <button on:click={() => ($progress = 0)}>0%</button>
  <button on:click={() => progress.set(0)}>0%</button>
  <button on:click={() => progress.set(0.25)}>25%</button>
  <button on:click={() => progress.set(0.5)}>50%</button>
  <button on:click={() => progress.set(0.75)}>75%</button>
  <button on:click={() => progress.set(1)}>100%</button>

  <div class="spring-wrap">
    <div style="position: absolute; right: 1em;">
      <label>
        <h3>stiffness ({springCoords.stiffness})</h3>
        <input
          bind:value={springCoords.stiffness}
          type="range"
          min="0"
          max="1"
          step="0.01" />
      </label>

      <label>
        <h3>damping ({springCoords.damping})</h3>
        <input
          bind:value={springCoords.damping}
          type="range"
          min="0"
          max="1"
          step="0.01" />
      </label>
    </div>

    <svg
      on:mousemove={(e) => ($springCoords = { x: e.offsetX, y: e.offsetY })}
      on:mousedown={() => ($springSize = 30)}
      on:mouseup={() => ($springSize = 10)}>
      <circle cx={$springCoords.x} cy={$springCoords.y} r={$springSize} />
    </svg>
  </div>

  <label> <input type="checkbox" bind:checked={visible} /> visible </label>
  <p>status: {status}</p>
  {#if visible}
    <p transition:fade={{ duration: 500, easing: cubicOut }}>
      Fades in and out
    </p>

    <p transition:fly={{ y: -200, duration: 2000, easing: cubicOut }}>
      Fades in and out
    </p>

    <p in:fly={{ y: -200, duration: 2000, easing: cubicOut }} out:fade>
      Fades in and out
    </p>

    <div style="position: relative;">
      <div class="centered" in:spin={{ duration: 8000 }} out:fade>
        <span class="spin">transitions!</span>
      </div>
    </div>

    <p in:typewriter>The quick brown fox jumps over the lazy dog</p>

    <p
      transition:fly={{ y: 200, duration: 2000 }}
      on:introstart={() => (status = 'intro started')}
      on:introend={() => (status = 'intro ended')}
      on:outrostart={() => (status = 'outro started')}
      on:outroend={() => (status = 'outro ended')}>
      Flies in and out
    </p>
  {/if}

  <label> <input type="checkbox" bind:checked={showItems} /> show list </label>
  <label> <input type="range" bind:value={i} max="10" /> </label>

  {#if showItems}
    {#each items.slice(0, i) as item}
      <div class="item" transition:slide|local>{item}</div>
    {/each}
  {/if}

  <div class="borad">
    <input
      type="text"
      placeholder="What needs to do done?"
      on:keydown={(e) => e.key === 'Enter' && add2(e.target)} />
    <div class="left">
      <h2>todo</h2>
      {#each todos2.filter((t) => !t.done) as todo (todo.id)}
        <label
          in:receive={{ key: todo.id }}
          out:send={{ key: todo.id }}
          animate:flip={{ duration: 500 }}>
          <input type="checkbox" on:change={() => mark2(todo, true)} />
          {todo.description}
          <button on:click={() => remove2(todo)}>remove</button>
        </label>
      {/each}
    </div>

    <div class="right">
      <h2>done</h2>
      {#each todos2.filter((t) => t.done) as todo (todo.id)}
        <label
          in:receive={{ key: todo.id }}
          out:send={{ key: todo.id }}
          animate:flip={{ duration: 200 }}>
          <input type="checkbox" checked on:change={() => mark2(todo, false)} />
          {todo.description}
          <button on:click={() => remove2(todo)}>remove</button>
        </label>
      {/each}
    </div>
  </div>

  <div style="position: relative;">
    <div
      class="box"
      use:pannable
      on:panstart={handlePanStart}
      on:panmove={handlePanMove}
      on:panend={handlePanEnd}
      style="transform:
      translate({$coords2.x}px,{$coords2.y}px)
      rotate({$coords2.x * 0.2}deg)" />
  </div>

  <label>
    <input type="range" bind:value={pressedDuration} max={2000} step={100} />
    {pressedDuration}ms
  </label>
  <button
    use:longpress={pressedDuration}
    on:longpress={() => (pressed = true)}
    on:mouseenter={() => (pressed = false)}>press and hold</button>
  {#if pressed}
    <p>congratulations, {pressedDuration}ms</p>
  {/if}

  <div>
    {#each buttons as button}
      <button
        on:click={() => (current = button)}
        class:selected={current === button}>{button}</button>
    {/each}
  </div>

  <div><label> <input type="checkbox" bind:checked={big} /> big </label></div>
  <div class:big>some {big ? 'big' : 'small'} text</div>

  <Box>
    Hello world!
    <span slot="child">My son </span>
    <span slot="email"> dltjdqhr51@gmail.com </span>
  </Box>
  <Box />

  <Hoverable let:hovering={active}>
    <div class:active>
      {#if active}
        <p>I am being hovered.</p>
      {:else}
        <p>Hover over me!</p>
      {/if}
    </div>
  </Hoverable>

  <Map lat={35} lon={-84} zoom={3.5}>
    <MapMarket lat={37.8225} lon={-118.4169} label="Svelte" />
  </Map>

  <div>
    <Folder expanded name="Home" files={root} />
  </div>

  <div>
    <select bind:value={selected2}>
      {#each options as option}
        <option value={option}>{option.color}</option>
      {/each}
    </select>

    <svelte:component this={selected2.component} />
  </div>

  <div style="text-align: center; border: 2px solid blue;">
    {#if key}
      <button>{key === ' ' ? 'Space' : key}</button>
      <p>{keyCode}</p>
    {:else}
      <p>Please press any key</p>
    {/if}
  </div>

  <p>You have scrolled {y} pixels</p>

  <div class="kittyBox">
    <img
      src="https://svelte.dev/tutorial/kitten.png"
      alt="kitty"
      class="kitty"
      class:curious={hereKitty} />
  </div>

  <div class="todos">
    <h2>Todos</h2>
    {#each todos3 as todo (todo.id)}
      <Todo on:click={() => toggleTodo(todo)} {todo} />
    {/each}
  </div>

  <div class="audio">
    <button on:click={stopAll}>Stop All</button>
    <AudioPlayer
      src="https://sveltejs.github.io/assets/music/strauss.mp3"
      title="The Blue Danube Waltz"
      composer="Johann Strauss"
      performer="European Archive" />

    <AudioPlayer
      src="https://sveltejs.github.io/assets/music/holst.mp3"
      title="Mars, the Bringer of War"
      composer="Gustav Holst"
      performer="USAF Heritage of America Band" />

    <AudioPlayer
      src="https://sveltejs.github.io/assets/music/satie.mp3"
      title="Gymnopédie no. 1"
      composer="Erik Satie"
      performer="Prodigal Procrastinator" />
  </div> -->

  <!-- Removing the annotation will start debug mode. -->
  <!-- <Debugging /> -->

  <!-- <Congratulations /> -->
</div>

<svelte:window on:keydown={handleKeydownWindow} bind:scrollY={y} />

<svelte:body
  on:mouseenter={handleMouseenterWindow}
  on:mouseleave={handleMouseleaveWindow} />

<svelte:head>
  <link rel="stylesheet" href="https://svelte.dev/tutorial/dark-theme.css" />
</svelte:head>
