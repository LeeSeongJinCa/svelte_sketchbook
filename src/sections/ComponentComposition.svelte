<script>
  import Box from "../lessons/Box.svelte";
  import ContactCard from "../lessons/ContactCard.svelte";
  import Hoverable from "../lessons/Hoverable.svelte";
</script>

<style>
  .slotProps div {
    padding: 1em;
    margin: 0 0 1em 0;
    background-color: #eee;
    color: #ff3e00;
  }

  .slotProps .active {
    background-color: #ff3e00;
    color: white;
  }
</style>

<div class="componentComposition">
  <div class="slots">
    <Box>
      <h2>Hello!</h2>
      <p>This is a box. It can contain anything.</p>
    </Box>
  </div>

  <div class="slotFallbacks">
    <Box />
  </div>

  <div class="namedSlots">
    <ContactCard>
      <span slot="name"> P. Sherman </span>

      <span slot="address"> 42 Wallaby Way<br /> Sydney </span>
    </ContactCard>
  </div>

  <div class="slotProps">
    <Hoverable let:hovering={active}>
      <div class:active>
        {#if active}
          <p>I am being hovered upon.</p>
        {:else}
          <p>Hover over me!</p>
        {/if}
      </div>
    </Hoverable>
  </div>
</div>
