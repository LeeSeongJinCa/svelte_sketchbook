<script>
  import { Router, Route, Link } from "svelte-routing";

  import {
    Actions,
    Animate,
    Binding,
    Classes,
    ComponentComposition,
    ContextAPI,
    Debugging,
    Event,
    Introduce,
    Lifecycle,
    Logic,
    ModuleContext,
    Motion,
    Props,
    Reactivity,
    SpecialElements,
    Stores,
    Transitions,
  } from "./sections/index";
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .root {
    padding: 200px 0;
  }

  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  :global(a),
  :global(a):visited {
    color: black;
    border: 2px solid blue;
    border-radius: 8px;
    flex: 1;
    align-self: center;
    text-align: center;
  }
</style>

<div class="root">
  <Router>
    <nav>
      <Link to="/">Home</Link>
      <Link to="reactivity">Reactivity</Link>
      <Link to="props">Props</Link>
      <Link to="logic">Logic</Link>
      <Link to="event">Event</Link>
      <Link to="binding">Binding</Link>
      <Link to="lifecycle">Lifecycle</Link>
      <Link to="stores">Stores</Link>
      <Link to="motion">Motion</Link>
      <Link to="transitions">Transitions</Link>
      <Link to="animate">Animate</Link>
      <Link to="actions">Actions</Link>
      <Link to="classes">Classes</Link>
      <Link to="componentComposition">ComponentComposition</Link>
      <Link to="contextAPI">ContextAPI</Link>
      <Link to="specialElements">SpecialElements</Link>
      <Link to="moduleContext">ModuleContext</Link>
    </nav>

    <div>
      <Route path="/props">
        <Props />
      </Route>
      <Route path="/logic">
        <Logic />
      </Route>
      <Route path="/event">
        <Event />
      </Route>
      <Route path="/binding">
        <Binding />
      </Route>
      <Route path="/lifecycle">
        <Lifecycle />
      </Route>
      <Route path="/stores">
        <Stores />
      </Route>
      <Route path="/motion">
        <Motion />
      </Route>
      <Route path="/transitions">
        <Transitions />
      </Route>
      <Route path="/animate">
        <Animate />
      </Route>
      <Route path="/actions">
        <Actions />
      </Route>
      <Route path="/classes">
        <Classes />
      </Route>
      <Route path="/componentComposition">
        <ComponentComposition />
      </Route>
      <Route path="/contextAPI">
        <ContextAPI />
      </Route>
      <Route path="/specialElements">
        <SpecialElements />
      </Route>
      <Route path="/moduleContext">
        <ModuleContext />
      </Route>
      <Route path="/reactivity">
        <Reactivity />
      </Route>
      <Route path="/">
        <Introduce />
      </Route>
    </div>
  </Router>

  <!-- Removing the annotation will start debug mode. -->
  <!-- <Debugging /> -->

  <!-- <Congratulations /> -->
</div>
