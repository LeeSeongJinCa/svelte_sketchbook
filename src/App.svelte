<script>
  import Introduce from "./sections/Introduce.svelte";
  import Reactivity from "./sections/Reactivity.svelte";
  import Props from "./sections/Props.svelte";
  import Logic from "./sections/Logic.svelte";
  import Event from "./sections/Event.svelte";
  import Binding from "./sections/Binding.svelte";
  import Lifecycle from "./sections/Lifecycle.svelte";
  import Stores from "./sections/Stores.svelte";
  import Motion from "./sections/Motion.svelte";
  import Transitions from "./sections/Transitions.svelte";
  import Animate from "./sections/Animate.svelte";
  import Actions from "./sections/Actions.svelte";
  import Classes from "./sections/Classes.svelte";
  import ComponentComposition from "./sections/ComponentComposition.svelte";
  import ContextApi from "./sections/ContextAPI.svelte";
  import SpecialElements from "./sections/SpecialElements.svelte";
  import ModuleContext from "./sections/ModuleContext.svelte";
  import Debugging from "./sections/Debugging.svelte";

  import Congratulations from "./Congratulations.svelte";
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .root {
    padding: 100px 0;
  }
</style>

<div class="root">
  <Introduce />
  <Reactivity />
  <Props />
  <Logic />
  <Event />
  <Binding />
  <Lifecycle />
  <Stores />
  <Motion />
  <Transitions />
  <Animate />
  <Actions />
  <Classes />
  <ComponentComposition />
  <ContextApi />
  <SpecialElements />
  <ModuleContext />

  <!-- Removing the annotation will start debug mode. -->
  <!-- <Debugging /> -->

  <!-- <Congratulations /> -->
</div>
