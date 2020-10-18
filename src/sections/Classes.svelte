<script>
  let current = "foo";

  let big = false;
</script>

<style>
  button {
    display: block;
  }

  .selected {
    background-color: #ff3e00;
    color: white;
  }

  .big {
    font-size: 42px;
  }
</style>

<div class="classes">
  <div class="classDirective">
    <button
      class:selected={current === 'foo'}
      on:click={() => (current = 'foo')}>foo</button>
    <button
      class:selected={current === 'bar'}
      on:click={() => (current = 'bar')}>bar</button>
    <button
      class:selected={current === 'baz'}
      on:click={() => (current = 'baz')}>baz</button>
  </div>

  <div class="shorhandClassDirective">
    <label> <input type="checkbox" bind:checked={big} /> big </label>

    <p class:big>some {big ? 'big' : 'small'} text</p>
  </div>
</div>
