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
  import Transitions from "./sections/Transitions.svelte";
  import Animate from "./sections/Animate.svelte";
  import Actions from "./sections/Actions.svelte";
  import Classes from "./sections/Classes.svelte";

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
  :global(body) {
    margin: 0;
    padding: 0;
  }

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
  <Animate />
  <Actions />
  <Classes />

  <!-- 

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
