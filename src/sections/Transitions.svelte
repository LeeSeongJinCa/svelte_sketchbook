<script>
  import { fade, fly, slide } from "svelte/transition";
  import { cubicInOut, elasticOut } from "svelte/easing";
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
</div>
