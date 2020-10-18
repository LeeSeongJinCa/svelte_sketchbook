<script>
  import { count } from "./store";

  function decerement() {
    count.update((n) => n - 1);
  }
</script>

<button on:click={decerement}> - </button>
