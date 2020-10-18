<style>
  .box {
    width: 300px;
    border: 1px solid red;
    padding: 40px;
  }
</style>

<div class="box">
  <slot><em>no content was provided</em></slot>
  <br /><br />
  <div class="child">
    <slot name="child"><span>Unknwon child</span></slot>
  </div>
  <div class="email">
    <slot name="email"><span class="missing">Unknown email</span></slot>
  </div>
</div>
