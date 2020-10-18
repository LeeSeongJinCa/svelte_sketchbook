<script>
  import { afterUpdate } from "svelte";
  import flash from "./flash";

  export let todo;

  let div;

  afterUpdate(() => {
    flash(div);
  });
</script>

<style>
  div {
    cursor: pointer;
    line-height: 1.5;
  }
</style>

<svelte:options immutable={true} />

<div bind:this={div} on:click>{todo.done ? '👍' : ''} {todo.text}</div>
