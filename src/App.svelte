<script>
  import Paragraph from "./Paragraph.svelte";
  import Info from "./Info.svelte";
  import Thing from "./Thing.svelte";
  import Inner from "./Inner.svelte";
  import Outer from "./Outer.svelte";
  import CustomButton from "./CustomButton.svelte";

  let name = "world";
  let source = "./img.png";
  let string = "this string contains some <strong>HTML!!</strong>";

  let count = 0;

  function handleClick() {
    count += 1;
  }

  $: doubled = count * 2;

  $: {
    if (count > 9) {
      alert("Count is so high");
      count = 9;
    }
  }

  let numbers = [1, 2, 3, 4];

  function addNumbers() {
    numbers = [...numbers, numbers.length + 1];
  }

  $: sum = numbers.reduce((a, b) => a + b, 0);

  const pkg = {
    name: "svelte",
    version: 3,
    speed: "blazing",
    website: "https://svelte.dev",
  };

  let user = { loggedIn: false };

  function toggle() {
    user.loggedIn = !user.loggedIn;
  }

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

  function handleClickChangeColor() {
    things = things.slice(1);
  }

  let promise = getRandomNumber();

  async function getRandomNumber() {
    const res = await fetch("https://svelte.dev/tutorial/random-number");
    const text = await res.text();

    if (res.ok) {
      return text;
    } else {
      throw new Error(text);
    }
  }

  function handleClickRandomNumber() {
    promise = getRandomNumber();
  }

  let m = { x: 0, y: 0 };

  function handleMousemove(e) {
    m.x = e.clientX;
    m.y = e.clientY;
  }

  function handleClickNoAlert() {
    alert("no more alerts");
  }

  function handleMessage(e) {
    alert(e.detail.text);
  }

  function handleClickButton() {
    alert("clicked");
  }
</script>

<style>
  span {
    color: purple;
    font-size: 2em;
  }
  p {
    font-weight: normal;
  }
  .mousemoveWrap {
    width: 500px;
    height: 500px;
    border: 1px solid red;
  }
</style>

<div>
  <span>Hello {name}!</span>
  <img src={source} alt="img" title="img" />
  <Paragraph answer={42} />
  <Paragraph />
  <p>
    {@html string}
  </p>
  <button on:click={handleClick}>
    Clicked
    {count}
    {count === 1 ? 'time' : 'times'}
  </button>
  <p>{count} doubled is {doubled}</p>

  <p>{numbers.join(' + ')} = {sum}</p>
  <button on:click={addNumbers}> Add a numbers </button>

  <Info {...pkg} />

  {#if user.loggedIn}<button on:click={toggle}>Log out</button>{/if}
  {#if !user.loggedIn}<button on:click={toggle}>Log in</button>{/if}

  {#if user.loggedIn}
    <button on:click={toggle}>Log out</button>
  {:else}<button on:click={toggle}>Log in</button>{/if}

  {#if x > 10}
    <p>{x} is greater than 10</p>
  {:else if 5 > x}
    <p>{x} is less than 5</p>
  {:else}
    <p>{x} is between 5 and 10</p>
  {/if}

  <ul>
    {#each cats as { id, name }, i}
      <li>
        <a target="_blank" href="https://www.youtube.com/watch?v={id}">
          {i + 1}:
          {name}
        </a>
      </li>
    {/each}
  </ul>

  <button on:click={handleClickChangeColor}> Remove first thing </button>
  {#each things as thing (thing.id)}
    <Thing current={thing.color} />
  {/each}

  <button on:click={handleClickRandomNumber}> generate random number </button>

  {#await promise}
    <p>...waiting</p>
  {:then number}
    <p>The number is {number}</p>
  {:catch err}
    <p style="color: red;">{err.message}</p>
  {/await}

  <div class="mousemoveWrap" on:mousemove={handleMousemove}>
    The mouse position is
    {m.x}
    x
    {m.y}
  </div>
  <div
    class="mousemoveWrap"
    on:mousemove={(e) => {
      m = { x: e.clientX, y: e.clientY };
    }}>
    The mouse position is
    {m.x}
    x
    {m.y}
  </div>

  <button on:click|once={handleClickNoAlert}>Click me</button>

  <!-- <Inner on:message /> -->
  <Outer on:message={handleMessage} />

  <CustomButton on:click={handleClickButton} />
</div>
