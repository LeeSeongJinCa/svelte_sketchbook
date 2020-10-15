<script>
  import Answer from "../Answer.svelte";
  import Info from "../Info.svelte";

  const pkg = {
    name: "lee",
    speed: 3,
    version: "blazing",
    website: "https://naver.com",
  };
</script>

<div class="props">
  <Answer answer={42} />
  <Answer />
  <Info {...pkg} />
</div>
