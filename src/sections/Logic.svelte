<script>
  import Thing from "../Thing.svelte";

  let user = { loggined: false };

  const toggle = () => {
    user.loggined = !user.loggined;
  };

  let x = 7;

  let cats = [
    { id: "J---aiyznGQ", name: "Keyboard Cat" },
    { id: "z_AbfPXTKms", name: "Maru" },
    { id: "OUtn3pvWmpg", name: "Henri The Existential Cat" },
  ];

  let things = [
    { id: 1, color: "#0d0887" },
    { id: 2, color: "#6a00a8" },
    { id: 3, color: "#b12a90" },
    { id: 4, color: "#e16462" },
    { id: 5, color: "#fca636" },
  ];

  const handleThing = () => {
    things = things.slice(1);
  };

  const getRandomNumber = async () => {
    const res = await fetch("https://svelte.dev/tutorial/random-number");
    const text = await res.text();

    if (res.ok) {
      return text;
    }
    throw new Error(text);
  };

  let promise = getRandomNumber();

  const handleRandomNumber = () => {
    promise = getRandomNumber();
  };
</script>

<div class="logic">
  <div class="if">
    {#if user.loggined}<button on:click={toggle}>Log out</button>{/if}
    {#if !user.loggined}<button on:click={toggle}>Log in</button>{/if}
  </div>
  <div class="else">
    {#if user.loggined}
      <button on:click={toggle}>Log out</button>
    {:else}<button on:click={toggle}>Log in</button>{/if}
  </div>
  <div class="elseif">
    {#if x > 10}
      <p>{x} is greater than 10</p>
    {:else if 5 > x}
      <p>{x} is less than 5</p>
    {:else}
      <p>{x} is between 5 and 10</p>
    {/if}
  </div>
  <ul class="each">
    {#each cats as { id, name }, i}
      <li>{i + 1} - <span>id: {id}</span> <span>name: {name}</span></li>
    {/each}
  </ul>
  <div class="keyeach">
    <button on:click={handleThing}> Remove first thing </button>
    {#each things as thing (thing.id)}
      <Thing current={thing.color} />
    {/each}
  </div>
  <div class="await">
    <button on:click={handleRandomNumber}>generate random number</button>
    {#await promise}
      <p>...wating</p>
    {:then number}
      <p>number is {number}</p>
    {:catch err}
      <p>error is {err}</p>
    {/await}
  </div>
</div>
