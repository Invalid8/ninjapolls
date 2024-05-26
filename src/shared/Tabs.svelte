<script>
  import TabsHeader from "./TabsHeader.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let tabs = [];
  export let activeTab = tabs[0]?.value;

  const activeTabStore = writable(activeTab);
  setContext("activeTab", activeTabStore);

  const tabChange = (e) => {
    activeTabStore.set(e.detail);
  };

  // Method to hard set the active tab
  export function setActiveTab(value) {
    activeTabStore.set(value);
  }
</script>

<div class="tabs">
  <TabsHeader {tabs} on:tabChange={tabChange} />
  <div><slot /></div>
</div>

<style>
  .tabs {
    display: flex;
    gap: 5px;
    flex-direction: column;
    width: 100%;
  }
</style>
