<script>
  let hovering;

  let enter = () => {
    hovering = true;
  };

  let leave = () => {
    hovering = false;
  };
</script>

<div on:mouseenter={enter} on:mouseleave={leave}>
  <slot {hovering} />
</div>
