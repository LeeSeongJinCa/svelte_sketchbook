<script>
  import { count } from "./store";

  function reset() {
    count.set(0);
  }
</script>

<button on:click={reset}> Reset </button>
