<script>
  export let loading = false;
</script>

{#if loading}
  <div class="loading">
    <slot />
  </div>
{/if}

<style>
  .loading {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0000004c;
    z-index: 900;
    position: fixed;
    width: 100%;
    height: 100%;

    display: grid;
    place-content: center;
  }
</style>
