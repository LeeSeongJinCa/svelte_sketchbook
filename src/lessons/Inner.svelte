<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function sayHello() {
    dispatch("message", {
      text: "Hello!",
      test: "qweqweqwe",
    });
  }
</script>

<button on:click={sayHello}> Click say to hello </button>
