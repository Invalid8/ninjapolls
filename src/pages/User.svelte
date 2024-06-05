<script>
  import { CreatePollForm, PollList } from "../components";
  import { Tabs, TabsContent } from "../shared";

  let tabs = [
    { value: "AddNewPoll", label: "Add New Poll" },
    { value: "CurrentPolls", label: "Current Polls" },
  ];

  let tabsCompact;
  $: forceLoad = false;
  let activeTab = "AddNewPoll";

  function handleAddPoll() {
    forceLoad = true;
    tabsCompact.setActiveTab("CurrentPolls");
  }

  function handleAddNewClick() {
    tabsCompact.setActiveTab("AddNewPoll");
  }
</script>

<div class="w-full min-h-svh polly">
  <Tabs {tabs} {activeTab} bind:this={tabsCompact}>
    <TabsContent key={"CurrentPolls"}>
      <PollList on:addNewClick={handleAddNewClick} {forceLoad} />
    </TabsContent>
    <TabsContent key={"AddNewPoll"}>
      <CreatePollForm on:addPoll={handleAddPoll} />
    </TabsContent>
  </Tabs>
</div>

<style>
  .polly {
    padding: 20px 40px;
  }

  @media (max-width: 450px) {
    .polly {
      padding: 10px 20px;
    }
  }
</style>
