<script>
  import { createEventDispatcher } from "svelte";
  import { getContext } from "svelte";

  const dispatch = createEventDispatcher();
  const activeTabStore = getContext("activeTab");
  let activeTab;

  activeTabStore.subscribe((value) => {
    activeTab = value;
  });

  export let tabs = [];
</script>

<div class="tabs-header">
  <ul>
    {#each tabs as tab}
      <li id={tab.value}>
        <button
          on:click={() => dispatch("tabChange", tab.value)}
          class:active={tab.value === activeTab}>{tab.label}</button
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  ul {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  li {
    list-style-type: none;
  }

  li button {
    list-style-type: none;
    font-size: 16px;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  li button:hover {
    opacity: 0.6;
  }

  .active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    padding-bottom: 6px;
  }
</style>
