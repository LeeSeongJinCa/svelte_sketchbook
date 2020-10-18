<script>
  import Nested from "../lessons/Nested.svelte";

  let name = "LeeSeongJinCa!";
  let src = "https://svelte.dev/tutorial/image.gif";
  let string = "this string contains some <string>HTML!</strong>";
</script>

<style>
  .paragraph {
    color: purple;
    font-family: "Comic Sans MS", cursive;
    font-size: 2em;
  }
</style>

<div class="introduce">
  <h1>Hello world!</h1>
  <h1>Hello {name}!</h1>
  <img {src} alt="test" />
  <p class="paragraph">This is paragraph.</p>
  <Nested />
  <p>
    {@html string}
  </p>
</div>
