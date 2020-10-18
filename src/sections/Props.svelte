<script>
  import Answer from "../lessons/Answer.svelte";
  import Info from "../lessons/Info.svelte";

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
