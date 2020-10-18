<script>
  import { afterUpdate, beforeUpdate, onMount, tick } from "svelte";

  import { onInterval } from "../lessons/utils";

  let photos = [];

  onMount(async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=5`
    );
    photos = await res.json();
  });

  let seconds = 0;
  // onInterval(() => (seconds += 1), 1000);

  let div;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  let comments = [{ author: "eliza", text: "hello" }];

  const handleKeydownComments = (e) => {
    if (e.key === "Enter") {
      const text = e.target.value;
      if (!text) return;

      comments = [...comments, { author: "user", text }];

      e.target.value = "";

      setTimeout(() => {
        comments = [
          ...comments,
          {
            author: "eliza",
            text: "...",
            placeholder: true,
          },
        ];

        setTimeout(() => {
          comments = comments
            .filter((comment) => !comment.placeholder)
            .concat({
              author: "eliza",
              text: "hello, too",
            });
        }, 500);
      }, 200);
    }
  };

  let text = `Select some text and hit the tab key to toggle uppercase`;

  async function handleKeyDownTick(e) {
    if (e.key !== "Tab") return;

    e.preventDefault();

    const { selectionStart, selectionEnd, value } = this;
    const selection = value.slice(selectionStart, selectionEnd);

    const replacement = /[a-z]/.test(selection)
      ? selection.toUpperCase()
      : selection.toLowerCase();

    text =
      value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

    await tick();

    this.selectionStart = selectionStart;
    this.selectionEnd = selectionEnd;
  }
</script>

<style>
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

  .chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 320px;
  }

  .scrollable {
    flex: 1 1 auto;
    border-top: 1px solid #eee;
    margin: 0 0 0.5em 0;
    overflow-y: auto;
  }

  article {
    margin: 0.5em 0;
  }

  .user {
    text-align: right;
  }

  span {
    padding: 0.5em 1em;
    display: inline-block;
  }

  .eliza span {
    background-color: #eee;
    border-radius: 1em 1em 1em 0;
    color: black;
  }

  .user span {
    background-color: #0074d9;
    color: black;
    border-radius: 1em 1em 0 1em;
    word-break: break-all;
  }

  textarea {
    width: 100%;
    height: 200px;
  }
</style>

<div class="lifecycle">
  <div class="photos">
    {#each photos as photo}
      <figure>
        <img src={photo.thumbnailUrl} alt={photo.title} />
        <figcaption>{photo.title}</figcaption>
      </figure>
    {:else}
      <p>...loading</p>
    {/each}
  </div>
  <div class="onDestroy">
    The page has been open for
    {seconds}
    {seconds === 1 ? 'second' : 'seconds'}
  </div>
  <div class="beforeUpdateAfterUpdate">
    <div class="chat">
      <h1>Eliza</h1>

      <div class="scollable" bind:this={div}>
        {#each comments as comment}
          <article class={comment.author}><span>{comment.text}</span></article>
        {/each}
      </div>
    </div>

    <input type="text" on:keydown={handleKeydownComments} />
  </div>
  <div class="tick">
    <textarea bind:value={text} on:keydown={handleKeyDownTick} />
  </div>
</div>
