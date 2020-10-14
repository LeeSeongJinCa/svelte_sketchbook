<script context="module">
  // let current;

  const elements = new Set();

  export function stopAll() {
    elements.forEach((e) => {
      e.pause();
    });
  }
</script>

<script>
  import { onMount } from "svelte";

  export let src;
  export let title;
  export let composer;
  export let performer;

  let audio;
  let paused = true;

  const stopOthers = () => {
    // if (current && current !== audio) current.pause();
    // current = audio;
    console.log(elements);
    elements.forEach((e) => {
      if (e !== audio) e.pause();
    });
  };

  onMount(() => {
    elements.add(audio);
    return () => elements.delete(audio);
  });
</script>

<style>
  article {
    margin: 0 0 1em 0;
    max-width: 800px;
  }
  h2,
  p {
    margin: 0 0 0.3em 0;
  }
  audio {
    width: 100%;
    margin: 0.5em 0 1em 0;
  }
  .playing {
    color: #ff3e00;
  }
</style>

<article class:playing={!paused}>
  <h2>{title}</h2>
  <p><strong> {composer} </strong> / performer by {performer}</p>

  <!-- svelte-ignore a11y-media-has-caption -->
  <audio bind:this={audio} bind:paused on:play={stopOthers} controls {src} />
</article>
