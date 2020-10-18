<script>
  import CustomButton from "../lessons/CustomButton.svelte";
  import Inner from "../lessons/Inner.svelte";
  import Outer from "../lessons/Outer.svelte";

  let m = { x: 0, y: 0 };

  const handleMousemousePosition = (e) => {
    m.x = e.clientX;
    m.y = e.clientY;
  };

  const handleClickOnce = () => {
    alert("no more alert");
  };

  const handleMessage = (e) => {
    alert(e.detail.text);
  };

  const handleCustomButton = () => {
    alert("clicked");
  };
</script>

<style>
  .domevent {
    width: 200px;
    height: 200px;
    border: 1px solid black;
  }
</style>

<div class="event">
  <div class="domevent" on:mousemove={handleMousemousePosition}>
    The mouse position is
    {m.x}
    x
    {m.y}
  </div>
  <div
    class="domevent"
    on:mousemove={(e) => (m = { x: e.clientX, y: e.clientY })}>
    The mouse position is
    {m.x}
    x
    {m.y}
  </div>
  <div class="onceevent">
    <button on:click|once={handleClickOnce}>Click me!</button>
  </div>
  <div class="componentevent">
    <Inner on:message={handleMessage} />
  </div>
  <div class="eventforward">
    <Outer on:message={handleMessage} />
  </div>
  <div class="domeeventforwarding">
    <CustomButton on:click={handleCustomButton} />
  </div>
</div>
