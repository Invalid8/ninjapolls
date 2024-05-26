<script>
  import { getContext } from "svelte";

  export let key = "";
  const activeTabStore = getContext("activeTab");
  let activeTab;

  activeTabStore.subscribe((value) => {
    activeTab = value;
  });
</script>

{#if key === activeTab}
  <div class="tabs-body">
    <div class="content">
      <slot></slot>
    </div>
  </div>
{/if}

<style>
  .tabs-body {
    width: 100%;
    padding: 20px;
    border-radius: 6px;
  }
</style>
