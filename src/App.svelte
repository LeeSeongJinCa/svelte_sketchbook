<script>
  import { onMount, beforeUpdate, afterUpdate, tick } from "svelte";
  import { tweened, spring } from "svelte/motion";
  import { cubicOut, elasticOut, quintOut } from "svelte/easing";
  import { fade, fly, slide, crossfade } from "svelte/transition";

  import { onInterval } from "./utils";
  import {
    count as storeCount,
    time as storeTime,
    elapsed,
    customCount,
    name as storeName,
    greeting,
  } from "./store";

  import Paragraph from "./Paragraph.svelte";
  import Info from "./Info.svelte";
  import Thing from "./Thing.svelte";
  // import Inner from "./Inner.svelte";
  import Outer from "./Outer.svelte";
  import CustomButton from "./CustomButton.svelte";
  import Keypad from "./Keypad.svelte";
  import Resetter from "./Resetter.svelte";
  import Incrementer from "./Incrementer.svelte";
  import Decrementer from "./Decrementer.svelte";

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

  let w;
  let h;
  let size = 42;
  let text = "edit me";

  let pin;
  $: view = pin ? pin.replace(/\d(?!$)/g, "·") : "enter your pin";

  function handleKeypadSubmit() {
    alert(`submitted ${pin}`);
  }

  let photos = [];

  onMount(async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=20`
    );
    photos = await res.json();
  });

  let seconds = 0;
  onInterval(() => (seconds += 1), 1000);

  let div;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.offsetHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  let comments = [{ author: "user", text: "hello" }];

  function handleKeydown2(e) {
    if (e.key === "Enter") {
      const text = e.target.value;
      if (!text) return;

      comments = [
        ...comments,
        {
          author: "user",
          text,
        },
      ];

      e.target.value = "";

      setTimeout(() => {
        comments = [
          ...comments,
          {
            author: "another user",
            text: "Good...",
          },
        ];
      }, 1000);
    }
  }

  let tickText = "Select some text and hit the tab key to toggle uppercase";

  async function handleKeydownToggle(e) {
    if (e.key !== "Tab") return;

    e.preventDefault();

    const { selectionStart, selectionEnd, value } = this;
    const selection = value.slice(selectionStart, selectionEnd);

    const replacement = /[a-z]/.test(selection)
      ? selection.toUpperCase()
      : selection.toLowerCase();

    tickText =
      value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

    await tick();
    this.selectionStart = selectionStart;
    this.selectionEnd = selectionEnd;
  }

  let count_value;

  const unsubscribe = storeCount.subscribe((value) => {
    count_value = value;
  });

  const formatter = new Intl.DateTimeFormat("ko", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

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
</script>

<style>
  .root {
    padding: 100px 0;
  }

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

  .photos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
  }

  figure,
  img {
    width: 100%;
    margin: 0;
  }

  textarea {
    width: 100%;
    height: 200px;
  }

  progress {
    display: block;
    width: 100%;
  }

  svg {
    width: 100px;
    height: 100px;
    border: 2px solid red;
  }

  circle {
    fill: #ff3e00;
  }

  .centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .spin {
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 4em;
  }

  .item {
    padding: 0.5em 0;
    border-top: 1px solid #eee;
  }
</style>

<div class="root">
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

  <input type="range" bind:value={size} />
  <input type="text" bind:value={text} />
  <p>size: {w}px x {h}px</p>
  <div bind:clientWidth={w} bind:clientHeight={h}>
    <span style="font-size: {size}px">{text}</span>
  </div>

  <h1 style="color: {pin ? '#333' : '#ccc'}">{view}</h1>
  <Keypad bind:value={pin} on:submit={handleKeypadSubmit} />

  <h1>Photo album</h1>
  <div class="photos">
    {#each photos as photo}
      <figure>
        <img src={photo.thumbnailUrl} alt={photo.title} />
        <figcaption>{photo.title}</figcaption>
      </figure>
    {:else}
      <p>loading...</p>
    {/each}
  </div>

  <p>
    The page has been open for
    {seconds}
    {seconds === 1 ? 'second' : 'seconds'}
  </p>

  <div class="chat">
    <h1>Chat bot</h1>

    <div bind:this={div}>
      {#each comments as comment}
        <article>
          <p>{comment.author}</p>
          <span>{comment.text}</span>
        </article>
      {/each}
    </div>
    <input type="text" on:keydown={handleKeydown2} />
  </div>

  <textarea value={tickText} on:keydown={handleKeydownToggle} />

  <h1>The count is {count_value}</h1>
  <h1>The count is {$storeCount} -- Auto-subscriptions</h1>
  <Incrementer />
  <Decrementer />
  <Resetter />

  <h1>The time is {formatter.format($storeTime)}</h1>
  <p>
    This page has been open for
    {$elapsed}
    {$elapsed === 1 ? 'second' : 'seconds'}
  </p>

  <h1>The count is {$customCount}</h1>
  <button on:click={customCount.increment}>+</button>
  <button on:click={customCount.decrement}>-</button>
  <button on:click={customCount.reset}>reset</button>

  <h1>{$greeting}</h1>
  <input type="text" bind:value={$storeName} />
  <button on:click={() => ($storeName += '!')}>Add exclamation mark!</button>

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
        <label in:receive={{ key: todo.id }} out:send={{ key: todo.id }}>
          <input type="checkbox" on:change={() => mark2(todo, true)} />
          {todo.description}
          <button on:click={() => remove2(todo)}>remove</button>
        </label>
      {/each}
    </div>

    <div class="right">
      <h2>done</h2>
      {#each todos2.filter((t) => t.done) as todo (todo.id)}
        <label in:receive={{ key: todo.id }} out:send={{ key: todo.id }}>
          <input type="checkbox" checked on:change={() => mark2(todo, false)} />
          {todo.description}
          <button on:click={() => remove2(todo)}>remove</button>
        </label>
      {/each}
    </div>
  </div>
</div>
