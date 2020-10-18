<script>
  import { fade, fly, slide, crossfade } from "svelte/transition";
  import { cubicInOut, elasticOut, quintOut } from "svelte/easing";

  let visible = true;

  const spin = (node, { duration }) => {
    return {
      duration,
      css: (t) => {
        const eased = elasticOut(t);

        return `
          transform: scale(${eased}) rotate(${eased * 1080}deg);
          color: red;
        `;
      },
    };
  };

  const typewriter = (node, { speed = 50 }) => {
    const vaild =
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!vaild) {
      throw new Error(
        "This transition only works on elements with a single text node child"
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
  };

  let status = "";
  $: console.log(status);

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
          opacity: ${t};
        `,
      };
    },
  });

  let uid = 1;

  let todos = [
    { id: uid++, done: false, description: "write some docs" },
    { id: uid++, done: false, description: "start writing blog post" },
    { id: uid++, done: true, description: "buy some milk" },
    { id: uid++, done: false, description: "mow the lawn" },
    { id: uid++, done: false, description: "feed the turtle" },
    { id: uid++, done: false, description: "fix some bugs" },
  ];

  const add = (input) => {
    const todo = {
      id: uid++,
      done: false,
      description: input.value,
    };

    todos = [...todos, todo];
    input.value = "";
  };

  const remove = (todo) => {
    todos = todos.filter((t) => t !== todo);
  };

  const mark = (todo, done) => {
    todo.done = done;
    remove(todo);
    todos = todos.concat(todo);
  };
</script>

<style>
  .transitions {
    position: relative;
  }

  .centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  span {
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 4em;
  }

  .item {
    padding: 0.5em 0;
    border-top: 1px solid #eee;
  }

  .board {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    max-width: 36em;
    margin: 0 auto;
  }

  .board > input {
    font-size: 1.4em;
    grid-column: 1/3;
  }

  .board h2 {
    font-size: 2em;
    font-weight: 200;
    user-select: none;
    margin: 0 0 0.5em 0;
  }

  .board label {
    position: relative;
    line-height: 1.2;
    padding: 0.5em 2.5em 0.5em 2em;
    margin: 0 0 0.5em 0;
    border-radius: 2px;
    user-select: none;
    border: 1px solid hsl(240, 8%, 70%);
    background-color: hsl(240, 8%, 93%);
    color: #333;
  }

  .board input[type="checkbox"] {
    position: absolute;
    left: 0.5em;
    top: 0.6em;
    margin: 0;
  }

  .board .done {
    border: 1px solid hsl(240, 8%, 90%);
    background-color: hsl(240, 8%, 98%);
  }

  .board button {
    position: absolute;
    top: 0;
    right: 0.2em;
    width: 2em;
    height: 100%;
    background: no-repeat 50% 50%
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
    background-size: 1.4em 1.4em;
    border: none;
    opacity: 0;
    transition: opacity 0.2s;
    text-indent: -9999px;
    cursor: pointer;
  }

  .board label:hover button {
    opacity: 1;
  }
</style>

<div class="transitions">
  <label> <input type="checkbox" bind:checked={visible} /> visible </label>
  {#if visible}
    <p transition:fade>Fades in and out</p>
    <p transition:fly={{ duration: 2000, easing: cubicInOut, y: 200 }}>
      Fades in and out
    </p>
    <p in:fade out:fly={{ duration: 2000, easing: cubicInOut, y: 200 }}>
      Fades in and out
    </p>
    <div class="centered" in:spin={{ duration: 8000 }} out:fade>
      <span>transition!</span>
    </div>
    <p transition:typewriter>The quick brown fox jumps over the lazy dog.</p>
    <p
      transition:fly={{ y: 200, duration: 2000 }}
      on:introstart={() => (status = 'intro started')}
      on:outrostart={() => (status = 'outro started')}
      on:introend={() => (status = 'intro ended')}
      on:outroend={() => (status = 'outro ended')}>
      Flies in and out
    </p>
  {/if}
  <div class="localTransitions">
    <label>
      <input type="checkbox" bind:checked={showItems} />
      show list
    </label>
    <input type="range" min="0" max="10" bind:value={i} />

    {#if showItems}
      {#each items.slice(0, i) as item}
        <div class="item" transition:slide|local>{item}</div>
      {/each}
    {/if}
  </div>
  <div class="defferedTransitions">
    <div class="board">
      <input
        type="text"
        placeholder="what needs to be done?"
        on:keydown={(e) => e.key === 'Enter' && add(e.target)} />

      <div class="left">
        <h2>todo</h2>
        {#each todos.filter((t) => !t.done) as todo (todo.id)}
          <label in:receive={{ key: todo.id }} out:send={{ key: todo.id }}>
            <input type="checkbox" on:change={() => mark(todo, true)} />
            {todo.description}
            <button on:click={() => remove(todo)}>remove</button>
          </label>
        {/each}
      </div>
      <div class="right">
        <h2>done</h2>
        {#each todos.filter((t) => t.done) as todo (todo.id)}
          <label
            class="done"
            in:receive={{ key: todo.id }}
            out:send={{ key: todo.id }}>
            <input
              type="checkbox"
              checked
              on:change={() => mark(todo, false)} />
            {todo.description}
            <button on:click={() => remove(todo)}>remove</button>
          </label>
        {/each}
      </div>
    </div>
  </div>
</div>
