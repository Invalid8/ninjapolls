<script>
  export let color = "primary";
  export let flat = false;
  export let type = "button";
  export let inverse = false;
  export let borderd = false;
  export let fullWidth = false;
  export let smSize = false;
</script>

<button
  {type}
  class={color}
  class:flat
  class:inverse
  class:borderd
  class:smSize
  on:click
  class:fullWidth
>
  <span class="flex items-center gap-1 justify-center">
    <slot></slot>
  </span>
</button>

<style>
  button {
    border: 0;
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 15px;
    font-weight: 400;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    user-select: none;
    min-height: fit-content;
    font-size: 16px;
    width: fit-content;
  }

  .smSize {
    font-size: 13px;
    padding: 8px 10px;
    width: fit-content;
  }

  .fullWidth {
    width: 100%;
  }

  .primary {
    background-color: var(--primary);
    color: #fff;
  }

  .secondary {
    background-color: var(--secondary);
    color: #000;
  }

  .tertiary {
    background-color: var(--tertiary);
    color: #fff;
  }

  .flat,
  .inverse,
  .borderd {
    box-shadow: none;
  }

  .inverse,
  .borderd {
    background-color: transparent;
    border-style: solid;
  }

  .inverse {
    border-bottom-width: 2px;
    border-radius: 0;
    width: fit-content;
  }

  .borderd {
    border-width: 2px;
  }

  .primary.inverse,
  .primary.borderd {
    color: var(--primary);
    border-color: var(--primary);
  }

  .secondary.inverse,
  .secondary.borderd {
    color: var(--secondary);
    border-color: var(--secondary);
  }
</style>
