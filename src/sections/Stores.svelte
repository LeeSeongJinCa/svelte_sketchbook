<script>
  import { count, elapsed, time, customCount, greeting, name } from "../store";
  import Incrementer from "../Incrementer.svelte";
  import Decrementer from "../Decrementer.svelte";
  import Resetter from "../Resetter.svelte";

  let countValue;

  const unsubscribe = count.subscribe((value) => {
    countValue = value;
  });

  const formatter = new Intl.DateTimeFormat("ko", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
</script>

<div class="stores">
  <div class="writable">
    <h1>The count is {countValue}</h1>
    <h1>The count is {$count} - This has not to do subscribe to the stores</h1>
    <Incrementer />
    <Decrementer />
    <Resetter />
  </div>
  <!-- <div class="readable">The time is {formatter.format($time)}</div> -->
  <!-- <div class="derived">The time is {formatter.format($time)} {$elapsed} </div> -->
  <div class="customStores">
    <h1>The count is {$customCount}</h1>
    <button on:click={customCount.increment}>+</button>
    <button on:click={customCount.decrement}>-</button>
    <button on:click={customCount.reset}>reset</button>
  </div>
  <div class="storeBindings">
    <h1>{$greeting}</h1>
    <input type="text" bind:value={$name} />
    <button on:click={() => ($name += '!')}>Add !</button>
  </div>
</div>
