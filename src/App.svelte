<script>
  import Paragraph from "./Paragraph.svelte";
  import Info from "./Info.svelte";
  import Thing from "./Thing.svelte";
  // import Inner from "./Inner.svelte";
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

  let a = 1;
  let b = 2;

  let yes = false;

  let scoops = 1;
  let flavours = [];
  let menu = ["Cookies", "Mint choc", "Raspberry"];

  function join(flavours) {
    if (flavours.length === 1) return flavours[0];
    return `${flvaours.slice(0, -1).join(", ")} and ${
      flvaours[flvaours.length - 1]
    }`;
  }

  let value = "Some words are *italic*, some are **bold**";

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

  function handleSubmit() {
    alert(`answered qeustion ${selected.id} ${selected.text} with ${answer}`);
  }

  let html = "<p>Write some text!</p>";

  let todos = [
    { done: false, text: "finish Svelte tutorial" },
    { done: false, text: "build an app" },
    { done: false, text: "world domination" },
  ];

  function add() {
    todos = [...todos, { done: false, text: "" }];
  }

  function clear() {
    todos = todos.filter((todo) => !todo.done);
  }

  $: remaining = todos.filter((todo) => !todo.done).length;

  let time = 0;
  let duration;
  let paused = true;
  let showControls = true;
  let showControlsTimeout;

  function handleMousemove2(e) {
    clearTimeout(showControlsTimeout);
    showControlsTimeout = setTimeout(() => {
      showControls = false;
    }, 2500);
    showControls = true;

    if (!(e.buttons & 1)) return;
    if (!duration) return;

    const { left, right } = this.getBoundingClientRect();
    time = (duration * (e.clientX - left)) / (right - left);
  }

  function handleMousedown(e) {
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
  [contenteditable] {
    padding: 4px;
    border: 2px solid black;
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

  <br />

  <input type="text" bind:value={name} />
  <h1>Hello {name}</h1>

  <label>
    <input type="number" bind:value={a} min="1" max="10" />
    <input type="range" bind:value={a} min="1" max="10" />
  </label>
  <label>
    <input type="number" bind:value={b} min="1" max="10" />
    <input type="range" bind:value={b} min="1" max="10" />
  </label>

  <label>
    <input type="checkbox" bind:checked={yes} />
    Yes! Send me regular email spam
  </label>
  {#if yes}
    <p>Thank you.</p>
  {:else}
    <p>No...</p>
  {/if}
  <button disabled={!yes}> Subscribe </button>

  <h2>Size</h2>
  <label>
    <input type="radio" bind:group={scoops} value={1} />
    One Scoop
  </label>
  <label>
    <input type="radio" bind:group={scoops} value={2} />
    Two Scoop
  </label>
  <label>
    <input type="radio" bind:group={scoops} value={3} />
    Three Scoop
  </label>
  <h2>Falvours</h2>
  {#each menu as flavour}
    <label>
      <input type="checkbox" bind:group={flavours} value={flavour} />
      {flavour}
    </label>
  {/each}
  {#if flavours.length === 0}
    <p>Please Select as least One.</p>
  {:else if flavours.length > scoops}
    <p>Can't order more flavours than scoops!</p>
  {:else}
    You ordered
    {scoops}
    {scoops === 1 ? 'scoop' : 'scoops'}
    of
    {join(flavours)}
  {/if}

  <textarea bind:value cols="30" rows="10" />
  {value}

  <h2>Insecurity questions</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <!-- svelte-ignore a11y-no-onchange -->
    <select bind:value={selected} on:change={() => (answer = '')}>
      {#each questions as question}
        <option value={question}>{question.text}</option>
      {/each}
    </select>

    <input type="text" bind:value={answer} />

    <button disabled={!answer} type="submit">Submit</button>
  </form>
  <p>selected question {selected ? selected.id : '[waiting...]'}</p>

  <pre>{html}</pre>
  <div contenteditable="true" bind:innerHTML={html} />

  <h2>Todos</h2>
  {#each todos as { done, text }}
    <input type="checkbox" bind:checked={done} />
    <input type="text" placeholder="What needs to be done?" bind:value={text} />
  {/each}
  <br />
  {remaining}
  remaining
  <br />
  <button on:click={add}>Add new</button>
  <button on:click={clear}>Clear completed</button>

  <h2>Caminandes: Llamigos</h2>
  <p>
    From
    <a href="https://cloud.blender.org/open-projects">Blender Open Projects</a>.
    CC-BY
  </p>

  <div>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
      src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
      on:mousemove={handleMousemove}
      on:mousedown={handleMousedown} 
      bind:currentTime={time}
      bind:duration
      bind:paused
      />
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
</div>
