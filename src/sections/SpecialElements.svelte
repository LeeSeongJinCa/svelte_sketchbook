<script>
  import Folder from "../lessons/Folder.svelte";
  import RedThing from "../lessons/RedThing.svelte";
  import BlueThing from "../lessons/BlueThing.svelte";
  import GreenThing from "../lessons/GreenThing.svelte";
  import Todo from "../lessons/Todo.svelte";

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

  let selected = options[0];

  let key;
  let keyCode;

  const handleKeydown = (e) => {
    key = e.key;
    keyCode = e.keyCode;
  };

  let scrollY;

  let kittyHere = false;

  const handleMouseenter = () => {
    kittyHere = true;
  };

  const handleMouseleave = () => {
    kittyHere = false;
  };

  let todos = [
    { id: 1, done: true, text: "wash the car" },
    { id: 2, done: false, text: "take the dog for a walk" },
    { id: 3, done: false, text: "mow the lawn" },
  ];

  const toggle = (toggled) => {
    todos = todos.map((todo) => {
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
  .svelteWindow {
    display: flex;
    height: 200px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .svelteWindow kbd {
    background-color: #eee;
    border-radius: 4px;
    font-size: 6em;
    padding: 0.2em 0.5em;
    border-top: 5px solid rgba(255, 255, 255, 0.5);
    border-left: 5px solid rgba(255, 255, 255, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.2);
    border-bottom: 5px solid rgba(0, 0, 0, 0.2);
    color: #555;
  }

  .curious {
    transition: 0.3s;
    transform: translate(-80%, 0) rotate(30deg);
  }
</style>

<div class="specialElements">
  <!-- <svelte:self /> -->
  <Folder name="Home" files={root} expanded />

  <!-- <svelte:component /> -->
  <div class="svelteComponent">
    <select bind:value={selected}>
      {#each options as option}
        <option value={option}>{option.color}</option>
      {/each}
    </select>

    <svelte:component this={selected.component} />
  </div>

  <div class="svelteWindow">
    {#if key}
      <kbd>{key === ' ' ? 'Space' : key}</kbd>
      <p>{keyCode}</p>
    {:else}
      <p>Focus this window and press any key</p>
    {/if}
  </div>

  <div class="svelteWindowBindings">Scrolling Y - {scrollY}</div>

  <div class="svelteBody">
    <div class="kittyBox">
      <img
        src="https://svelte.dev/tutorial/kitten.png"
        alt="kitty"
        class="kitty"
        class:curious={kittyHere} />
    </div>
  </div>

  <div class="svelteOptions">
    <h2>Todos</h2>
    {#each todos as todo}
      <Todo on:click={() => toggle(todo)} {todo} />
    {/each}
  </div>
</div>

<!-- <svelte:window /> -->
<svelte:window on:keydown={handleKeydown} bind:scrollY />

<!-- <svelte:body /> -->
<svelte:body
  on:mouseenter={handleMouseenter}
  on:mouseleave={handleMouseleave} />

<!-- <svelte:head /> -->
<svelte:head>
  <link rel="stylesheet" href="https://svelte.dev/tutorial/dark-theme.css" />
</svelte:head>
